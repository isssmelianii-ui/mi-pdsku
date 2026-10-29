<?php

namespace App\Http\Controllers;

use App\Exceptions\OrderBusinessException;
use App\Exceptions\ServiceUnavailableException;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class OrderController extends Controller
{
    public function health(): JsonResponse
    {
        return response()->json([
            'status' => 'ok',
            'service' => 'order-service',
        ], 200);
    }

    public function store(
        StoreOrderRequest $request,
        OrderService $orderService
    ): JsonResponse {
        $userId = (int) $request->validated()['user_id'];

        try {
            $order = $orderService->createOrder($userId);

            $orderService->clearCartAfterOrder(
                $userId,
                (int) $order->id
            );

            return response()->json([
                'message' => 'Pesanan berhasil dibuat.',
                'data' => $order,
            ], 201);
        } catch (OrderBusinessException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], $exception->statusCode);
        } catch (ServiceUnavailableException $exception) {
            Log::error(
                'Order Service gagal mengakses service lain.',
                [
                    'user_id' => $userId,
                    'error' => $exception->getMessage(),
                ]
            );

            return response()->json([
                'message' => 'Service terkait sedang tidak tersedia.',
                ...(
                    config('app.debug')
                        ? ['error' => $exception->getMessage()]
                        : []
                ),
            ], 503);
        } catch (Throwable $exception) {
            Log::error('Gagal membuat pesanan.', [
                'user_id' => $userId,
                'error' => $exception->getMessage(),
            ]);

            return response()->json([
                'message' => 'Terjadi kesalahan saat membuat pesanan.',
                ...(
                    config('app.debug')
                        ? ['error' => $exception->getMessage()]
                        : []
                ),
            ], 500);
        }
    }

    public function show(
        string $id,
        OrderService $orderService
    ): JsonResponse {
        if (! ctype_digit($id) || (int) $id < 1) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan.',
            ], 404);
        }

        $order = $orderService->getOrder((int) $id);

        if (! $order) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail pesanan berhasil diambil.',
            'data' => $order,
        ], 200);
    }

    public function userOrders(
        string $userId,
        Request $request,
        OrderService $orderService
    ): JsonResponse {
        if (! ctype_digit($userId) || (int) $userId < 1) {
            return response()->json([
                'message' => 'User tidak valid.',
            ], 404);
        }

        $status = $request->query('status');

        if (
            $status !== null
            && ! in_array($status, ['PENDING', 'PAID'], true)
        ) {
            return response()->json([
                'message' => 'Status harus PENDING atau PAID.',
                'errors' => [
                    'status' => [
                        'Status yang dipilih tidak valid.',
                    ],
                ],
            ], 422);
        }

        $orders = $orderService->getUserOrders(
            (int) $userId,
            $status
        );

        return response()->json([
            'message' => 'Daftar pesanan berhasil diambil.',
            'data' => $orders,
        ], 200);
    }

    public function pay(
        string $id,
        OrderService $orderService
    ): JsonResponse {
        if (! ctype_digit($id) || (int) $id < 1) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan.',
            ], 404);
        }

        try {
            $order = $orderService->payOrder((int) $id);

            return response()->json([
                'message' => 'Pembayaran pesanan berhasil.',
                'data' => $order,
            ], 200);
        } catch (OrderBusinessException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], $exception->statusCode);
        } catch (Throwable $exception) {
            Log::error(
                'Gagal memproses pembayaran pesanan.',
                [
                    'order_id' => (int) $id,
                    'error' => $exception->getMessage(),
                ]
            );

            return response()->json([
                'message' => 'Terjadi kesalahan saat memproses pembayaran.',
                ...(
                    config('app.debug')
                        ? ['error' => $exception->getMessage()]
                        : []
                ),
            ], 500);
        }
    }
}