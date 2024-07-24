<?php

namespace App\Type;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\ProductResolver;

class QueryType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Query',
            'fields' => [
                'categories' => [
                    'type' => Type::listOf(CategoryType::getInstance()),
                    'resolve' => function ($root, $args, $context) {
                        $conn = $context['conn'];
                        $result = $conn->query("SELECT * FROM categories");
                        return $result->fetch_all(MYSQLI_ASSOC);
                    }
                ],
                  'products' => [
                    'type' => Type::listOf(ProductType::getInstance()),
                    'args' => [
                        'category' => Type::string(),
                    ],
                    'resolve' => function ($root, $args, $context) {
                        $conn = $context['conn'];
                        $sql = "SELECT * FROM products";
                        if (isset($args['category']) && $args['category'] !== 'all') {
                            $category = $conn->real_escape_string($args['category']);
                            $sql .= " WHERE category = '$category'";
                        }
                        $result = $conn->query($sql);
                        return $result->fetch_all(MYSQLI_ASSOC);
                    }
                ],
                'product' => [
                    'type' => ProductType::getInstance(),
                    'args' => [
                        'id' => Type::nonNull(Type::id())
                    ],
                    'resolve' => function ($root, $args, $context) {
                        $conn = $context['conn'];
                        $id = $conn->real_escape_string($args['id']);
                        $result = $conn->query("SELECT * FROM products WHERE id = '$id'");
                        return $result->fetch_assoc();
                    }
                ]
            ]
        ];
        parent::__construct($config);
    }

    public static function getInstance()
    {
        static $instance;
        if (!$instance) {
            $instance = new self();
        }
        return $instance;
    }
}
