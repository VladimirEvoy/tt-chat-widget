<?php

namespace App\Exceptions;

use Exception;

class UnexpectedException extends Exception
{
    protected $message = 'Something went wrong, please contact with the administrator.';
    protected $code = 422;

    public function __construct($message = null, $code = null)
    {
        parent::__construct($message ?? $this->message, $code ?? $this->code);
    }
}
