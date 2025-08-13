<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInterviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        // On gère les autorisations dans le contrôleur
        return true;
    }

    public function rules(): array
    {
        return [
            'application_id' => 'required|exists:applications,id',
            'scheduled_at'   => 'required|date|after:now',
            'location'       => 'nullable|string|max:255',
            'status'         => 'required|in:prévu,réalisé,annulé'
        ];
    }

    public function messages(): array
    {
        return [
            'application_id.required' => 'L\'application est obligatoire.',
            'application_id.exists'   => 'Cette candidature n\'existe pas.',
            'scheduled_at.required'   => 'La date est obligatoire.',
            'scheduled_at.after'      => 'La date doit être dans le futur.',
            'status.in'               => 'Statut invalide.'
        ];
    }
}
