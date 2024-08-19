<?php

use App\Database\Database;
use Symfony\Component\Dotenv\Dotenv;

require_once __DIR__ . '/vendor/autoload.php'; // Ensure the correct path to autoload.php

// Load environment variables
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/.env'); // Adjust path to point to the .env file in the project root

// Initialize database connection
$db = Database::getConnection();
