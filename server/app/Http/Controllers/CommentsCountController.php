<?php

namespace App\Http\Controllers;

use App\Models\CommentsCount;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentsCountController extends Controller
{
    public function getCount(Request $request) {
        return response() -> json(
            CommentsCount::orderBy('count', 'DESC') -> take(6) -> get()
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

            $count = CommentsCount::where('username', $fields['username']) -> get();

            if($count -> count() <= 0) {
                CommentsCount::create([ 'username' => $fields['username'], 'count' => 1 ]);
            }

            else {
                CommentsCount::where('username', $fields['username']) -> update(['count' => $count[0] -> count + 1 ]);
                return response() -> json($count);
            }
            
            return response() -> json($count);
        }
    }
}
