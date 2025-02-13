<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'image' => ['nullable','image'],
            'due_date' => ['nullable','date'],
            'status' => ['required', Rule::in(['pending', 'in_progress', 'completed'])],
        ];
    }
}
