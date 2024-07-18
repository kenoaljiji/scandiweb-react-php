<?php
namespace App\Models;

class Price {
    private $id;
    private $productId;
    private $amount;
    private $currencyLabel;
    private $currencySymbol;

    public function __construct($id, $productId, $amount, $currencyLabel, $currencySymbol) {
        $this->id = $id;
        $this->productId = $productId;
        $this->amount = $amount;
        $this->currencyLabel = $currencyLabel;
        $this->currencySymbol = $currencySymbol;
    }

    public function getId() {
        return $this->id;
    }

    public function getProductId() {
        return $this->productId;
    }

    public function getAmount() {
        return $this->amount;
    }

    public function getCurrencyLabel() {
        return $this->currencyLabel;
    }

    public function getCurrencySymbol() {
        return $this->currencySymbol;
    }

    public static function getAllPrices($conn) {
        $result = $conn->query("SELECT * FROM prices");
        $prices = [];
        while ($row = $result->fetch_assoc()) {
            $prices[] = new Price(
                $row['id'],
                $row['product_id'],
                $row['amount'],
                $row['currency_label'],
                $row['currency_symbol']
            );
        }
        return $prices;
    }
}
