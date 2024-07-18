<?php
namespace App\Type;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class MutationType extends ObjectType
{
    public function __construct()
    {
         $config = [
            'name' => 'Mutation',
            'fields' => [
                'insertOrder' => [
                    'type' => Type::boolean(),
                    'args' => [
                        'productId' => ['type' => Type::nonNull(Type::id())],
                        'quantity' => ['type' => Type::nonNull(Type::int())],
                    ],
                    'resolve' => function ($rootValue, $args, $context) {
                        $conn = $context['conn'];
                        $productId = $conn->real_escape_string($args['productId']);
                        $quantity = intval($args['quantity']);
                        $sql = "INSERT INTO orders (product_id, quantity) VALUES ('$productId', $quantity)";
                        return $conn->query($sql);
                    },
                ],
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
