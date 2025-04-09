FROM php:8.3-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Add user for application
RUN groupadd -g 1000 laravel
RUN useradd -u 1000 -ms /bin/bash -g laravel laravel

COPY . /var/www/html

USER laravel

EXPOSE 9000

CMD ["php-fpm"]