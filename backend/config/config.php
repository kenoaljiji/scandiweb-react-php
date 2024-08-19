<?php 

use Symfony\Component\Dotenv\Dotenv;

require_once __DIR__ . '/../vendor/autoload.php'; // Ensure autoload.php is loaded

// Load environment variables using Symfony Dotenv
$dotenv = new Dotenv();

$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $dotenv->load($envFile); // Load from .env file if it exists
}

// Define default values
$defaultDbConfig = [
    'host' => 'keni.ba',
    'user' => 'keniba_scandiweb',
    'password' => 'scandiweb123',
    'dbname' => 'keniba_scandiweb',
];

return [
    'db' => [
        'host' => $_ENV['DB_HOST'] ?? $defaultDbConfig['host'],
        'user' => $_ENV['DB_USER'] ?? $defaultDbConfig['user'],
        'password' => $_ENV['DB_PASSWORD'] ?? $defaultDbConfig['password'],
        'dbname' => $_ENV['DB_NAME'] ?? $defaultDbConfig['dbname'],
    ]
];
