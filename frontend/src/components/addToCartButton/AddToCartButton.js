import React, { Component } from "react";
import { CartContext } from "../../context/CartContext";

import classes from "./AddToCartButton.module.scss";
import { toCamelCase } from "../../helpers/initializeAttribute";

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

  allAttributesSelected = () => {
    const { product, selectedAttributes } = this.props;

    // Get the number of attributes in the product
    const requiredAttributes = product.attributes?.length;

    // Get the number of selected attributes
    const selectedAttributesCount = Object.keys(selectedAttributes).length;

    // If there are no attributes, no need to select anything (button should be enabled)
    if (requiredAttributes === 0) {
      return true;
    }

    // Ensure all attributes that need to be selected have been selected
    return selectedAttributesCount === requiredAttributes;
  };

  render() {
    const { product, selectedAttributes } = this.props;
    const allSelected = this.allAttributesSelected();

    console.log(selectedAttributes);

    return (
      <button
        onClick={this.addToCart}
        disabled={!product.inStock || !allSelected}
        data-testid={
          product && product.inStock && allSelected
            ? "add-to-cart"
            : "add-to-cart-disabled"
        }
        className={`${classes["add-to-cart-button"]} ${
          (!product.inStock || !allSelected) && classes.disabled
        }`}
      >
        {product.inStock ? "Add to Cart" : "Out of stock"}
      </button>
    );
  }
}

export default AddToCartButton;
