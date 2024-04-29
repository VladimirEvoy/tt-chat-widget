<?php
namespace App\Contracts\Services;

use App\Models\Client;

interface ClientServiceInterface
{
    public function create(string $name, string $email): Client;
}


