import React, { Component } from 'react';
import ProductCard from '../../components/productCard/ProductCard';
import { withProducts } from '../../context/ProductsContext';
import classes from './ProductListingPage.module.scss';
import withRouter from '../../hocs/withRouter';
import Loader from '../../components/loader/Loader';

class ProductListingPage extends Component {
  state = {
    products: [],
    loading: false,
  };

  componentDidMount() {
    this.loadProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params?.categoryName !== this.props.params?.categoryName) {
      this.loadProducts();
    }
  }

  loadProducts() {
    const category = this.props.params?.categoryName || 'all';
    this.setState({ loading: true }); // Start loading before fetching
    this.props.fetchProducts(category).then((response) => {
      this.setState({ products: response.data.products, loading: false }); // Stop loading after fetching
    });
  }

  render() {
    const { products, loading } = this.state;

    return (
      <div className={classes.products}>
        <h3>{this.props.params?.categoryName || 'All'}</h3>
        <div className={classes.grid}>
          {loading ? (
            <Loader />
          ) : (
            products?.map((product) => (
              <div key={product.id}>
                <ProductCard
                  key={product.id}
                  product={product}
                  navigate={this.props.navigate}
                />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(withProducts(ProductListingPage));
