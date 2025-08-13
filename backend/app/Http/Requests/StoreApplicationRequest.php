<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Autorisation gérée dans le contrôleur
        return true;
    }

    public function rules(): array
    {
        return [
            'job_offer_id' => 'required|exists:job_offers,id',
            'notes'        => 'nullable|string|max:1000',
            'status'       => 'nullable|in:reçue,en_cours,entretien,acceptée,refusée'
        ];
    }

    public function messages(): array
    {
        return [
            'job_offer_id.required' => 'L\'offre d\'emploi est obligatoire.',
            'job_offer_id.exists'   => 'L\'offre sélectionnée n\'existe pas.',
            'status.in'             => 'Le statut est invalide.'
        ];
    }
}
