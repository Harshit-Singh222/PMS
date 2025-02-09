<?php

use App\Http\Controllers\PointController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::redirect('/', '/dashboard');


Route::middleware(['auth','verified'])->group(function () {
    Route::get('/dashboard', [ProfileController::class,'dashboard'])->name('dashboard');
    Route::resource('project', ProjectController::class);
    Route::get('task/my-tasks', [TaskController::class, 'myTasks'])->name('task.my-tasks');
    Route::resource('task', TaskController::class);
    Route::resource('user', UserController::class);
    Route::get('/leaderboard', [PointController::class,'leaderboard'])->name('leaderboard');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
