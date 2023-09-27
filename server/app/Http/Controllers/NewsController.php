<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{
    public function getNews() {
        $latestNews = News::orderBy('id', 'DESC') -> get() -> take(6);

        return response() -> json([
            'status' => true,
            'news' => $latestNews
        ], 200);
    }

    public function deleteNews($news_id, Request $request) {
        $newsCount = News::where('id', $news_id) -> get() -> count();

        if($newsCount <= 0) {
            return response() -> json([
                'status' => false,
                'message' => 'no news to delete'
            ]);
        }

        $fields = $request -> all();

        $validator = Validator::make($fields,[
            'username' => ['required']
        ]);

        if($validator -> fails()) {
            return response() -> json([
                'status' => false,
                'message' => "Couldn't create news"
            ]);
        }

        News::where('id',$news_id) -> delete();

        return response() -> json([
            'status' => true,
            'message' => 'News deleted'
        ],200);
    }

    public function editNews($news_id, Request $request) {
        $newsCount = News::where('id', $news_id) -> get() -> count();

        if($newsCount <= 0) {
            return response() -> json([
                'status' => false,
                'message' => 'no news to edit'
            ]);
        }

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

        News::where('id', $news_id) -> update([
            'title' => $fields['title'],
            'content' => $fields['content'],
        ]);

        return response() -> json([
            'status' => true,
            'message' => 'News edited'
        ],200);
    }

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
