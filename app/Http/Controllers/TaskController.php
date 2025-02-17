<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Point;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    public function myTasks(): \Inertia\Response|\Inertia\ResponseFactory
    {
        $query = Task::where('assigned_user_to', auth()->id());

        $sort_field = request('sort_field', 'created_at');
        $sort_dir = request('sort_dir', 'asc');

        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if(request('status')) {
            $query->where('status', request('status'));
        }
        if(request('priority')) {
            $query->where('priority', request('priority'));
        }
        $tasks = $query->orderBy($sort_field, $sort_dir)->paginate(10)->onEachSide(1);
        return inertia('Task/MyTasks',[
            "tasks" => TaskResource::collection($tasks),
            'queryPara' => request()->query() ?: null,
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response|\Inertia\ResponseFactory
    {
        $query = Task::query();

        $sort_field = request('sort_field', 'created_at');
        $sort_dir = request('sort_dir', 'asc');

        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if(request('status')) {
            $query->where('status', request('status'));
        }
        if(request('priority')) {
            $query->where('priority', request('priority'));
        }
        $tasks = $query->orderBy($sort_field, $sort_dir)->paginate(10)->onEachSide(1);
        return inertia('Task/Index',[
            "tasks" => TaskResource::collection($tasks),
            'queryPara' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response|\Inertia\ResponseFactory
    {
        $projects = Project::all();
        $users = User::all();
        return inertia('Task/Create',[
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): \Illuminate\Http\RedirectResponse
    {
        /** @var  $image \Illuminate\Http\UploadedFile */

        $data = $request->validated();
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        $image = $data['image'] ?? null;
        if($image){
            $data['image_path'] = $image->store('task', 'public');
        }

        Task::create($data);
        return redirect()->route('task.index')->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task): \Inertia\Response|\Inertia\ResponseFactory
    {
        return inertia('Task/Show',[
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task): \Inertia\Response|\Inertia\ResponseFactory
    {
        $users = User::all();
        return inertia('Task/Edit',[
            'task' => new TaskResource($task),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task): \Illuminate\Http\RedirectResponse
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->id();
        if($image){
            if($task->image_path){
                Storage::disk('public')->delete($task->image_path);
            }
            $data['image_path'] = $image->store('task', 'public');
        }
        DB::transaction(function () use ($data, $task){
            $task->update($data);
            $points = 0;
            $data['status'] == 'completed' ? $points = 10 : $points = 0;
            if ($task->point){
                $task->point()->update([
                    'quantity' => $points,
                    'user_id' => $data['assigned_user_to'],
                ]);
            } else {
                $task->point()->create([
                    'quantity' => $points,
                    'user_id' => $data['assigned_user_to'],
                ]);
            }
        });
        return redirect()->route('task.index')->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): \Illuminate\Http\RedirectResponse
    {
        $name = $task->name;
        if($task->image_path){
            Storage::disk('public')->delete($task->image_path);
        }
        $task->delete();
        return redirect()->route('task.index')->with('success', "Task \"$name\" deleted successfully.");
    }


}
