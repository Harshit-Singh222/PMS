<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }


    public function dashboard(): Response|\Inertia\ResponseFactory
    {
        $pendingTasks = Task::where('assigned_user_to', Auth::id())->where('status', 'pending')->count();
        $completedTasks = Task::where('assigned_user_to', Auth::id())->where('status', 'completed')->count();
        $inProgressTasks = Task::where('assigned_user_to', Auth::id())->where('status', 'in_progress')->count();
        $totalInProgressTasks = Task::where('status', 'in_progress')->count();
        $totalCompletedTasks = Task::where('status', 'completed')->count();
        $totalPendingTasks = Task::where('status', 'pending')->count();


        // Ranking Logic
        $loggedUser = Auth::user();
        $loggedUserScore = User::withSum('points', 'quantity')
            ->where('id', $loggedUser->id)
            ->value('points_sum_quantity');

        $loggedUserRank = User::withSum('points', 'quantity')
                ->having('points_sum_quantity', '>', $loggedUserScore)
                ->count() + 1;


        // Task Streak Logic
        $timestamps = $loggedUser->tasks()
            ->pluck('updated_at')
            ->unique();
        $dates = $timestamps->map(fn($timestamp) => Carbon::parse($timestamp)->toDateString());
        $sortedDates = $dates->sort()->values();

        $maxStreak = 0;
        $currentStreak = 0;
        $lastDate = $sortedDates[1];
        $today = Carbon::today()->toDateString();
        $currentStreakActive = false;

        for ($i = 1; $i < $sortedDates->count(); $i++) {
            $currentDate = $sortedDates[$i];

            if ($lastDate) {
                $diff = Carbon::parse($lastDate)->diffInDays(Carbon::parse($currentDate));

                if ($diff == 1) {
                    $currentStreak++;
                } else {
                    $maxStreak = max($maxStreak, $currentStreak);
                    $currentStreak = 1;
                }
            }
            if ($currentDate === $today || Carbon::parse($currentDate)->diffInDays($today) == 1) {
                $currentStreakActive = true;
            }
            $lastDate = $currentDate;
        }

        // Max and Current Streak
        $maxStreak = max($maxStreak, $currentStreak);
        $currentStreak = $currentStreakActive ? $currentStreak : 0;


        $tasks = Task::where('assigned_user_to', Auth::id())->whereIn('status',['pending','in_progress'])->limit(10)->get();
        return inertia('Dashboard',[
            "tasks" => TaskResource::collection($tasks),
            'queryPara' => request()->query() ?: null,
            'pendingTasks' => $pendingTasks,
            'completedTasks' => $completedTasks,
            'inProgressTasks' => $inProgressTasks,
            'totalInProgressTasks' => $totalInProgressTasks,
            'totalPendingTasks' => $totalPendingTasks,
            'totalCompletedTasks' => $totalCompletedTasks,
            'rank' => $loggedUserRank,
            'maxStreak' => $maxStreak,
            'currentStreak' => $currentStreak,
        ]);
    }
}
