<?php

namespace Database\Seeders;

use App\Models\Point;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class PointSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = Task::inRandomOrder()->take(20)->get();
        foreach ($tasks as $task) {
            $task->point()->create([
                'user_id' => User::inRandomOrder()->first()->id,
                'quantity' => fake()->numberBetween(1, 100),
            ]);
        }
    }
}
