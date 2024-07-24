<?php
namespace App\Resolvers;

use App\Models\Product;
use GraphQL\Type\Definition\ResolveInfo;

class ProductResolver {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function resolveProducts($root, $args, $context, ResolveInfo $info) {
        try {
            $category = isset($args['category']) ? $args['category'] : null;
            return Product::getAllProducts($this->conn, $category);
        } catch (\Exception $e) {
            error_log("Error resolving products: " . $e->getMessage());
            return null;
        }
    }

    public function resolveProduct($root, $args, $context, ResolveInfo $info) {
        $id = $args['id'];
        return Product::getProductById($this->conn, $id);
    }
}
