import React, { Component } from 'react';
import classes from './Product.module.scss';

class ProductCard extends Component {
  navigateToProduct = () => {
    const { product, navigate } = this.props;
    if (!product.inStock) return; // Do nothing if the product is not in stock

    const category = encodeURIComponent(
      product.category.toLowerCase().replace(/ /g, '-')
    );

    // Navigate to the product detail page
    navigate(`/product/${category}/${product.id}`);
  };

  render() {
    const { product } = this.props;

    return (
      <div
        className={`${classes.product} ${
          !product.inStock ? classes['out-of-stock'] : ''
        }`}
        onClick={this.navigateToProduct}
        data-testid={`product-${product.name.toLowerCase().replace(/ /g, '-')}`}
      >
        <img
          src={product.gallery[0].url}
          alt={product.name}
          className={classes.image}
          style={{ opacity: product.inStock ? 1 : 0.5 }}
        />
        <div className={classes['product-info']}>
          <h4>{product.name}</h4>
          <p className={classes.price}>{`$${product.prices[0].amount.toFixed(
            2
          )}`}</p>
          {!product.inStock && <span>Out of stock</span>}
        </div>
      </div>
    );
  }
}

export default ProductCard;
