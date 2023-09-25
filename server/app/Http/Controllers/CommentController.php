<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function createComment(Request $request) {
        $fields = $request -> all();

        $validator = Validator::make($fields,[
            'username' => ['required'],
            'post_id' => ['required'],
            'content' => ['required', 'min:3']
        ]);

        if($validator -> fails()) {
            return response() -> json([
                'status' => false,
                'message' => "Validation Error",
                "errors" => $validator -> errors()
            ]);
        }

        $postQuery = Post::where('id', $fields['post_id']) -> get();

        if($postQuery -> count() <= 0) {
            return response() -> json([
                'status' => false,
                'message' => "Post doesn't exist"
            ]);
        }

        Comment::create($fields);

        return response() -> json([
            'status' => true,
            'message' => 'Comment created successfully'
        ],200);
    }
}
