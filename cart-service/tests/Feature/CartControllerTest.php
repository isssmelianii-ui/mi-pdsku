<?php

namespace Tests\Feature;

use App\Exceptions\ProductServiceUnavailableException;
use App\Services\CartItemService;
use Mockery;
use Tests\TestCase;

class CartControllerTest extends TestCase
{
    public function test_it_returns_bad_gateway_when_product_service_is_unavailable(): void
    {
        $cartService = Mockery::mock(CartItemService::class);
        $cartService->shouldReceive('addItem')
            ->once()
            ->with(1, 123, 1)
            ->andThrow(new ProductServiceUnavailableException('Product service unavailable.'));
        $this->app->instance(CartItemService::class, $cartService);

        $this->postJson('/carts', [
            'user_id' => 1,
            'product_id' => 123,
        ])
            ->assertStatus(502)
            ->assertJson([
                'message' => 'Product service unavailable.',
            ]);
    }
}
