<?php

namespace App\Services;

use App\Exceptions\ServiceUnavailableException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class ProductServiceClient
{
    public function getProduct(int $productId): ?array
    {
        $url = rtrim(config('services.product.url'), '/');

        try {
            $response = Http::timeout(5)
                ->get("{$url}/products/{$productId}");
        } catch (ConnectionException $exception) {
            throw new ServiceUnavailableException(
                'Product Service tidak dapat dihubungi.',
                0,
                $exception
            );
        }

        if ($response->status() === 404) {
            return null;
        }

        if ($response->serverError()) {
            throw new ServiceUnavailableException(
                'Product Service mengalami gangguan.'
            );
        }

        if (! $response->successful()) {
            throw new ServiceUnavailableException(
                'Respons Product Service tidak sesuai kontrak.'
            );
        }

        $product = $response->json('data');

        if (
            ! is_array($product)
            || ! isset(
                $product['id'],
                $product['name'],
                $product['price'],
                $product['stock']
            )
        ) {
            throw new ServiceUnavailableException(
                'Data produk dari Product Service tidak valid.'
            );
        }

        return $product;
    }
}