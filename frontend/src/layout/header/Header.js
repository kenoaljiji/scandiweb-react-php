import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CartIcon from "../../icons/CartIcon";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to="/category/clothes">Clothes</Link>
            </li>
            <li>
              <Link to="/category/tech">Tech</Link>
            </li>
          </ul>
        </nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Logo" />
        </div>
        <div className="cart-icon">
          <CartIcon />
        </div>
      </header>
    );
  }
}

export default Header;
