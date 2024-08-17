// src/components/addToCartButton/AddToCartButton.js
import React, { Component } from "react";
import { CartContext } from "../../context/CartContext";

import classes from "./AddToCartButton.module.scss";

class AddToCartButton extends Component {
  static contextType = CartContext;

  addToCart = () => {
    const { product, selectedAttributes } = this.props;
    const { addToCart, toggleCart } = this.context;
    const cartItem = {
      ...product,
      selectedAttributes,
      quantity: 1,
    };

    addToCart(cartItem);
    toggleCart();
  };

  render() {
    const { product } = this.props;

    return (
      <button
        onClick={this.addToCart}
        disabled={!this.props.product.inStock}
        data-testid={
          product && product.inStock ? "add-to-cart" : "add-to-cart-disabled"
        }
        className={`${classes["add-to-cart-button"]} ${
          !product.inStock && classes.disabled
        }`}
      >
        {product.inStock ? "Add to Cart" : "Out of stock"}
      </button>
    );
  }
}

export default AddToCartButton;
