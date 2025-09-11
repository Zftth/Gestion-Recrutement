<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = DB::table('roles')->where('name', 'admin')->first();

        // Vérifier si un admin existe déjà
        $existingAdmin = DB::table('users')->where('role_id', $adminRole->id)->first();

        if (!$existingAdmin) {
            DB::table('users')->insert([
                'name' => 'Super Admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('12345678'),
                'role_id' => $adminRole->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
