<?php
namespace App\Database;

use mysqli;

class Database {
    private static $connection;

    public static function getConnection() {
        if (!self::$connection) {
            $config = require __DIR__ . '/../../config/config.php';
            self::$connection = new mysqli(
                $config['db']['host'],
                $config['db']['user'],
                $config['db']['password'],
                $config['db']['dbname']
            );

            if (self::$connection->connect_error) {
                throw new \Exception('Connection failed: ' . self::$connection->connect_error);
            }
        }

        return self::$connection;
    }
}
