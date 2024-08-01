import React, { createContext, Component } from 'react';

export const CartContext = createContext();

export class CartProvider extends Component {
  state = {
    cartItems: [],
    total: 0,
    isCartOpen: false,
  };

  // Add to cart or increase quantity
  addToCart = (item) => {
    const existingItemIndex = this.state.cartItems.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.selectedAttributes) ===
          JSON.stringify(item.selectedAttributes)
    );

    if (existingItemIndex !== -1) {
      // Item exists, increase quantity
      const newCartItems = [...this.state.cartItems];
      newCartItems[existingItemIndex].quantity += 1;
      this.setState({ cartItems: newCartItems }, this.calculateTotal);
    } else {
      // New item, set initial quantity and add to cart
      item.quantity = 1;
      this.setState(
        { cartItems: [...this.state.cartItems, item] },
        this.calculateTotal
      );
    }
  };

  // Remove from cart or decrease quantity
  removeFromCart = (id, selectedAttributes) => {
    const existingItemIndex = this.state.cartItems.findIndex(
      (item) =>
        item.id === id &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(selectedAttributes)
    );

    if (existingItemIndex !== -1) {
      const newCartItems = [...this.state.cartItems];
      const item = newCartItems[existingItemIndex];

      if (item.quantity > 1) {
        // Decrease quantity
        item.quantity -= 1;
        this.setState({ cartItems: newCartItems }, this.calculateTotal);
      } else {
        // Remove item entirely
        newCartItems.splice(existingItemIndex, 1);
        this.setState({ cartItems: newCartItems }, this.calculateTotal);
      }
    }
  };

  calculateTotal = () => {
    const total = this.state.cartItems.reduce(
      (acc, item) => acc + item.quantity * item.prices[0].amount,
      0
    );
    this.setState({ total });
  };

  toggleCart = () => {
    this.setState((prevState) => ({
      isCartOpen: !prevState.isCartOpen, // Toggle the cart visibility
    }));
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          toggleCart: this.toggleCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
