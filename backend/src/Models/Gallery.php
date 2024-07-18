<?php
namespace App\Models;

class Gallery {
    private $id;
    private $productId;
    private $url;

    public function __construct($id, $productId, $url) {
        $this->id = $id;
        $this->productId = $productId;
        $this->url = $url;
    }

    public function getId() {
        return $this->id;
    }

    public function getProductId() {
        return $this->productId;
    }

    public function getUrl() {
        return $this->url;
    }

    public static function getAllGalleries($conn) {
        $result = $conn->query("SELECT * FROM galleries");
        $galleries = [];
        while ($row = $result->fetch_assoc()) {
            $galleries[] = new Gallery($row['id'], $row['product_id'], $row['url']);
        }
        return $galleries;
    }
}
