<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response|\Inertia\ResponseFactory
    {
        $query = User::query();

        $sort_field = request('sort_field', 'created_at');
        $sort_dir = request('sort_dir', 'asc');

        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if(request('email')) {
            $query->where('email', 'like', '%' . request('email') . '%');
        }
        $users = $query->orderBy($sort_field, $sort_dir)->paginate(10)->onEachSide(1);
        return inertia('User/Index',[
            'users' => UserResource::collection($users),
            'queryPara' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response|\Inertia\ResponseFactory
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): \Illuminate\Http\RedirectResponse
    {
        /** @var  $image \Illuminate\Http\UploadedFile */

        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $data['email_verified_at'] = time();
        User::create($data);
        return redirect()->route('user.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): \Inertia\Response|\Inertia\ResponseFactory
    {
        $query = $user->tasks();

        $sort_field = request('sort_fi eld', 'created_at');
        $sort_dir = request('sort_dir', 'asc');

        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if(request('email')) {
            $query->where('email', 'like', '%' . request('email') . '%');
        }
        $tasks = $query->orderBy($sort_field, $sort_dir)->paginate(10)->onEachSide(1);
        return inertia('User/Show',[
            'user' => new UserResource($user),
            'queryPara' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): \Inertia\Response|\Inertia\ResponseFactory
    {
        return inertia('User/Edit',[
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): \Illuminate\Http\RedirectResponse
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if($password) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $data['email_verified_at'] = time();
        $user->update($data);
        return redirect()->route('user.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): \Illuminate\Http\RedirectResponse
    {
        $user->delete();
        return redirect()->route('user.index')->with('success', "User \"$user->name\" deleted successfully.");
    }
}
