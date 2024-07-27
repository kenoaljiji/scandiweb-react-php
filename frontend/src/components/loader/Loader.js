import React, { Component } from 'react';
import classes from './Loader.module.scss';
import './Loader.module.scss'; // Assuming you will use an external CSS file for styles

class Loader extends Component {
  render() {
    return (
      <div className={classes['loader-container']}>
        <div className={classes.loader}></div>
      </div>
    );
  }
}

export default Loader;
