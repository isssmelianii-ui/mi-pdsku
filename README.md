# Microservice stack

The root Compose project starts the product, cart, and review services with
their MySQL, PostgreSQL, and MongoDB databases:

```sh
docker compose up --build
```

The services are available on ports 3000 (product), 3001 (cart), and 3002
(review). The cart API uses the product service to validate product IDs before
adding items; a missing product returns 404 and an unavailable product service
returns 502.

The databases use named Docker volumes and are kept when stopping the stack
with `docker compose down`. Do not use `docker compose down --volumes` if the
database contents must be preserved.
