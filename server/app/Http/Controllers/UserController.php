<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function adminLogout() {
        auth() -> logout();
        return redirect('/adminLoginView');
    }

    public function adminForm() {
        if(!auth() -> check()) {
            return redirect('/adminLoginView');
        }

        return view('adminForm');
    }

    public function attemptAdminLogin(Request $request) {
        $fields = $request -> validate([
            'password' => ['required']
        ]);

        if(auth() -> attempt([
            'name' => 'admin',
            'password' => $fields['password']
        ])) {
            return redirect('/adminForm');
        }
    }

    public function getJoinTime($username) {
        $result = User::where('name', $username) -> first();

        return response() -> json([
            'status' => true,
            'result' => $result
        ], 200);
    }

    public function logout(Request $request) {
        $fields = $request -> all();
        $validator = Validator::make($fields,[ 'token_id' => 'required' ]);

        if(!$validator -> fails()) {
            Token::where('id', $fields['token_id']) -> delete();
            
            return response() -> json([
                'status' => true,
                'message' => 'Token deleted'
            ],200);
        }

        else {
            return response() -> json([
                'status' => false,
                'message' => 'Token couldnt be deleted',
                'errors' => $validator -> errors()
            ],401);
        }

    }

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
                ],
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
