<?php
namespace App\Type;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class ProductType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'inStock' => Type::boolean(),
                'description' => Type::string(),
                'category' =>  Type::string(),
                'brand' => Type::string(),
                'gallery' => [
                    'type' => Type::listOf(GalleryType::getInstance()),
                    'resolve' => function ($root, $args, $context) {
                        $conn = $context['conn'];
                        $productId = $conn->real_escape_string($root['id']);
                        $result = $conn->query("SELECT * FROM galleries WHERE product_id = '$productId'");
                        return $result->fetch_all(MYSQLI_ASSOC);
                    }
                ],
                'attributes' => [
                    'type' => Type::listOf(ProductAttributeType::getInstance()),
                    'resolve' => function ($root, $args, $context) {
                        $conn = $context['conn'];
                        $productId = $conn->real_escape_string($root['id']);
                        $result = $conn->query("SELECT a.id, a.name, a.type FROM attributes a JOIN product_attributes pa ON a.id = pa.attribute_id WHERE pa.product_id = '$productId'");
                        $attributes = $result->fetch_all(MYSQLI_ASSOC);
                        
                        foreach ($attributes as &$attribute) {
                            $attributeId = $attribute['id'];
                            $itemsResult = $conn->query("SELECT * FROM attribute_items WHERE attribute_id = '$attributeId'");
                            $attribute['items'] = $itemsResult->fetch_all(MYSQLI_ASSOC);
                        }
                        
                        return $attributes;
                    }
                ],
                  'prices' => [
                    'type' => Type::listOf(PriceType::getInstance()),
                    'resolve' => function ($root, $args, $context) {
                        $conn = $context['conn'];
                        $productId = $conn->real_escape_string($root['id']);
                        $result = $conn->query("SELECT * FROM prices WHERE product_id = '$productId'");
                        return $result->fetch_all(MYSQLI_ASSOC);
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
