# Laravel Real-Time Chat Application

This project is a real-time chat application built with Laravel 11, utilizing Laravel Websockets for real-time capabilities. The application allows to communicate in real-time via a web interface.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- PHP >= 8.2
- Composer installed
- A web server like Apache or Nginx (optional)
- A relational database like MySQL installed (optional)

## Installation

Follow these steps to set up your project:

1. **Clone the Repository**

   Clone this repository to your local machine using:

    ```bash
    git clone ... live_time_app
    cd live_time_app
    ```

2. **Install Dependencies**

   Run the following command to install the necessary PHP packages:

    ```bash
    composer install
    ```

3. **Environment Setup**

   Copy the example environment file and modify it according to your environment settings:

    ```bash
    cp .env.example .env
    ```

   Update the `.env` file with your database settings and any other configurations.

4. **Generate Application Key**

   Generate a new application key:

    ```bash
    php artisan key:generate
    ```

5. **Run Migrations and Seeders**

   Migrate the database tables and seed them with initial data:

    ```bash
    php artisan migrate
    php artisan db:seed
    ```

6. **Install and Compile Front-End Assets**

   If your project uses front-end assets managed by Laravel Vite, run:

    ```bash
    npm install
    npm run dev
    ```

   This will install necessary Node modules and compile your assets for development.

### Docker
1. **Sail run**
    ```bash
    ./vendor/bin/sail up
    ```
   Add prefix sail
   ```bash
    alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
    ```
2. **For run command in docker use sail prefix**
   ```bash
    sail php artisan reverb:start
    ```
Read more: https://laravel.com/docs/11.x/sail


## Running the Application

To start the Laravel development server, run:

```bash
php artisan serve
```

## Commands

Check unanswered chat

```bash
php artisan chat:check-responses
```
Sail
```bash
sail php artisan chat:check-responses
```

## Websockets

**Start the Websockets Server**

To enable real-time features, start the Laravel Websockets server:

 ```bash
 php artisan reverb:start
 ```
Sail
```bash
 sail php artisan reverb:start
 ```
