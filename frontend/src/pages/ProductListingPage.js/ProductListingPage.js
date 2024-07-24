import React, { Component } from 'react';
import Product from '../../components/product/Product';
import { withProducts } from '../../context/graphQlContext';
import classes from './ProductListingPage.module.scss';

class ProductListingPage extends Component {
  state = {
    category: 'all', // default category
    products: [],
  };

  componentDidMount() {
    this.props.fetchProducts(this.state.category).then((response) => {
      this.setState({ products: response.data.products });
    });
  }

  render() {
    const { products } = this.state;

    console.log(products);
    return (
      <div className={classes.products}>
        {products.length === 0 ? (
          <p>Loading......</p>
        ) : (
          products?.map((product) => (
            <div key={product.id}>
              <Product key={product.id} product={product} />
            </div>
          ))
        )}
      </div>
    );
  }
}

export default withProducts(ProductListingPage);
