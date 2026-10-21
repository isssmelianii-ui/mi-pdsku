<?php

namespace App\Services;

use App\Exceptions\ProductServiceUnavailableException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class ProductService
{
    public function getProduct(int $productId): ?array
    {
        try {
            $response = Http::baseUrl(config('services.product.url'))
                ->timeout(5)
                ->get("/products/{$productId}");
        } catch (ConnectionException $e) {
            throw new ProductServiceUnavailableException(
                'Tidak dapat terhubung ke product-service.',
                previous: $e,
            );
        }

        if ($response->status() === 404) {
            return null;
        }

        if (! $response->successful()) {
            throw new ProductServiceUnavailableException(
                'Product-service mengembalikan respons yang tidak berhasil.',
            );
        }

        $product = $response->json('data');
        if (! is_array($product)) {
            throw new ProductServiceUnavailableException(
                'Respons product-service tidak berisi data produk yang valid.',
            );
        }

        return $product;
    }
}
