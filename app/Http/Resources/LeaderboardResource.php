<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeaderboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'points' => $this->points()->sum('quantity'),
            'total_tasks' => $this->tasks->count(),
            'completed_tasks' => $this->tasks()->where('status', 'completed')->count(),
        ];
    }
}
