<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Application;

class ApplicationSeeder extends Seeder
{
    public function run(): void
    {
        Application::insert([
            [
                'job_offer_id' => 3,
                'user_id' => 2,
                'status' => 'reçue',
                'notes' => 'Candidat motivé',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
