<?php
namespace App\Contracts\Services;

use App\Models\Chat;

interface ChatServiceInterface
{
    public function create(int $clientId): Chat;
    public function downloadChatHistory(Chat $chat): array;
}


