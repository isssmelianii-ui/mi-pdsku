<?php

namespace App\Services;

use App\Exceptions\ServiceUnavailableException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class CartServiceClient
{
    public function getCart(int $userId): array
    {
        $url = rtrim(config('services.cart.url'), '/');

        try {
            $response = Http::timeout(5)
                ->get("{$url}/carts/{$userId}");
        } catch (ConnectionException $exception) {
            throw new ServiceUnavailableException(
                'Cart Service tidak dapat dihubungi.',
                0,
                $exception
            );
        }

        if ($response->serverError()) {
            throw new ServiceUnavailableException(
                'Cart Service mengalami gangguan.'
            );
        }

        if (! $response->successful()) {
            throw new ServiceUnavailableException(
                'Respons Cart Service tidak sesuai kontrak.'
            );
        }

        $cart = $response->json('data');

        if (
            ! is_array($cart)
            || ! isset($cart['items'])
            || ! is_array($cart['items'])
        ) {
            throw new ServiceUnavailableException(
                'Data keranjang dari Cart Service tidak valid.'
            );
        }

        return $cart;
    }

    public function clearCart(int $userId): bool
    {
        $url = rtrim(config('services.cart.url'), '/');

        try {
            $response = Http::timeout(5)
                ->delete("{$url}/carts/{$userId}");

            return $response->successful();
        } catch (ConnectionException $exception) {
            return false;
        }
    }
}