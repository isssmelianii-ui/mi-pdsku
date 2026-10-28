<?php

namespace App\Exceptions;

use Exception;

class OrderBusinessException extends Exception
{
    public function __construct(
        string $message,
        public readonly int $statusCode = 409
    ) {
        parent::__construct($message);
    }
}