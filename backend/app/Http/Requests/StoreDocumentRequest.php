<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        // L'autorisation sera gérée dans le contrôleur
        return true;
    }

    public function rules(): array
    {
        return [
            'application_id' => 'required|exists:applications,id',
            'file'           => 'required|file|mimes:pdf,doc,docx|max:2048', // max 2 Mo
        ];
    }

    public function messages(): array
    {
        return [
            'application_id.required' => 'La candidature est obligatoire.',
            'application_id.exists'   => 'Cette candidature n\'existe pas.',
            'file.required'           => 'Le fichier est obligatoire.',
            'file.mimes'              => 'Seuls les fichiers PDF, DOC et DOCX sont acceptés.',
            'file.max'                => 'La taille maximale du fichier est de 2 Mo.',
        ];
    }
}
