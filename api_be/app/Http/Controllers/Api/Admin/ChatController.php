<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatResource;
use App\Models\Chat;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $chats = Chat::with('messages')->get();

        return ChatResource::collection($chats);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat): ChatResource
    {
        return new ChatResource($chat->load('messages'));
    }
}
