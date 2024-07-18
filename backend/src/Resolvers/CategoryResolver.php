<?php
namespace App\Resolvers;

use App\Models\Category;
use GraphQL\Type\Definition\ResolveInfo;

class CategoryResolver {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function resolveCategories($root, $args, $context, ResolveInfo $info) {
        return Category::getAllCategories($this->conn);
    }

    public function resolveCategory($root, $args, $context, ResolveInfo $info) {
        $id = $args['id'];
        return Category::getCategoryById($this->conn, $id);
    }
}
