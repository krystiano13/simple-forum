<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentsCountController;
use App\Http\Controllers\CountController;
use App\Http\Controllers\NewsController;
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
Route::get('/getNews',[NewsController::class, 'getNews']);
Route::get('/getLatestPosts', [PostController::class, 'getLatestPosts']);
Route::get('/getOnePost/{post_id}', [PostController::class, 'getOnePost']);
Route::get('/getPostComments/{post_id}', [CommentController::class, 'getPostComments']);
Route::get('/getSingleCommentsCount/{username}', [CommentsCountController::class, 'getSingleCount']);

Route::post('/register', [UserController::class, 'register']);
Route::post('/login',[UserController::class, 'login']);
Route::post('/logout',[UserController::class, 'logout']);
Route::post('/incrementComments', [CommentsCountController::class, 'increment']);
Route::post('/incrementPosts', [PostsCountController::class, 'increment']);
Route::post('/addPost', [PostController::class, 'createPost']);
Route::post('/addComment', [CommentController::class, 'createComment']);
Route::post('/createNews', [NewsController::class, 'createNews']);

Route::put('/editComment/{comment_id}', [CommentController::class, 'editComment']);
Route::post('/editPost/{post_id}', [PostController::class, 'editPost']);
Route::put('/editNews/{news_id}', [NewsController::class, 'editNews']);

Route::delete('/deleteComment/{comment_id}', [CommentController::class, 'deleteComment']);
Route::post('/deletePost/{post_id}', [PostController::class, 'deletePost']);
Route::delete('/deleteNews/{news_id}', [NewsController::class, 'deleteNews']);