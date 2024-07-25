import React, { Component } from 'react';
import classes from './Product.module.scss';

class ProductCard extends Component {
  render() {
    const { product } = this.props;

    return (
      <div
        className={`${classes.product} ${
          !product.inStock ? 'out-of-stock' : ''
        }`}
        onClick={() => product.inStock}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        data-testid={`product-${product.name.toLowerCase().replace(/ /g, '-')}`}
      >
        <img
          src={product.gallery[0].url}
          alt={product.name}
          className={classes.image}
          style={{ opacity: product.inStock ? 1 : 0.5 }}
        />
        <div className='product-info'>
          <h3>{product.name}</h3>
          <p>{`$${product.prices[0].amount.toFixed(2)}`}</p>
        </div>
      </div>
    );
  }
}

export default ProductCard;
