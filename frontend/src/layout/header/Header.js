import React, { Component } from 'react';
import { CartContext } from '../../context/CartContext';
import NavBar from '../../components/navBar/NavBar';
import CartIcon from '../../icons/CartIcon';
import classes from './Header.module.scss';

class Header extends Component {
  static contextType = CartContext; // Correctly set the contextType

  render() {
    const { toggleCart } = this.context; // Use this.context to access toggleCart

    return (
      <header className={`${classes.header}`}>
        <div className='container d-flex-between-center'>
          <NavBar />
          <div className={classes.logo}>
            <img src='assets/images/logo.png' alt='Logo' />
          </div>
          <div className={classes.cartIcon} onClick={toggleCart}>
            <CartIcon />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
