import React, { Component } from 'react';
import ProductCard from '../../components/product/ProductCard';
import { withProducts } from '../../context/graphQlContext';
import classes from './ProductListingPage.module.scss';

class ProductListingPage extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    // Use category from router params if available, or default to 'all'
    const category = this.props.params?.category || 'all';
    this.props.fetchProducts(category).then((response) => {
      this.setState({ products: response.data.products });
    });
  }

  componentDidUpdate(prevProps) {
    // Check if the category has changed
    if (prevProps.params?.category !== this.props.params?.category) {
      const category = this.props.params?.categoryName || 'all';
      this.props.fetchProducts(category).then((response) => {
        this.setState({ products: response.data.products });
      });
    }
  }
  render() {
    const { products } = this.state;
    console.log(this.props);

    return (
      <div>
        <h3></h3>
        <div className={classes.products}>
          {products && products.length === 0 ? (
            <p>Loading......</p>
          ) : (
            products?.map((product) => (
              <div key={product.id}>
                <ProductCard key={product.id} product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default withProducts(ProductListingPage);
