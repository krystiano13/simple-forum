<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function getAllPosts() {
        $posts = Post::get();

        return response() -> json([
            'status' => true,
            'posts' => $posts
        ], 200);
    }

    public function getOnePost($post_id) {
       $post = Post::where('id', $post_id) -> first();
       
       if(Post::where('id', $post_id) -> get() -> count() <= 0) {
            return response() -> json([
                'status' => false,
            ]);
       }

       return response() -> json([
            'status' => true,
            'post' => $post
       ],200);
    }

    public function getLatestPosts() {
        $posts = Post::orderBy('id', 'DESC') -> get() -> take(10);

        return response() -> json([
            'status' => true,
            'posts' => $posts
        ],200);
    }

    public function editPost($post_id, Request $request) {
        $fields = $request -> all();

        $validator = Validator::make($fields,[
            'username' => ['required'],
            'title' => ['required', 'max:64', 'min:3'],
            'content' => ['required', 'min:3']
        ]);

        if($validator -> fails()) {
            return response() -> json(
                [
                    "status" => false,
                    "message" => "Validation error",
                    "errors" => $validator -> errors()
                ]
            );
        }

        $postQuery = Post::where('id', $post_id) -> where('username', $fields['username']) -> get();

        if($postQuery -> count() <= 0) {
            return response() -> json([
                'status' => false,
                'message' => "no post to edit"
            ]);
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

    public function deletePost($post_id, Request $request) {
        $fields = $request -> all();

        $validator = Validator::make($fields,[ 'username' => 'required' ]);

        if($validator -> fails()) {
            return response() -> json(['status' => false, 'mesage' => 'Validation Error']);
        }

        $post = Post::where('id', $post_id) -> where('username', $fields['username']) -> get();

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
