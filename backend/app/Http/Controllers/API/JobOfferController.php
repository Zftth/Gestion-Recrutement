<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobOfferRequest;
use Illuminate\Http\Request;
use App\Models\JobOffer;
use Illuminate\Support\Facades\Auth;

class JobOfferController extends Controller
{
    /**
     * Liste des offres (tout le monde peut voir)
     */
    public function index()
    {
        $offers = JobOffer::with('recruiter')
        ->withCount('applications') // Compte les candidatures
        ->latest()
        ->get()
        ->map(function ($offer) {
            return [
                'id'          => $offer->id,
                'title'       => $offer->title,
                'description' => $offer->description,
                'location'    => $offer->location,
                'requirements'=> $offer->requirements,
                'salary'      => $offer->salary,
                'contractType'=> $offer->contract_type, 
                'experience'  => $offer->experience,
                'status'      => $offer->status,
                'company'  => $offer->company,
                'type'      => $offer->type,
                'candidates'  => $offer->applications_count, 
                'dateCreated' => $offer->created_at->format('d/m/Y'),
                'posted'      => $offer->created_at->diffForHumans(),  
                'recruiter'   => $offer->recruiter ? $offer->recruiter->name : null,
            ];
        });

    return response()->json($offers);
    }

    /**
     * Créer une offre (recruteur ou admin uniquement)
     */
    public function store(Request $request)
{
    try {
        $user = Auth::user();

        if (!$user || !in_array($user->role->name, ['recruiter', 'admin'])) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'location'    => 'nullable|string|max:255',
            'requirements'=> 'nullable|string',
            'salary'      => 'nullable|string|max:100',
            'contractType'=> 'nullable|string|max:50',
            'experience'  => 'nullable|string|max:50',
            'company'=> 'nullable|string|max:50',
            'type'  => 'nullable|string|max:50',
            'status'      => 'nullable|in:ouverte,fermée',
        ]);

        $offer = JobOffer::create([
            'recruiter_id'  => $user->id,
            'title'         => $request->title,
            'description'   => $request->description,
            'location'      => $request->location,
            'requirements'  => $request->requirements,
            'salary'        => $request->salary,
            'contract_type' => $request->contractType, 
            'experience'    => $request->experience,
            'company'       => $request->company, 
            'type'          => $request->type,
            'status'        => $request->status ?? 'ouverte',
        ]);

        return response()->json([
            'message' => 'Offre créée avec succès',
            'offer'   => $offer
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Validation échouée',
            'errors'  => $e->errors()
        ], 422);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur lors de la création de l\'offre',
            'error'   => $e->getMessage()
        ], 500);
    }
}


    /**
     * Afficher une offre spécifique
     */
    public function show($id)
    {
        $offer = JobOffer::with('recruiter')->findOrFail($id);
        return response()->json($offer);
    }

    /**
     * Mettre à jour une offre (recruteur propriétaire ou admin)
     */
    public function update(StoreJobOfferRequest $request, $id)
    {
        $user = Auth::user();
        $offer = JobOffer::findOrFail($id);

        // Vérification des droits
        if ($user->id !== $offer->recruiter_id && $user->role->name !== 'admin') {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        $offer->update($request->all());

        return response()->json(['message' => 'Offre mise à jour avec succès', 'offer' => $offer]);
    }

    /**
     * Supprimer une offre (recruteur propriétaire ou admin)
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $offer = JobOffer::findOrFail($id);

        if ($user->id !== $offer->recruiter_id && $user->role->name !== 'admin') {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        $offer->delete();

        return response()->json(['message' => 'Offre supprimée avec succès']);
    }
}
