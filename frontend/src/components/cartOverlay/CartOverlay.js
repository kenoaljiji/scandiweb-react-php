import React, { Component } from "react";
import { CartContext } from "../../context/CartContext";
import Cart from "../cart/Cart";
import classes from "./CartOverlay.module.scss";

class CartOverlay extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);
    this.state = {
      isScrolled: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const isScrolled = window.scrollY > 80; // Check if scrolled more than 80px
    if (isScrolled !== this.state.isScrolled) {
      this.setState({ isScrolled });
    }
  };

  closeCart = (e) => {
    e.stopPropagation(); // Prevent click inside the cart from closing it
    this.context.toggleCart(); // Use context method to close the cart
  };

  render() {
    const { isCartOpen } = this.context;
    if (!isCartOpen) return null;

    const { isScrolled } = this.state;
    const cartStyle = {
      position: isScrolled ? "fixed" : "absolute",
    };

    return (
      <div
        className={classes.overlay}
        onClick={this.closeCart}
        data-testid="cart-overlay"
      >
        <div
          className={classes["cart-container"]}
          onClick={(e) => e.stopPropagation()}
          style={cartStyle}
        >
          <Cart />
        </div>
      </div>
    );
  }
}

export default CartOverlay;
