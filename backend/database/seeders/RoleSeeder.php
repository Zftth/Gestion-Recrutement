<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::insert([
            ['name' => 'admin', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'recruteur', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'candidat', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
