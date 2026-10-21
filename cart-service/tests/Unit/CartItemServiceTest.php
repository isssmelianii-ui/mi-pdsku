<?php

namespace Tests\Unit;

use App\Exceptions\ProductNotFoundException;
use App\Exceptions\ProductServiceUnavailableException;
use App\Services\CartItemService;
use App\Services\ProductService;
use Mockery;
use Tests\TestCase;

class CartItemServiceTest extends TestCase
{
    public function test_it_does_not_add_a_product_that_does_not_exist(): void
    {
        $productService = Mockery::mock(ProductService::class);
        $productService->shouldReceive('getProduct')
            ->once()
            ->with(123)
            ->andReturnNull();

        $cartService = new CartItemService($productService);

        $this->expectException(ProductNotFoundException::class);

        $cartService->addItem(1, 123, 1);
    }

    public function test_it_does_not_add_an_item_when_the_product_service_is_unavailable(): void
    {
        $productService = Mockery::mock(ProductService::class);
        $productService->shouldReceive('getProduct')
            ->once()
            ->with(123)
            ->andThrow(new ProductServiceUnavailableException('Product service unavailable.'));

        $cartService = new CartItemService($productService);

        $this->expectException(ProductServiceUnavailableException::class);

        $cartService->addItem(1, 123, 1);
    }
}
