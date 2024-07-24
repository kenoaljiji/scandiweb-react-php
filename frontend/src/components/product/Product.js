import React, { Component } from 'react';
import classes from './Product.Module.scss';

class Product extends Component {
  render() {
    const { product } = this.props; // Destructure product from props
    return (
      <div
        key={product.id}
        data-testid={`product-${product.name.toLowerCase().replace(/ /g, '-')}`}
      >
        <img
          src={product.gallery[0].url}
          alt={product.name}
          style={{ opacity: product.inStock ? 1 : 0.5 }}
        />
        <h3>{product.name}</h3>
        {product.inStock ? (
          <button>Add to Cart</button>
        ) : (
          <span>Out of Stock</span>
        )}
      </div>
    );
  }
}

export default Product;
