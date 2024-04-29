<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\ChatServiceInterface;
use App\Contracts\Services\ClientServiceInterface;
use App\Contracts\Services\MessageServiceInterface;
use App\Enums\MessageType;
use App\Enums\SenderType;
use App\Exceptions\UnexpectedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Resources\ChatResource;
use App\Models\Bot;
use App\Models\Chat;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ChatController extends Controller
{
    public function __construct(
        protected ClientServiceInterface $clientService,
        protected ChatServiceInterface $chatService,
        protected MessageServiceInterface $messageService
    )
    {}

    /**
     * Display a listing of the resource.
     * TODO We need to add some Middlware for client security
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $chats = Chat::with('messages')->where('client_id', $request->get('client_id'))->get();

        return ChatResource::collection($chats);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request): ChatResource
    {
        try {
            $client = $this->clientService->create($request->name, $request->email);
            $chat = $this->chatService->create($client->id);
            $this->messageService
                ->setSenderType(SenderType::CLIENT->value)
                ->setType(MessageType::USER->value)
                ->create($chat->id, $client->id, $request->message);

            $this->messageService
                ->setSenderType(SenderType::USER->value)
                ->setType(MessageType::BOT->value)
                ->create($chat->id, User::first()->id, Bot::DEFAULT_INITIAL_MESSAGE);
        } catch (Exception $exception) {
            throw new UnexpectedException($exception->getMessage(), $exception->getCode());
        }

        return new ChatResource($chat->load('messages','messages.sender'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat): ChatResource
    {
        return new ChatResource($chat->load('messages'));
    }

    public function downloadHistory(Chat $chat): StreamedResponse
    {
        [$headers, $callback] = $this->chatService->downloadChatHistory($chat);

        return new StreamedResponse($callback, 200, $headers);
    }
}
