<?php

namespace App\Providers;

use App\Contracts\Services\AuthServiceInterface;
use App\Contracts\Services\ChatServiceInterface;
use App\Contracts\Services\ClientServiceInterface;
use App\Contracts\Services\MessageServiceInterface;
use App\Services\AuthService;
use App\Services\ChatService;
use App\Services\ClientService;
use App\Services\MessageService;
use Illuminate\Support\ServiceProvider;

class ServiceBindingProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AuthServiceInterface::class, AuthService::class);
        $this->app->bind(ChatServiceInterface::class, ChatService::class);
        $this->app->bind(ClientServiceInterface::class, ClientService::class);
        $this->app->bind(MessageServiceInterface::class, MessageService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
