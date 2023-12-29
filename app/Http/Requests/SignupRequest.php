<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name_user' => 'required|string|max:55',
            'lastname' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email',
            'password' => ['required', 'confirmed', 'string', 'min:8', 'regex:/[!@#$%^&*(),.?":{}<>]/']
        ];
    }

    public function failedValidation($validator)
    {
        throw new ValidationException(
            response()->json(['errors' => $validator->errors()], 422)->throwResponse()
        );
    }
}