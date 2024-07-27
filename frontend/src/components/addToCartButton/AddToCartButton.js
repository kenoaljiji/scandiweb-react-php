import React, { Component } from 'react';
import classes from './AddToCartButton.module.scss';

class AddToCartButton extends Component {
  isReadyToAdd = () => {
    const { product, selectedAttributes } = this.props;
    return product.attributes.every((attr) => selectedAttributes[attr.name]);
  };

  addToCart = () => {
    if (!this.isReadyToAdd()) {
      alert('Please select all product options.');
      return;
    }
    // Logic to add to cart
    console.log('Product added to cart');
  };

  render() {
    return (
      <button
        onClick={this.addToCart}
        disabled={!this.isReadyToAdd()}
        data-testid='add-to-cart'
        className={classes['add-to-cart-button']}
      >
        Add to Cart
      </button>
    );
  }
}

export default AddToCartButton;
