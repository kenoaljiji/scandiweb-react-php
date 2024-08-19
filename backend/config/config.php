<?php
use Symfony\Component\Dotenv\Dotenv;

require_once __DIR__ . '/../vendor/autoload.php'; // Ensure autoload.php is loaded

// Load environment variables using Symfony Dotenv
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/../.env'); // Adjust path to the .env file in the backend directory

return [
    'db' => [
        'host' => $_ENV['DB_HOST'],
        'user' => $_ENV['DB_USER'],
        'password' => $_ENV['DB_PASSWORD'],
        'dbname' => $_ENV['DB_NAME'],
    ]
];
