<?php
namespace App\Type;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\ResolveInfo;
use App\Models\Order;

class MutationType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Mutation',
            'fields' => [
                'insertOrder' => [
                    'type' => OrderType::getInstance(),
                    'args' => [
                        'orderItems' => [
                            'type' => Type::listOf(new InputObjectType([
                                'name' => 'OrderItemInput',
                                'fields' => [
                                    'productId' => Type::nonNull(Type::id()),
                                    'productName' => Type::nonNull(Type::string()),
                                    'quantity' => Type::nonNull(Type::int()),
                                    'price' => Type::nonNull(Type::float()),
                                    'selectedAttributes' => Type::string(),
                                ],
                            ])),
                        ],
                    ],
                    'resolve' => function ($root, $args, $context, ResolveInfo $info) {
                        return Order::createOrder($context['conn'], $args['orderItems']);
                    },
                ],
            ],
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
