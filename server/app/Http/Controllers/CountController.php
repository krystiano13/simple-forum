<?php

namespace App\Http\Controllers;

use App\Models\CommentsCount;
use App\Models\PostCount;
use Illuminate\Http\Request;

class CountController extends Controller
{
    public function getAllCount() {
        $bestPosts = PostCount::orderBy('count', 'DESC') -> take(6) -> get();
        $bestComments = CommentsCount::orderBy('count', 'DESC') -> take(6) -> get();

        return response() -> json([
            'posts' => $bestPosts,
            'comments' => $bestComments
        ]);
    }
}
