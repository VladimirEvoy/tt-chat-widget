<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\MessageServiceInterface;
use App\Enums\MessageType;
use App\Enums\SenderType;
use App\Exceptions\UnexpectedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Message\StoreMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Chat;
use App\Models\Messages;
use Exception;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function __construct(
        protected MessageServiceInterface $messageService
    )
    {}

    /**
     * Display a listing of the resource.
     * TODO We need to add some Middlware for client security
     */
    public function index(Chat $chat)
    {
        $messages = $chat->messages()->with('sender')->get();

        return MessageResource::collection($messages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request, Chat $chat)
    {
        $validated = $request->validated();

        try {
            $message = $this->messageService
                ->setSenderType(SenderType::CLIENT->value)
                ->setType(MessageType::USER->value)
                ->create($chat->id, $validated['sender_id'], $validated['message']);
        } catch (Exception $exception) {
            throw new UnexpectedException($exception->getMessage(), $exception->getCode());
        }

        return new MessageResource($message);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $message = Messages::with('sender')->findOrFail($id);

        return new MessageResource($message);
    }

    /**
     * Update the specified resource in storage.
     * TODO will be implemented in the future
     */
    public function update(Request $request, Messages $message)
    {
        return response()->json(['message' => 'Deleting messages is not allowed.'], 405);
    }

    /**
     * Remove the specified resource from storage.
     * TODO will be implemented in the future
     */
    public function destroy(Messages $message)
    {
        return response()->json(['message' => 'Deleting messages is not allowed.'], 405);
    }
}
