<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Document;

class DocumentSeeder extends Seeder
{
    public function run(): void
    {
        Document::insert([
            [
                'application_id' => 1,
                'type' => 'CV',
                'path' => 'uploads/cv_test.pdf',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
