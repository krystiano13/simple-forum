<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function createComment(Request $request) {
        $fields = $request -> all();

        $validator = Validator::make($fields,[
            
        ]);
    }
}
