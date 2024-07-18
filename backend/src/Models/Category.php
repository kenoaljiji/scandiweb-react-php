<?php
namespace App\Models;

class Category {
    private $id;
    private $name;

    public function __construct($id, $name) {
        $this->id = $id;
        $this->name = $name;
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public static function getAllCategories($conn) {
        $result = $conn->query("SELECT * FROM categories");
        $categories = [];
        while ($row = $result->fetch_assoc()) {
            $categories[] = new Category($row['id'], $row['name']);
        }
        return $categories;
    }
}
