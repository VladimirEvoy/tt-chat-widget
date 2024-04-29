<?php

namespace App\Services;

use App\Contracts\Services\ChatServiceInterface;
use App\Models\Chat;

class ChatService implements ChatServiceInterface
{
    /**
     * Create a new client, initiate a chat, and save a message.
     *
     * @param  int  $clientId
     * @return Chat
     */
    public function create(int $clientId): Chat
    {
        return Chat::create([
            'client_id' => $clientId,
            'started_at' => now(),
        ]);
    }

    public function downloadChatHistory(Chat $chat): array
    {
        $filename = "chat_history_{$chat->id}.csv";
        $headers = $this->prepareHeaders($filename);
        $callback = $this->prepareCsvCallback($chat);

        return [$headers, $callback];
    }

    private function prepareHeaders(string $filename): array
    {
        return [
            "Content-type" => "text/csv",
            "Content-Disposition" => sprintf('attachment; filename="%s"', $filename),
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        ];
    }

    private function prepareCsvCallback(Chat $chat): callable
    {
        return function() use ($chat) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Message ID', 'Sender Name', 'Message', 'Date Sent']);
            foreach ($chat->messages as $message) {
                fputcsv($handle, [
                    $message->id,
                    $message->sender->name,
                    $message->message,
                    $message->created_at->toDateTimeString(),
                ]);
            }
            fclose($handle);
        };
    }
}
