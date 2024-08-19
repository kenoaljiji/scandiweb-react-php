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

    public function getGallery() {
        return $this->gallery;
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
                $products[] = new Product(
                    $row['id'],
                    $row['name'],
                    $row['in_stock'],
                    $row['description'],
                    $row['category'],
                    $row['brand'],
                    $row['gallery'],      
                    $row['attributes'], 
                    $row['prices']   
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
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            return new Product(
                $row['id'],
                $row['name'],
                $row['in_stock'],
                $row['description'],
                $row['category'],
                $row['brand'],
                $row['gallery'],    
                $row['attributes'],   
                $row['prices']        
            );
        }

        return null;
    }

  
}
