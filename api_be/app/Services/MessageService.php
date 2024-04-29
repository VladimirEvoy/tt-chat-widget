<?php

namespace App\Services;

use App\Contracts\Services\MessageServiceInterface;
use App\Enums\MessageType;
use App\Enums\SenderType;
use App\Events\MessageSent;
use App\Models\Messages;

class MessageService implements MessageServiceInterface
{
    private string $senderType = SenderType::CLIENT->value;
    private string $type = MessageType::USER->value;

    /**
     * Create a new client, initiate a chat, and save a message.
     *
     * @param  int  $chatId
     * @param  int  $clientId
     * @param  string  $message
     * @return Messages
     */
    public function create(int $chatId, int $clientId, string $message): Messages
    {
        $message = Messages::create([
            'chat_id' => $chatId,
            'sender_id' => $clientId,
            'sender_type' => $this->senderType,
            'message' => $message,
            'type' => $this->type,
        ]);

        MessageSent::dispatch($message);

        return $message;
    }

    public function setSenderType(string $value): static
    {
        $this->senderType = $value;
        return $this;
    }

    public function setType(string $value): static
    {
        $this->type = $value;
        return $this;
    }
}
