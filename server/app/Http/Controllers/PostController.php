<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function createPost(Request $request) {
        $fields = $request -> all();

        $validator = Validator::make($fields,[
            'username' => ['required'],
            'title' => ['required', 'max:64', 'min:3'],
            'content' => ['required', 'min:3']
        ]);

        if($validator->fails()) {
            return response() -> json(
                [
                    "status" => false,
                    "message" => "Validation error",
                    "errors" => $validator -> errors()
                ]
            );
        }

        $fields['title'] = strip_tags($fields['title']);
        $fields['content'] = strip_tags($fields['content']);

        Post::create($fields);

        return response() -> json([
            'status' => true,
            'message' => 'Post created successfully'
        ],200);
    }
}
