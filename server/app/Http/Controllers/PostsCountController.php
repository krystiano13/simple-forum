<?php

namespace App\Http\Controllers;

use App\Models\PostCount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class PostsCountController extends Controller
{
    public function getCount(Request $request) {
        return response() -> json(
            PostCount::orderBy('count', 'DESC') -> take(6) -> get()
        );
    }

    public function increment(Request $request) {
        $fields = $request -> all();

        $validator = Validator::make($fields,[
            'username' => ['required']
        ]);

        if(!$validator -> fails()) {
            $user = User::where('name', $fields['username']) -> get();
            if($user -> count() <= 0) return;

            $count = PostCount::where('username', $fields['username']) -> get();

            if($count -> count() <= 0) {
                PostCount::create([ 'username' => $fields['username'], 'count' => 1 ]);
            }

            else {
                PostCount::where('username', $fields['username']) -> update(['count' => $count[0] -> count + 1 ]);
                return response() -> json($count);
            }
            
            return response() -> json($count);
        }
    }
}
