<?php

namespace App\Http\Controllers;

use App\Http\Resources\LeaderboardResource;
use App\Models\Point;
use App\Models\User;
use Illuminate\Http\Request;

class PointController extends Controller
{
    public function leaderboard(): \Inertia\Response|\Inertia\ResponseFactory
    {
        $users = User::withSum('points', 'quantity') // 'score' is the column in the points table
            ->orderByDesc('points_sum_quantity')
            ->take(10) // Fetch top 10 users
            ->get();

        return inertia('Leaderboard', [
            'users' => LeaderboardResource::collection($users),
        ]);
    }
}
