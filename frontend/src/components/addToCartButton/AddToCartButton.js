// src/components/addToCartButton/AddToCartButton.js
import React, { Component } from 'react';
import { CartContext } from '../../context/cartContext';

import classes from './AddToCartButton.module.scss';

class AddToCartButton extends Component {
  static contextType = CartContext;

  isReadyToAdd = () => {
    const { product, selectedAttributes } = this.props;
    return product.attributes.every((attr) => selectedAttributes[attr.name]);
  };

  addToCart = () => {
    /* if (!this.isReadyToAdd()) {
      alert('Please select all product options.');
      return;
    }
 */
    const { product, selectedAttributes } = this.props;
    const cartItem = {
      ...product,
      selectedAttributes,
    };

    // Correct use of context to call addToCart
    this.context.addToCart(cartItem);
  };

  render() {
    console.log(this.context);

    return (
      <button
        onClick={this.addToCart}
        /*  disabled={!this.isReadyToAdd()} */
        data-testid='add-to-cart'
        className={classes['add-to-cart-button']}
      >
        Add to Cart
      </button>
    );
  }
}

export default AddToCartButton;
