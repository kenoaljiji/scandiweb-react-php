import React, { Component } from 'react';

import NavBar from '../../components/navBar/NavBar';
import CartIcon from '../../icons/CartIcon';
import classes from './Header.module.scss';

class Header extends Component {
  render() {
    return (
      <header className={`${classes.header} container`}>
        <NavBar />
        <div className={classes.logo}>
          <img src='assets/images/logo.png' alt='Logo' />
        </div>
        <div className={classes.cartIcon}>
          <CartIcon />
        </div>
      </header>
    );
  }
}

export default Header;
