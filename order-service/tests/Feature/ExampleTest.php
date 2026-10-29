<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_health_endpoint_returns_order_service_status(): void
    {
        $response = $this->getJson('/health');

        $response
            ->assertStatus(200)
            ->assertExactJson([
                'status' => 'ok',
                'service' => 'order-service',
            ]);
    }

    public function test_creating_order_without_user_id_returns_422(): void
    {
        $response = $this->postJson('/orders', []);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['user_id']);
    }
}