<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequest;
use App\Models\Document;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Lister les documents d'une candidature
     */
    public function index($applicationId)
    {
        $user = Auth::user();

        $documents = Document::where('application_id', $applicationId)->get();

        // Vérifier que l'utilisateur a le droit de voir ces documents
        if ($user->role->name === 'admin') {
            return response()->json($documents);
        }

        if ($user->role->name === 'recruteur') {
            $hasAccess = $documents->first() && $documents->first()->application->jobOffer->recruiter_id === $user->id;
            if (!$hasAccess) {
                return response()->json(['message' => 'Accès refusé'], 403);
            }
            return response()->json($documents);
        }

        if ($user->role->name === 'candidat') {
            $hasAccess = $documents->first() && $documents->first()->application->candidate_id === $user->id;
            if (!$hasAccess) {
                return response()->json(['message' => 'Accès refusé'], 403);
            }
            return response()->json($documents);
        }

        return response()->json(['message' => 'Accès refusé'], 403);
    }

    /**
     * Upload d'un document
     */
    public function store(StoreDocumentRequest $request)
    {
        $user = Auth::user();

        // Seuls les candidats peuvent uploader un document pour leur propre candidature
        if ($user->role->name !== 'candidat') {
            return response()->json(['message' => 'Seuls les candidats peuvent uploader des documents.'], 403);
        }

        // Vérifier que la candidature appartient au candidat
        if ($user->id !== $request->application->candidate_id) {
            return response()->json(['message' => 'Cette candidature ne vous appartient pas.'], 403);
        }

        $path = $request->file('file')->store('documents', 'public');

        $document = Document::create([
            'application_id' => $request->application_id,
            'path'           => $path,
            'filename'       => $request->file('file')->getClientOriginalName()
        ]);

        return response()->json(['message' => 'Document uploadé avec succès', 'document' => $document], 201);
    }

    /**
     * Télécharger un document
     */
    public function download($id)
    {
        $document = Document::findOrFail($id);
        $user = Auth::user();

        // Vérification des droits
        if (
            $user->role->name !== 'admin' &&
            !($user->role->name === 'recruteur' && $document->application->jobOffer->recruiter_id === $user->id) &&
            !($user->role->name === 'candidat' && $document->application->candidate_id === $user->id)
        ) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        return Storage::disk('public')->download($document->path, $document->filename);
    }

    /**
     * Supprimer un document
     */
    public function destroy($id)
    {
        $document = Document::findOrFail($id);
        $user = Auth::user();

        if ($user->role->name !== 'admin' && $user->id !== $document->application->candidate_id) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        Storage::disk('public')->delete($document->path);
        $document->delete();

        return response()->json(['message' => 'Document supprimé avec succès']);
    }
}
