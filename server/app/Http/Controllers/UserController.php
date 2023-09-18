<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $request) {
        $fields = $request -> all();

        $validator = Validator::make($fields,[
            'name' => 'required',
            'password' => 'required'
        ]);

        if($validator -> fails()) {
            return response() -> json([
                'status' => 'false',
                'message' => 'Validation error',
                'errors' => $validator -> errors()
            ],401);
        }

        else if(!auth() -> attempt([
            'name' => $fields['name'],
            'password' => $fields['password']
        ])) {
            return response() -> json([
                'status' => false,
                'message' => 'Wrong username or password'
            ],401);
        }

        $token = auth() -> user() -> createToken(
            auth() -> user() -> name,
            expiresAt: now() -> addHour()
        );

        return response() -> json([
            'status' => true,
            'message' => 'Logged In successfully',
            'token' => $token -> accessToken
        ],200);
    }

    public function register(Request $request) {
        $fields = $request -> all();

        $validator = Validator::make($fields,[
            'name' => ['required', 'unique:users'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'confirmed', 'min:8']
        ]);

        if($validator -> fails()) {
            return response() -> json(
                [
                    "status" => false,
                    "message" => "Validation Error",
                    "errors" => $validator -> errors()
                ], 401
            );
        }

        else {
            $fields['password'] = bcrypt($fields['password']);
            User::create($fields);

            return response() -> json([
                'status' => true,
                'message' => "Account Created"
            ],200);
        }
    } 
}
