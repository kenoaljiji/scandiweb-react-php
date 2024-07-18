<?php
namespace App\Models;

class Attribute {
    private $id;
    private $name;
    private $type;

    public function __construct($id, $name, $type) {
        $this->id = $id;
        $this->name = $name;
        $this->type = $type;
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getType() {
        return $this->type;
    }

    public static function getAllAttributes($conn) {
        $result = $conn->query("SELECT * FROM attributes");
        $attributes = [];
        while ($row = $result->fetch_assoc()) {
            $attributes[] = new Attribute($row['id'], $row['name'], $row['type']);
        }
        return $attributes;
    }
}
