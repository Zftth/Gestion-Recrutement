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
        $offers = JobOffer::with('recruiter')->latest()->get();
        return response()->json($offers);
    }

    /**
     * Créer une offre (recruteur ou admin uniquement)
     */
    public function store(StoreJobOfferRequest $request)
    {
        $user = Auth::user();

        // Vérification rôle
        if (!in_array($user->role->name, ['recruteur', 'admin'])) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        $offer = JobOffer::create([
            'recruiter_id' => $user->id,
            'title'        => $request->title,
            'description'  => $request->description,
            'location'     => $request->location,
            'tags'         => $request->tags,
            'status'       => $request->status
        ]);

        return response()->json(['message' => 'Offre créée avec succès', 'offer' => $offer], 201);
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
