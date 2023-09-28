<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function getPostComments($post_id) {
        $comments = Comment::orderBy('created_at', 'DESC') -> where('post_id', $post_id) -> get();

        return response() -> json([
            'status' => true,
            'comments' => $comments
        ], 200);
    }

    public function deleteComment($comment_id, Request $request) {
        $fields = $request -> all();

        $validator = Validator::make($fields,[ 'username' => 'required' ]);

        if($validator -> fails()) {
            return response() -> json(['status' => false, 'mesage' => 'Validation Error']);
        }

        $commentQuery = Comment::where('id',$comment_id) -> where('username', $fields['username']) -> get();

        if($commentQuery -> count() <= 0) {
            return response() -> json([
                'status' => false,
                'message' => 'no comment to delete'
            ]);
        }

        Comment::where('id',$comment_id) -> delete();

        return response() -> json([
            'status' => true,
            'message' => 'Comment deleted'
        ], 200);
    }

    public function editComment($comment_id,Request $request) {
        $fields = $request -> all();  

        $validator = Validator::make($fields,[
            'username' => ['required'],
            'content' => ['required', 'min:3']
        ]);

        if($validator -> fails()) {
            return response() -> json([
                'status' => false,
                'message' => "Validation Error",
                "errors" => $validator -> errors()
            ]);
        }

        $commentQuery = Comment::where('id',$comment_id) -> where('username', $fields['username']) -> get();

        if($commentQuery -> count() <= 0) {
            return response() -> json([
                'status' => false,
                'message' => 'no comment to edit'
            ]);
        }

        Comment::where('id', $comment_id) -> where('username', $fields['username']) -> update(
            [
                'content' => $fields['content']
            ]
        );

        return response() -> json([
            'status' => true,
            'message' => 'Comment edited'
        ], 200);
    }

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

        $fields['content'] = strip_tags($fields['content']);

        Comment::create($fields);

        return response() -> json([
            'status' => true,
            'message' => 'Comment created successfully'
        ],200);
    }
}
