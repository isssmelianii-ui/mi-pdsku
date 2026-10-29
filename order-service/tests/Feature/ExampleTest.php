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
}