<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notification;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        Notification::insert([
            [
                'user_id' => 3,
                'title' => 'Candidature reçue',
                'message' => 'Votre candidature pour "Développeur Laravel" a été reçue.',
                'is_read' => false,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
