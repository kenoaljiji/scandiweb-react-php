import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: 'all',
      underlineStyle: {
        '--underline-width': '70px', // Set the default underline width
        '--underline-offset': '0px', // Set the default underline offset
      },
    };
  }

  activateLink = (category, event) => {
    const linkWidth = `${event.currentTarget.offsetWidth}px`; // Calculate width
    const linkPositionX = `${event.currentTarget.offsetLeft}px`; // Calculate left offset

    this.setState({
      activeCategory: category,
      underlineStyle: {
        '--underline-width': linkWidth,
        '--underline-offset': linkPositionX,
      },
    });
  };

  renderLink = (to, category) => {
    const { activeCategory } = this.state;
    const isActive = activeCategory === category.toLowerCase();

    return (
      <li className={`${isActive ? classes.active : ''}`}>
        <NavLink
          to={to}
          onClick={(e) => this.activateLink(category.toLowerCase(), e)}
          className={classes.link}
          data-testid={isActive ? 'active-category-link' : 'category-link'}
        >
          {category}
        </NavLink>
      </li>
    );
  };

  render() {
    const { underlineStyle } = this.state;

    return (
      <nav className={classes.navbar} style={underlineStyle}>
        <ul className={classes['nav-links']}>
          {this.renderLink('/', 'All')}
          {/* {this.renderLink('/all', 'All')} */}
          {this.renderLink('/clothes', 'Clothes')}
          {this.renderLink('/tech', 'Tech')}
        </ul>
        <div className={classes.underline}></div>
      </nav>
    );
  }
}

export default NavBar;
