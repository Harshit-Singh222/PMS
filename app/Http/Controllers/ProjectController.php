<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response|\Inertia\ResponseFactory
    {
        $query = Project::query();

        $sort_field = request('sort_field', 'created_at');
        $sort_dir = request('sort_dir', 'asc');

        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if(request('status')) {
            $query->where('status', request('status'));
        }
        $projects = $query->orderBy($sort_field, $sort_dir)->paginate(10)->onEachSide(1);
        return inertia('Project/Index',[
            'projects' => ProjectResource::collection($projects),
            'queryPara' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response|\Inertia\ResponseFactory
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request): \Illuminate\Http\RedirectResponse
    {
        /** @var  $image \Illuminate\Http\UploadedFile */

        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        if($image){
            $data['image_path'] = $image->store('project', 'public');
        }

        Project::create($data);

        return redirect()->route('project.index')->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project): \Inertia\Response|\Inertia\ResponseFactory
    {
        $query = $project->tasks();

        $sort_field = request('sort_fi eld', 'created_at');
        $sort_dir = request('sort_dir', 'asc');

        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if(request('status')) {
            $query->where('status', request('status'));
        }
        $tasks = $query->orderBy($sort_field, $sort_dir)->paginate(10)->onEachSide(1);
        return inertia('Project/Show',[
            "tasks" => TaskResource::collection($tasks),
            'project' => new ProjectResource($project),
            'queryPara' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project): \Inertia\Response|\Inertia\ResponseFactory
    {
        return inertia('Project/Edit',[
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->id();
        if($image){
            if($project->image_path){
                Storage::disk('public')->delete($project->image_path);
            }
            $data['image_path'] = $image->store('project', 'public');
        }
        $project->update($data);
        return redirect()->route('project.index')->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project): \Illuminate\Http\RedirectResponse
    {
        $name = $project->name;
        if($project->image_path){
            Storage::disk('public')->delete($project->image_path);
        }
        $project->delete();
        return redirect()->route('project.index')->with('success', "Project \"$name\" deleted successfully.");
    }
}
