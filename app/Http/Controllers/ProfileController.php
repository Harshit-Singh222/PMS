<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
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
        ]);
    }
}
