<?php
namespace App\Models;

class Product {
    private $id;
    private $name;
    private $inStock;
    private $description;
    private $category;
    private $brand;
    private $gallery;
    private $attributes;
    private $prices;

    public function __construct($id, $name, $inStock, $description, $category, $brand, $gallery, $attributes, $prices) {
        $this->id = $id;
        $this->name = $name;
        $this->inStock = $inStock;
        $this->description = $description;
        $this->category = $category;
        $this->brand = $brand;
        $this->gallery = $gallery;
        $this->attributes = $attributes;
        $this->prices = $prices;
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function isInStock() {
        return $this->inStock;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getCategory() {
        return $this->category;
    }

    public function getBrand() {
        return $this->brand;
    }

    public function getGallery() {
        return $this->gallery;
    }

    public function getAttributes() {
        return $this->attributes;
    }

    public function getPrices() {
        return $this->prices;
    }

     public static function getAllProducts($conn, $category = null) {
        try {
            $sql = "SELECT * FROM products";
            if ($category) {
                $category = $conn->real_escape_string($category);
                $sql .= " WHERE category = '$category'";
            }
            $result = $conn->query($sql);
            $products = [];
            while ($row = $result->fetch_assoc()) {
                $gallery = self::fetchGallery($conn, $row['id']);
                $attributes = self::fetchAttributes($conn, $row['id']);
                $prices = self::fetchPrices($conn, $row['id']);
                $products[] = new Product(
                    $row['id'],
                    $row['name'],
                    $row['in_stock'],
                    $row['description'],
                    $row['category'],
                    $row['brand'],
                    $gallery,
                    $attributes,
                    $prices
                );
            }
            return $products;
        } catch (\Exception $e) {
            error_log("Error fetching products: " . $e->getMessage());
            return [];
        }
    }

    public static function getProductById($conn, $id) {
        $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $gallery = self::fetchGallery($conn, $row['id']);
            $attributes = self::fetchAttributes($conn, $row['id']);
            $prices = self::fetchPrices($conn, $row['id']);
            return new Product(
                $row['id'],
                $row['name'],
                $row['in_stock'],
                $row['description'],
                $row['category'],
                $row['brand'],
                $gallery,
                $attributes,
                $prices
            );
        }
        return null;
    }

    private static function fetchGallery($conn, $productId) {
        $stmt = $conn->prepare("SELECT * FROM galleries WHERE product_id = ?");
        $stmt->bind_param("s", $productId);
        $stmt->execute();
        $result = $stmt->get_result();
        $gallery = [];
        while ($row = $result->fetch_assoc()) {
            $gallery[] = new Gallery($row['id'], $row['url']);
        }
        return $gallery;
    }

    private static function fetchAttributes($conn, $productId) {
        $stmt = $conn->prepare("SELECT * FROM product_attributes WHERE product_id = ?");
        $stmt->bind_param("s", $productId);
        $stmt->execute();
        $result = $stmt->get_result();
        $attributes = [];
        while ($row = $result->fetch_assoc()) {
            $attribute = Attribute::getAttributeById($conn, $row['attribute_id']);
            $items = AttributeItem::getItemsByAttributeId($conn, $attribute->getId());
            $attributes[] = new ProductAttribute($attribute->getId(), $attribute->getName(), $attribute->getType(), $items);
        }
        return $attributes;
    }

    private static function fetchPrices($conn, $productId) {
        $stmt = $conn->prepare("SELECT * FROM prices WHERE product_id = ?");
        $stmt->bind_param("s", $productId);
        $stmt->execute();
        $result = $stmt->get_result();
        $prices = [];
        while ($row = $result->fetch_assoc()) {
            $prices[] = new Price($row['id'], $row['amount'], $row['currency_label'], $row['currency_symbol']);
        }
        return $prices;
    }
}
