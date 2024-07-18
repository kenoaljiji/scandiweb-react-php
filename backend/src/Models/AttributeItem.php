<?php
namespace App\Models;

class AttributeItem {
    private $id;
    private $attributeId;
    private $displayValue;
    private $value;

    public function __construct($id, $attributeId, $displayValue, $value) {
        $this->id = $id;
        $this->attributeId = $attributeId;
        $this->displayValue = $displayValue;
        $this->value = $value;
    }

    public function getId() {
        return $this->id;
    }

    public function getAttributeId() {
        return $this->attributeId;
    }

    public function getDisplayValue() {
        return $this->displayValue;
    }

    public function getValue() {
        return $this->value;
    }

    public static function getAllAttributeItems($conn) {
        $result = $conn->query("SELECT * FROM attribute_items");
        $attributeItems = [];
        while ($row = $result->fetch_assoc()) {
            $attributeItems[] = new AttributeItem(
                $row['id'],
                $row['attribute_id'],
                $row['display_value'],
                $row['value']
            );
        }
        return $attributeItems;
    }
}
