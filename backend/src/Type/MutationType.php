<?php

namespace App\Type;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\InputObjectType;

class MutationType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Mutation',
            'fields' => [
                'insertOrder' => [
                    'type' => new ObjectType([
                        'name' => 'OrderResponse',
                        'fields' => [
                            'success' => Type::boolean(),
                            'orderId' => Type::id(),
                            'message' => Type::string()
                        ]
                    ]),
                    'args' => [
                        'items' => Type::listOf(new InputObjectType([
                            'name' => 'OrderItemInput',
                            'fields' => [
                                'productId' => Type::nonNull(Type::id()),
                                'productName' => Type::nonNull(Type::string()),
                                'quantity' => Type::nonNull(Type::int()),
                                'price' => Type::nonNull(Type::float()),
                                'selectedAttributes' => Type::string()
                            ]
                        ]))
                    ],
                    'resolve' => function ($root, $args, $context) {
                        $conn = $context['conn'];
                        $orderId = uniqid();

                        // Start transaction
                        $conn->begin_transaction();

                        try {
                            $total = 0;
                            foreach ($args['items'] as $item) {
                                $quantity = intval($item['quantity']);
                                $price = floatval($item['price']);
                                $itemTotal = $price * $quantity;
                                $total += $itemTotal;
                            }

                            $sql = "INSERT INTO orders (id, total) VALUES ('$orderId', $total)";
                            if (!$conn->query($sql)) {
                                throw new \Exception('Failed to place order: ' . $conn->error);
                            }

                            foreach ($args['items'] as $item) {
                                $productId = $conn->real_escape_string($item['productId']);
                                $productName = $conn->real_escape_string($item['productName']);
                                $quantity = intval($item['quantity']);
                                $price = floatval($item['price']);
                                $selectedAttributes = $conn->real_escape_string($item['selectedAttributes']);

                                $sql = "INSERT INTO order_items (order_id, product_id, product_name, quantity, price, selected_attributes) 
                                        VALUES ('$orderId', '$productId', '$productName', $quantity, $price, '$selectedAttributes')";
                                if (!$conn->query($sql)) {
                                    throw new \Exception('Failed to place order item: ' . $conn->error);
                                }
                            }

                            // Commit transaction
                            $conn->commit();

                            return [
                                'success' => true,
                                'orderId' => $orderId,
                                'message' => 'Order placed successfully'
                            ];
                        } catch (\Exception $e) {
                            // Rollback transaction
                            $conn->rollback();

                            return [
                                'success' => false,
                                'orderId' => null,
                                'message' => $e->getMessage()
                            ];
                        }
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
