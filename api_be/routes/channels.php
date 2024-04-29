<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// TODO NEED TO UPDATE CONDITION FOR SECURITY AFTER CLIENT AUTH IMPLEMENTATION
Broadcast::channel('chat.{chatId}', function (int $chatId) {
    return true;
});
