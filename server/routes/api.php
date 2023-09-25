<?php

use App\Http\Controllers\CommentsCountController;
use App\Http\Controllers\CountController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostsCountController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/getCommentsCount', [CommentsCountController::class, 'getCount']);
Route::get('/getPostCount', [PostsCountController::class, 'getCount']);
Route::get('/getAllCounts', [CountController::class, 'getAllCount']);

Route::post('/register', [UserController::class, 'register']);
Route::post('/login',[UserController::class, 'login']);
Route::post('/logout',[UserController::class, 'logout']);
Route::post('/incrementComments', [CommentsCountController::class, 'increment']);
Route::post('/incrementPosts', [PostsCountController::class, 'increment']);
Route::post('/addPost', [PostController::class, 'createPost']);