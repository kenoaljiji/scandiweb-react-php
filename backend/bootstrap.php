<?php

use App\Database\Database;
use Symfony\Component\Dotenv\Dotenv;

require_once __DIR__ . '/vendor/autoload.php'; // Ensure the correct path to autoload.php

// Load environment variables
$dotenv = new Dotenv();

// Initialize database connection
$db = Database::getConnection();
