<?php

require_once __DIR__ . '/../vendor/autoload.php';
use App\Database\Database;

// Create connection
$conn = Database::getConnection();

// Read JSON file
$json = file_get_contents(__DIR__ . '/../data/data.json');
$data = json_decode($json, true)['data'];

// Insert categories
foreach ($data['categories'] as $category) {
    $name = $conn->real_escape_string($category['name']);
    $sql = "INSERT INTO categories (name) VALUES ('$name') ON DUPLICATE KEY UPDATE name=VALUES(name)";
    if (!$conn->query($sql)) {
        echo "Error: " . $conn->error . "\n";
    }
}

// Insert products and related data
foreach ($data['products'] as $product) {
    $id = $conn->real_escape_string($product['id']);
    $name = $conn->real_escape_string($product['name']);
    $inStock = $product['inStock'] ? 1 : 0;
    $description = $conn->real_escape_string($product['description']);
    $category = $conn->real_escape_string($product['category']);
    $brand = $conn->real_escape_string($product['brand']);

    // Insert product
    $sql = "INSERT INTO products (id, name, inStock, description, category, brand) 
            VALUES ('$id', '$name', $inStock, '$description', '$category', '$brand')
            ON DUPLICATE KEY UPDATE 
                name=VALUES(name), 
                inStock=VALUES(inStock),
                description=VALUES(description),
                category=VALUES(category),
                brand=VALUES(brand)";
                
    if (!$conn->query($sql)) {
        echo "Error: " . $conn->error . "\n";
    }

    // Insert gallery
    foreach ($product['gallery'] as $url) {
        $url = $conn->real_escape_string($url);
        $sql = "INSERT INTO galleries (product_id, url) VALUES ('$id', '$url')";
        if (!$conn->query($sql)) {
            echo "Error: " . $conn->error . "\n";
        }
    }

    // Insert prices
    foreach ($product['prices'] as $price) {
        $amount = $price['amount'];
        $currency_label = $conn->real_escape_string($price['currency']['label']);
        $currency_symbol = $conn->real_escape_string($price['currency']['symbol']);

        $sql = "INSERT INTO prices (product_id, amount, currency_label, currency_symbol) 
                VALUES ('$id', $amount, '$currency_label', '$currency_symbol')";
        if (!$conn->query($sql)) {
            echo "Error: " . $conn->error . "\n";
        }
    }

    // Insert attributes and attribute items
    // Insert attributes and attribute items
foreach ($product['attributes'] as $attribute) {
    $attr_id = $conn->real_escape_string($attribute['id']);
    $attr_name = $conn->real_escape_string($attribute['name']);
    $attr_type = $conn->real_escape_string($attribute['type']);

    echo "Processing attribute: $attr_name for product: $name\n"; // Debugging output

    // Insert attribute using its name as the ID
    $sql = "INSERT INTO attributes (id, name, type) VALUES ('$attr_id', '$attr_name', '$attr_type')
            ON DUPLICATE KEY UPDATE name=VALUES(name), type=VALUES(type)";
    if (!$conn->query($sql)) {
        echo "Error: " . $conn->error . "\n";
    }

    // Insert attribute items
    // Insert attributes and attribute items
foreach ($product['attributes'] as $attribute) {
    $attr_id = $conn->real_escape_string($attribute['id']);
    $attr_name = $conn->real_escape_string($attribute['name']);
    $attr_type = $conn->real_escape_string($attribute['type']);

    echo "Processing attribute: $attr_name (ID: $attr_id) for product: $name\n"; // Debugging output

    // Insert attribute using its name as the ID
    $sql = "INSERT INTO attributes (id, name, type) VALUES ('$attr_id', '$attr_name', '$attr_type')
            ON DUPLICATE KEY UPDATE name=VALUES(name), type=VALUES(type)";
    if (!$conn->query($sql)) {
        echo "Error: " . $conn->error . "\n";
    }

    // Insert attribute items
    foreach ($attribute['items'] as $item) {
        // Generate a unique ID by combining attribute_id and item_id
        $item_id = $conn->real_escape_string($item['id']);
        $unique_item_id = $attr_id . '-' . $item_id;
        $displayValue = $conn->real_escape_string($item['displayValue']);
        $value = $conn->real_escape_string($item['value']);

        echo "Processing item: $displayValue (ID: $unique_item_id) for attribute: $attr_name\n"; // Debugging output

        $sql = "INSERT INTO attribute_items (id, attribute_id, displayValue, value) 
                VALUES ('$unique_item_id', '$attr_id', '$displayValue', '$value')
                ON DUPLICATE KEY UPDATE displayValue=VALUES(displayValue), value=VALUES(value)";
        if (!$conn->query($sql)) {
            echo "Error inserting item $displayValue for attribute $attr_name: " . $conn->error . "\n";
        }

        // Link product and attribute
        $sql = "INSERT INTO product_attributes (product_id, attribute_id) 
                VALUES ('$id', '$attr_id')
                ON DUPLICATE KEY UPDATE attribute_id=VALUES(attribute_id)";
        if (!$conn->query($sql)) {
            echo "Error linking attribute $attr_name to product $name: " . $conn->error . "\n";
        }
    }
}

}

}

echo "Data imported successfully.";

$conn->close();
