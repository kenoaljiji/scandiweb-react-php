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
        return Product::getAllProducts($this->conn);
    }

    public function resolveProduct($root, $args, $context, ResolveInfo $info) {
        $id = $args['id'];
        return Product::getProductById($this->conn, $id);
    }

  /*   public function resolveAddProduct($root, $args, $context, ResolveInfo $info) {
        return Product::addProduct($this->conn, $args);
    } */
}
