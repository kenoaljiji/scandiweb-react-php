<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../bootstrap.php';

use App\Database\Database;

try {
    $db = Database::getConnection();
    echo "Database connection successful.";
} catch (Exception $e) {
    echo "Database connection failed: " . $e->getMessage();
}
