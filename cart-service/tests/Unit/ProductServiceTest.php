<?php

namespace Tests\Unit;

use App\Exceptions\ProductServiceUnavailableException;
use App\Services\ProductService;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ProductServiceTest extends TestCase
{
    public function test_it_returns_product_data_from_the_product_service(): void
    {
        config(['services.product.url' => 'http://product-service.test']);
        Http::fake([
            'product-service.test/products/123' => Http::response([
                'data' => ['id' => 123, 'name' => 'Keyboard'],
            ]),
        ]);

        $product = (new ProductService)->getProduct(123);

        $this->assertSame(['id' => 123, 'name' => 'Keyboard'], $product);
        Http::assertSent(fn ($request) => $request->url() === 'http://product-service.test/products/123');
    }

    public function test_it_returns_null_when_the_product_service_returns_not_found(): void
    {
        config(['services.product.url' => 'http://product-service.test']);
        Http::fake([
            'product-service.test/products/123' => Http::response([], 404),
        ]);

        $this->assertNull((new ProductService)->getProduct(123));
    }

    public function test_it_reports_upstream_errors_instead_of_treating_them_as_missing_products(): void
    {
        config(['services.product.url' => 'http://product-service.test']);
        Http::fake([
            'product-service.test/products/123' => Http::response([], 503),
        ]);

        $this->expectException(ProductServiceUnavailableException::class);

        (new ProductService)->getProduct(123);
    }
}
