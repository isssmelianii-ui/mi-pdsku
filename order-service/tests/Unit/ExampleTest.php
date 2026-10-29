<?php

namespace Tests\Unit;

use App\Exceptions\OrderBusinessException;
use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    public function test_business_exception_defaults_to_conflict_status(): void
    {
        $exception = new OrderBusinessException('Keranjang kosong.');

        $this->assertSame('Keranjang kosong.', $exception->getMessage());
        $this->assertSame(409, $exception->statusCode);
    }

    public function test_business_exception_accepts_custom_status_code(): void
    {
        $exception = new OrderBusinessException(
            'Pesanan tidak ditemukan.',
            404
        );

        $this->assertSame('Pesanan tidak ditemukan.', $exception->getMessage());
        $this->assertSame(404, $exception->statusCode);
    }
}