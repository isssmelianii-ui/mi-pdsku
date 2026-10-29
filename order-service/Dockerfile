
FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader

RUN mkdir -p storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 3003


CMD ["sh", "-c", "if [ ! -f .env ]; then cp .env.example .env; fi; if ! grep -q '^APP_KEY=base64:' .env; then php artisan key:generate --force; fi; php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=3003"]
