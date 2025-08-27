<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApplicationRequest;
use App\Models\Application;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    /**
     * Liste des candidatures
     * - Admin : toutes
     * - Recruteur : celles de ses offres
     * - Candidat : les siennes
     */
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            $applications = Application::with(['jobOffer', 'candidate'])->latest()->get();
        } elseif ($user->role === 'recruteur') {
            $applications = Application::whereHas('jobOffer', function ($query) use ($user) {
                $query->where('recruiter_id', $user->id);
            })->with(['jobOffer', 'candidate'])->latest()->get();
        } else {
            $applications = Application::where('candidate_id', $user->id)->with(['jobOffer', 'candidate'])->latest()->get();
        }

        return response()->json($applications);
    }

    /**
     * Soumettre une candidature (candidat uniquement)
     */
    public function store(StoreApplicationRequest $request)
    {
        $user = Auth::user();

        if ($user->role !== 'candidat') {
            return response()->json(['message' => 'Seuls les candidats peuvent postuler.'], 403);
        }

        $application = Application::create([
            'job_offer_id' => $request->job_offer_id,
            'candidate_id' => $user->id,
            'status'       => 'reçue',
            'notes'        => $request->notes
        ]);

        return response()->json(['message' => 'Candidature envoyée avec succès', 'application' => $application], 201);
    }

    /**
     * Voir une candidature
     */
    public function show($id)
    {
        $application = Application::with(['jobOffer', 'candidate'])->findOrFail($id);
        $user = Auth::user();

        if (
            $user->role === 'admin' ||
            ($user->role === 'recruteur' && $application->jobOffer->recruiter_id === $user->id) ||
            ($user->role === 'candidat' && $application->candidate_id === $user->id)
        ) {
            return response()->json($application);
        }

        return response()->json(['message' => 'Accès refusé'], 403);
    }

    /**
     * Mettre à jour le statut (recruteur ou admin uniquement)
     */
    public function update(StoreApplicationRequest $request, $id)
    {
        $application = Application::findOrFail($id);
        $user = Auth::user();

        if (!in_array($user->role->name, ['recruteur', 'admin'])) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        if ($user->role->name === 'recruteur' && $application->jobOffer->recruiter_id !== $user->id) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        $application->update($request->only('status', 'notes'));

        return response()->json(['message' => 'Candidature mise à jour avec succès', 'application' => $application]);
    }

    /**
     * Supprimer une candidature (admin ou candidat propriétaire)
     */
    public function destroy($id)
    {
        $application = Application::findOrFail($id);
        $user = Auth::user();

        if ($user->role->name === 'admin' || ($user->role->name === 'candidat' && $application->candidate_id === $user->id)) {
            $application->delete();
            return response()->json(['message' => 'Candidature supprimée avec succès']);
        }

        return response()->json(['message' => 'Accès refusé'], 403);
    }
}
