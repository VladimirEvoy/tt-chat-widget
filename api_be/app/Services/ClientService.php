<?php

namespace App\Services;

use App\Contracts\Services\ClientServiceInterface;
use App\Models\Client;

class ClientService implements ClientServiceInterface
{
    /**
     * Create a new client
     *
     * @param  string  $name
     * @param  string  $email
     * @return Client
     */
    public function create(string $name, string $email): Client
    {
        return Client::firstOrCreate([
            'name' => $name,
            'email' => $email,
        ]);
    }
}
