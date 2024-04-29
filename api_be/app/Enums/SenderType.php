<?php
namespace App\Enums;

enum SenderType: string
{
    case USER = 'App\Models\User';
    case CLIENT = 'App\Models\Client';
}
