<?php
namespace App\Resolvers;

use App\Models\Attribute;
use GraphQL\Type\Definition\ResolveInfo;

class AttributeResolver {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function resolveAttributes($root, $args, $context, ResolveInfo $info) {
        return Attribute::getAllAttributes($this->conn);
    }

    public function resolveAttribute($root, $args, $context, ResolveInfo $info) {
        $id = $args['id'];
        return Attribute::getAttributeById($this->conn, $id);
    }
}
