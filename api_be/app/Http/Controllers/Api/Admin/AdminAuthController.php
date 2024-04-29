<?php

namespace App\Http\Controllers\Api\Admin;

use App\Contracts\Services\AuthServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    public function __construct (private readonly AuthServiceInterface $authService)
    {
    }

    public function login(AdminLoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        $response = $this->authService->login($credentials);

        return response()->json($response);
    }

    public function logout(Request $request)
    {
        $response = $this->authService->logout($request);

        return response()->json($response);
    }
}
