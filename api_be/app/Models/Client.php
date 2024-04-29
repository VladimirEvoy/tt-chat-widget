<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'last_login']
    ;

    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class);
    }

    public function messages(): MorphMany
    {
        return $this->morphMany(Messages::class, 'sender');
    }
}
