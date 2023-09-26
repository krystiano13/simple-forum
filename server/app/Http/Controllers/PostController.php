<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function editPost($post_id, Request $request) {
        $postQuery = Post::where('id', $post_id) -> get();

        if($postQuery -> count() <= 0) {
            return response() -> json([
                'status' => false,
                'message' => "no post to edit"
            ]);
        }

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

        Post::where('id', $post_id) -> update([
            'title' => $fields['title'],
            'content' => $fields['content']
        ]);

        return response() -> json([
            'status' => true,
            'message' => 'Post updated'
        ], 200);
    }

    public function deletePost($post_id) {
        $post = Post::where('id', $post_id) -> get();

        if($post -> count() <= 0) {
            return response() -> json([
                'status' => false,
                'message' => 'no post to delete'
            ]);
        }

        Comment::where('post_id', $post_id) -> delete();
        Post::where('id', $post_id) -> delete();

        return response() -> json([
            'status' => true,
            'message' => 'Post deleted'
        ],200);
    }

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
