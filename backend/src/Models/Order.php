<?php
namespace App\Models;

class Order
{
    public static function createOrder($conn, $orderItems)
    {
        $conn->begin_transaction();
        try {
            // Calculate total order amount
            $total = 0;
            foreach ($orderItems as $item) {
                $total += $item['price'] * $item['quantity'];
            }

            // Insert into orders table
            $stmt = $conn->prepare("INSERT INTO orders (total) VALUES (?)");
            $stmt->bind_param("d", $total);
            $stmt->execute();
            $orderId = $conn->insert_id;

            // Insert into order_items table
            foreach ($orderItems as $item) {
                $productId = $conn->real_escape_string($item['productId']);
                $productName = $conn->real_escape_string($item['productName']);
                $quantity = intval($item['quantity']);
                $price = floatval($item['price']);
                $selectedAttributes = $conn->real_escape_string($item['selectedAttributes']);
                $stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, product_name, quantity, price, selected_attributes) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("issids", $orderId, $productId, $productName, $quantity, $price, $selectedAttributes);
                $stmt->execute();
            }

            $conn->commit();
            return [
                'id' => $orderId,
                'total' => $total,
                'createdAt' => date('Y-m-d H:i:s'),
            ];
        } catch (\Exception $e) {
            $conn->rollback();
            error_log($e->getMessage());
            return null;
        }
    }
}
