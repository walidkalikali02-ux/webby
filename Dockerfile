FROM php:8.4-fpm-bookworm

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    default-mysql-client \
    nginx \
    supervisor \
    && docker-php-ext-install pdo_mysql zip gd intl mbstring xml curl calendar \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN mkdir -p /var/www/html && chown -R www-data:www-data /var/www/html

WORKDIR /var/www/html

COPY Install/composer.json Install/composer.lock* ./

RUN composer install --no-dev --no-interaction --optimize-autoloader --no-scripts --ignore-platform-reqs

COPY Install/ .

RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache && \
    chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

RUN cp .env.example .env && \
    php artisan key:generate

COPY nginx.conf /etc/nginx/sites-available/default
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
