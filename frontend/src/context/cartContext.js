import React, { createContext, Component } from 'react';
import client from '../services/apollo-client';
import { PLACE_ORDER_MUTATION } from './queries';

export const CartContext = createContext();

export class CartProvider extends Component {
  state = {
    cartItems: [],
    totalItems: 0,
    total: 0,
    isCartOpen: false,
    loading: false,
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
      this.setState({ cartItems: newCartItems }, () => {
        this.calculateTotal();
        this.calculateTotalItems();
      });
    } else {
      // New item, set initial quantity and add to cart
      item.quantity = 1;
      this.setState({ cartItems: [...this.state.cartItems, item] }, () => {
        this.calculateTotal();
        this.calculateTotalItems();
      });
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
        this.setState({ cartItems: newCartItems }, () => {
          this.calculateTotal();
          this.calculateTotalItems();
        });
      } else {
        // Remove item entirely
        newCartItems.splice(existingItemIndex, 1);
        this.setState({ cartItems: newCartItems }, () => {
          this.calculateTotal();
          this.calculateTotalItems();
        });
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

  calculateTotalItems = () => {
    const totalItems = this.state.cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    this.setState({ totalItems });
  };

  debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  toggleCart = this.debounce(() => {
    this.setState((prevState) => ({
      isCartOpen: !prevState.isCartOpen, // Toggle the cart visibility
    }));
  }, 50); // Adjust the debounce time as necessary

  // Show the cart overlay
  showCart = () => {
    this.setState({ isCartOpen: true });
  };

  // Function to place an order
  placeOrder = async () => {
    const orderItems = this.state.cartItems.map((item) => ({
      productId: item.id,
      productName: item.name,
      quantity: item.quantity,
      price: item.prices[0].amount,
      selectedAttributes: JSON.stringify(item.selectedAttributes),
    }));

    try {
      this.setState({ loading: true });

      const { data } = await client.mutate({
        mutation: PLACE_ORDER_MUTATION,
        variables: { items: orderItems },
      });

      if (data.insertOrder.success) {
        this.setState({ cartItems: [], total: 0, totalItems: 0 }); // Clear the cart
        console.log(
          'Order placed successfully with ID:',
          data.insertOrder.orderId
        );
      } else {
        console.error('Order placement failed:', data.insertOrder.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          toggleCart: this.toggleCart,
          placeOrder: this.placeOrder,
          showCart: this.showCart,
          hideCart: this.hideCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
