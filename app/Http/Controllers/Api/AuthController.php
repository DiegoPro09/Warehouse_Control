<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){   
        $user = User::create([
            'name_user' => $request->input('name_user'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);

        return response([
            'status'=> 'success',
            'code' => 200,
            'message' => 'Successfully registered user',
            'user' => $user
        ]);
    }

    public function login(LoginRequest $request){
        $credentials = $request->validated();

        if(!Auth::attempt($credentials)){
            return response([
                'status' => 'error',
                'conde' => 400,
                'message' => 'Incorrect email or passwords'
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('main');

        return response([
            'status' => 'success',
            'code' => 200,
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token->plainTextToken
        ]);
    }

    public function logout(Request $request){
        if (Auth::check()) {
            Auth::user()->tokens()->delete();
    
            return response([
                'status' => 'success',
                'code' => 200,
                'message' => 'Logout successful',
            ]);
        }

        return response([
            'status' => 'error', 
            'code' => 400, 
            'message' => 'User not authenticated'
        ]);
    }
}