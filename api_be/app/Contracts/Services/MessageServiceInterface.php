<?php
namespace App\Contracts\Services;

use App\Models\Messages;

interface MessageServiceInterface
{
    public function create(int $chatId, int $clientId, string $message): Messages;
    public function setSenderType(string $value): static;
    public function setType(string $value): static;
}


