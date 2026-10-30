<?php

namespace Tests\Feature;

use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class OrderClearCartFailureTest extends TestCase
{
    use RefreshDatabase;

    public function test_order_is_created_when_cart_cannot_be_cleared(): void
    {
        config([
            'services.cart.url' => 'http://cart-service:3001',
            'services.product.url' => 'http://product-service:3000',
        ]);

        Http::fake(function (Request $request) {
            $path = parse_url($request->url(), PHP_URL_PATH);

            if ($request->method() === 'GET' && $path === '/carts/7') {
                return Http::response([
                    'data' => [
                        'items' => [
                            [
                                'product_id' => 14,
                                'quantity' => 1,
                            ],
                        ],
                    ],
                ], 200);
            }

            if ($request->method() === 'GET' && $path === '/products/14') {
                return Http::response([
                    'data' => [
                        'id' => 14,
                        'name' => 'Monitor 24 Inch',
                        'price' => 3000000,
                        'stock' => 10,
                    ],
                ], 200);
            }

            if ($request->method() === 'DELETE' && $path === '/carts/7') {
                return Http::response([
                    'message' => 'Internal Server Error',
                ], 500);
            }

            return Http::response(['message' => 'Not Found'], 404);
        });

        Log::spy();

        $response = $this->postJson('/orders', [
            'user_id' => 7,
        ]);

        $response->assertCreated();

        $this->assertDatabaseCount('orders', 1);

        $order = Order::firstOrFail();

        $this->assertEquals(7, $order->user_id);
        $this->assertEquals('PENDING', $order->status);

        Http::assertSent(function (Request $request) {
            return $request->method() === 'DELETE'
                && parse_url($request->url(), PHP_URL_PATH) === '/carts/7';
        });

        Log::shouldHaveReceived('error')
            ->once()
            ->with(
                'Order tersimpan, tetapi keranjang gagal dikosongkan.',
                [
                    'user_id' => 7,
                    'order_id' => $order->id,
                ]
            );
    }
}