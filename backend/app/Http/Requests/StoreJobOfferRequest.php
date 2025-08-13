<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobOfferRequest extends FormRequest
{
    /**
     * Autoriser l'utilisateur à faire la requête.
     */
    public function authorize(): bool
    {
        // On laisse true car on gère l'autorisation dans le contrôleur
        return true;
    }

    /**
     * Règles de validation.
     */
    public function rules(): array
    {
        return [
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'location'    => 'nullable|string|max:255',
            'tags'        => 'nullable|string',
            'status'      => 'required|in:published,archived'
        ];
    }

    /**
     * Messages d'erreur personnalisés (optionnel)
     */
    public function messages(): array
    {
        return [
            'title.required'       => 'Le titre est obligatoire.',
            'description.required' => 'La description est obligatoire.',
            'status.required'      => 'Le statut est obligatoire.',
            'status.in'            => 'Le statut doit être "published" ou "archived".',
        ];
    }
}
