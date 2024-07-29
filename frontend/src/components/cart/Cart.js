import React, { Component } from 'react';
import { CartContext } from '../../context/cartContext';
import classes from './Cart.module.scss'; // Assuming you are using CSS modules

class Cart extends Component {
  static contextType = CartContext; // Correctly setting contextType

  renderCartItem = (item) => {
    console.log(item);
    return (
      <div key={item.id} className={classes['cart-item']}>
        <h4
          data-testid={`cart-item-attribute-name-${item.name
            .toLowerCase()
            .replace(/\s+/g, '-')}`}
        >
          {item.name}
        </h4>
        {item.attributes?.map((attr) => (
          <div
            key={attr.id}
            data-testid={`cart-item-attribute-${attr.name
              .toLowerCase()
              .replace(/\s+/g, '-')}`}
          >
            {attr.options?.map((option) => (
              <button
                key={option.id}
                className={option.isSelected ? classes.selected : ''}
                data-testid={`cart-item-attribute-${attr.name
                  .toLowerCase()
                  .replace(/\s+/g, '-')}-${option.value
                  .toLowerCase()
                  .replace(/\s+/g, '-')}${
                  option.isSelected ? '-selected' : ''
                }`}
              >
                {option.value}
              </button>
            ))}
          </div>
        ))}
        <div className={classes['cart-item-quantity']}>
          <button data-testid='cart-item-amount-decrease'>-</button>
          <span data-testid='cart-item-amount'>{item.quantity}</span>
          <button data-testid='cart-item-amount-increase'>+</button>
        </div>
      </div>
    );
  };

  render() {
    const cartItems = this.context.cartItems || []; // Safely access cartItems
    const total = this.context.total || 0; // Safely access total, default to 0 if undefined

    return (
      <div
        className={classes.cart}
        style={{ width: '325px', minHeight: '600px' }}
      >
        <h4>My Bag. {cartItems.length} items</h4>
        {cartItems?.map(this.renderCartItem)}
        <div data-testid='cart-total'>
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
    );
  }
}

export default Cart;
