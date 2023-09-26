<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{
    public function createNews(Request $request) {
        $fields = $request -> all();

        $validator = Validator::make($fields,[
            'title' => ['required'],
            'content' => ['required', 'min:3'],
            'username' => ['required']
        ]);

        if($validator -> fails()) {
            return response() -> json([
                'status' => false,
                'message' => "Couldn't create news"
            ]);
        }

        News::create($fields);

        return response() -> json([
            'status' => true,
            'message' => 'News added'
        ],200);
    }
}
