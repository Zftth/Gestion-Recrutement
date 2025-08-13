<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobOffer;

class JobOfferSeeder extends Seeder
{
    public function run(): void
    {
        JobOffer::insert([
            [
                'recruiter_id' => 2,
                'title' => 'Développeur Laravel',
                'description' => 'Nous recherchons un développeur Laravel expérimenté.',
                'location' => 'Lomé',
                'tags' => 'PHP,Laravel,MySQL',
                'status' => 'published',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'recruiter_id' => 2,
                'title' => 'Designer UI/UX',
                'description' => 'Création d’interfaces ergonomiques.',
                'location' => 'En ligne',
                'tags' => 'Figma,UI,UX',
                'status' => 'published',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
