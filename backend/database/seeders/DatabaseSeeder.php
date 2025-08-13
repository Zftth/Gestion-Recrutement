<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeders.
     */
    public function run(): void
    {
        // Appel de tous les seeders dans l'ordre
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            JobOfferSeeder::class,
            ApplicationSeeder::class,
            DocumentSeeder::class,
            InterviewSeeder::class,
            NotificationSeeder::class,
        ]);
    }
}
