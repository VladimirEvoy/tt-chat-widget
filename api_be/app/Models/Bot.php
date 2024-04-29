<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bot extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'script',
        'active'
    ];

    // TODO DEFAULT_INITIAL_MESSAGE, OUT_OF_WORK_HOURS, PLEASE_WAIT CONST MUST BE IN SCRIPT AND USED BY HELPER
    const  DEFAULT_INITIAL_MESSAGE = 'Hi, we got your message our first operator will contact you as soon as possible. Please wait...';
    const  OUT_OF_WORK_HOURS = 'Hi, we got your message now we are out of work hours, we will answer to your messages as soon as possible';
    const  PLEASE_WAIT = 'Our operators busy right now, we will back to you soon. Please wait...';

    // TODO START_WORK_HOUR, END_WORK_HOUR MUST BE USED IN SCRIPT BY SETTINGS TABLE FOR SPECIAL DOMAIN
    const START_WORK_HOUR = 10;
    const END_WORK_HOUR = 20;
}
