<?php
namespace App\Type;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class PriceType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Price',
            'fields' => [
                'id' => Type::id(),
                'amount' => Type::float(),
                'currency' => [
                    'type' => CurrencyType::getInstance(),
                    'resolve' => function ($root, $args, $context) {
                        return [
                            'label' => $root['currency_label'],
                            'symbol' => $root['currency_symbol']
                        ];
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
