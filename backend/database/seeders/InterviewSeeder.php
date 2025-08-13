<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Interview;

class InterviewSeeder extends Seeder
{
    public function run(): void
    {
        Interview::insert([
            [
                'application_id' => 1,
                'scheduled_at' => now()->addDays(2),
                'location' => 'Bureau Lomé',
                'status' => 'prévu',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
