<?php

namespace App\Events;

use App\Http\Resources\MessageResource;
use App\Models\Messages;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public MessageResource $data;

    public function __construct(private readonly Messages $message)
    {
        $this->data = new MessageResource($message->load('sender'));
    }

    public function broadcastOn()
    {
        return new Channel('chat.' . $this->message->chat_id);
    }
}
