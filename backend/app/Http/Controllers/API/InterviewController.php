<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInterviewRequest;
use App\Models\Interview;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InterviewController extends Controller
{
    /**
     * Liste des entretiens
     */
    public function index(Request $request)
    {
       $user = $request->user();
        if ($user->role === 'admin') {
            $interviews = Interview::with('application.jobOffer', 'application.candidate')->latest()->get();
        } elseif ($user->role === 'recruteur') {
            $interviews = Interview::whereHas('application.jobOffer', function ($q) use ($user) {
                $q->where('recruiter_id', $user->id);
            })->with('application.jobOffer', 'application.candidate')->latest()->get();
        } else {
            $interviews = Interview::whereHas('application', function ($q) use ($user) {
                $q->where('candidate_id', $user->id);
            })->with('application.jobOffer', 'application.candidate')->latest()->get();
        }

        return response()->json($interviews);
    }

    /**
     * Planifier un entretien (recruteur ou admin uniquement)
     */
    public function store(StoreInterviewRequest $request)
    {
        $user = Auth::user();

        if (!in_array($user->role->name, ['recruteur', 'admin'])) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        $interview = Interview::create($request->validated());

        return response()->json(['message' => 'Entretien planifié avec succès', 'interview' => $interview], 201);
    }

    /**
     * Voir un entretien
     */
    public function show($id)
    {
        $interview = Interview::with('application.jobOffer', 'application.candidate')->findOrFail($id);
        $user = Auth::user();

        if (
            $user->role->name === 'admin' ||
            ($user->role->name === 'recruteur' && $interview->application->jobOffer->recruiter_id === $user->id) ||
            ($user->role->name === 'candidat' && $interview->application->candidate_id === $user->id)
        ) {
            return response()->json($interview);
        }

        return response()->json(['message' => 'Accès refusé'], 403);
    }

    /**
     * Mettre à jour un entretien (recruteur ou admin)
     */
    public function update(StoreInterviewRequest $request, $id)
    {
        $interview = Interview::findOrFail($id);
        $user = Auth::user();

        if (!in_array($user->role->name, ['recruteur', 'admin'])) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        if ($user->role->name === 'recruteur' && $interview->application->jobOffer->recruiter_id !== $user->id) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        $interview->update($request->validated());

        return response()->json(['message' => 'Entretien mis à jour avec succès', 'interview' => $interview]);
    }

    /**
     * Supprimer un entretien (admin uniquement)
     */
    public function destroy($id)
    {
        $interview = Interview::findOrFail($id);
        $user = Auth::user();

        if ($user->role->name !== 'admin') {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        $interview->delete();

        return response()->json(['message' => 'Entretien supprimé avec succès']);
    }
}
