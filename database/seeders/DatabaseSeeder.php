<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Harshit',
            'email' => 'harshit@example.com',
            'password' => Hash::make('P@$$word'),
            'email_verified_at' => time(),
        ]);
        for($i=1; $i <= 5; $i++){
            User::factory()->create([
                'name' => 'Harshit-'.$i,
                'email' => 'harshit@'.$i.'test.com',
                'password' => Hash::make('P@$$word'),
                'email_verified_at' => time(),
            ]);
        }

        Project::factory()->count(30)->hasTasks(30)->create();
    }
}
