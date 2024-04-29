<?php

use App\Http\Controllers\Api\Admin\AdminAuthController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\Admin\ChatController as AdminChatController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\Admin\MessageController as AdminMessageController;
use Illuminate\Support\Facades\Route;

// Admin Authentication Routes
Route::post('admin/login', [AdminAuthController::class, 'login']);


Route::middleware('auth:sanctum')->prefix('backoffice')->group(function () {
    // Chat routes
    Route::apiResource('chats', AdminChatController::class)->only('index','show');

    // Message routes
    Route::apiResource('chats.messages', AdminMessageController::class)
        ->shallow()
        ->only(['index', 'store', 'show']);
    Route::post('logout', [AdminAuthController::class, 'logout']);
});

// Chat routes
Route::apiResource('chats', ChatController::class)->only('index','store','show');
Route::get('/chats/{chat}/download', [ChatController::class,'downloadHistory']);


// Message routes
Route::apiResource('chats.messages', MessageController::class)
    ->shallow()
    ->only(['index', 'store', 'show']);
