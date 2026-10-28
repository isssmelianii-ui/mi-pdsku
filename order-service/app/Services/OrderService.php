<?php

namespace App\Services;

use App\Exceptions\OrderBusinessException;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderService
{
    public function __construct(
        private CartServiceClient $cartClient,
        private ProductServiceClient $productClient
    ) {
    }

    public function createOrder(int $userId): Order
    {
        // 1. Ambil keranjang melalui Cart Service Client.
        $cart = $this->cartClient->getCart($userId);
        $items = $cart['items'] ?? [];

        if (empty($items)) {
            throw new OrderBusinessException(
                'Keranjang kosong.',
                409
            );
        }

        $orderItems = [];
        $totalAmount = 0;

        // 2. Validasi produk dan stok sebelum menyimpan order.
        foreach ($items as $item) {
            $productId = (int) ($item['product_id'] ?? 0);
            $quantity = (int) ($item['quantity'] ?? 0);

            if ($productId < 1 || $quantity < 1) {
                throw new OrderBusinessException(
                    'Data item keranjang tidak valid.',
                    409
                );
            }

            $product = $this->productClient->getProduct($productId);

            if ($product === null) {
                throw new OrderBusinessException(
                    "Produk dengan id {$productId} tidak ditemukan.",
                    409
                );
            }

            $stock = (int) $product['stock'];

            if ($stock < $quantity) {
                throw new OrderBusinessException(
                    sprintf(
                        'Stok %s tidak mencukupi: diminta %d, tersedia %d.',
                        $product['name'],
                        $quantity,
                        $stock
                    ),
                    409
                );
            }

            $price = (float) $product['price'];
            $subtotal = round($price * $quantity, 2);

            $orderItems[] = [
                'product_id'   => $productId,
                'product_name' => $product['name'],
                'unit_price'   => $price,
                'quantity'     => $quantity,
                'subtotal'     => $subtotal,
            ];

            $totalAmount += $subtotal;
        }

        // 3. Simpan order dan item dalam satu transaksi database.
        return DB::transaction(function () use (
            $userId,
            $orderItems,
            $totalAmount
        ) {
            $order = Order::create([
                'user_id'      => $userId,
                'status'       => 'PENDING',
                'total_amount' => round($totalAmount, 2),
            ]);

            $order->items()->createMany($orderItems);

            return $order->load('items');
        });
    }

    public function clearCartAfterOrder(
        int $userId,
        int $orderId
    ): void {
        // Kegagalan mengosongkan keranjang tidak membatalkan order.
        if (!$this->cartClient->clearCart($userId)) {
            Log::error(
                'Order tersimpan, tetapi keranjang gagal dikosongkan.',
                [
                    'user_id'  => $userId,
                    'order_id' => $orderId,
                ]
            );
        }
    }

    public function getOrder(int $id): ?Order
    {
        return Order::with('items')->find($id);
    }

    public function getUserOrders(
        int $userId,
        ?string $status = null
    ) {
        $query = Order::with('items')
            ->where('user_id', $userId);

        if ($status !== null) {
            $query->where('status', $status);
        }

        return $query->orderByDesc('created_at')->get();
    }

    // 4. Proses perubahan status pesanan menjadi PAID.
    public function payOrder(int $id): Order
    {
        $order = Order::find($id);

        if (!$order) {
            throw new OrderBusinessException(
                'Pesanan tidak ditemukan.',
                404
            );
        }

        if ($order->status !== 'PENDING') {
            throw new OrderBusinessException(
                'Pesanan tidak dapat dibayar karena statusnya bukan PENDING.',
                409
            );
        }

        $order->status = 'PAID';
        $order->save();

        return $order->load('items');
    }
}