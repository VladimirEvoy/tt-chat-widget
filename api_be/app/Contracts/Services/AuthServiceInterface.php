<?php
namespace App\Contracts\Services;

use Illuminate\Http\Request;

interface AuthServiceInterface
{
    public function login(array $credentials): array;
    public function logout(Request $request): array;
}


