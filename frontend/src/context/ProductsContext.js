import React, { createContext, Component } from 'react';
import { toCamelCase } from '../helpers/initializeAttribute';

import client from '../services/apollo-client';
import { GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_BY_ID } from './queries';

export const ProductsContext = createContext();

export class ProductsProvider extends Component {
  state = {
    product: {},
    selectedAttributes: {},
    loading: false,
  };

  fetchProducts = (category) => {
    return client.query({
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: { category },
    });
  };

  fetchProductById = (productId) => {
    this.setState({ loading: true });
    client
      .query({
        query: GET_PRODUCT_BY_ID,
        variables: { productId },
      })
      .then((response) => {
        const product = response.data.product;
        if (product) {
          this.setState({
            product: product,
            selectedAttributes: {},
            loading: false,
          });
        } else {
          this.setState({ product: null, loading: false });
        }
      })
      .catch((error) => {
        console.error('Error loading product details:', error);
        this.setState({ loading: false });
      });
  };

  handleAttributeSelect = (attributeName, optionId) => {
    const attrNameCamelCase = toCamelCase(attributeName);
    this.setState((prevState) => ({
      selectedAttributes: {
        ...prevState.selectedAttributes,
        [attrNameCamelCase]: optionId,
      },
    }));
  };

  render() {
    const { children } = this.props;
    const contextValue = {
      fetchProducts: this.fetchProducts,
      fetchProductById: this.fetchProductById,
      selectedAttributes: this.state.selectedAttributes,
      product: this.state.product,
      loading: this.state.loading,
      setSelectedAttributes: this.setSelectedAttributes,
      handleAttributeSelect: this.handleAttributeSelect,
      loadProductDetails: this.loadProductDetails,
    };

    return (
      <ProductsContext.Provider value={contextValue}>
        {children}
      </ProductsContext.Provider>
    );
  }
}

export const withProducts = (Component) => (props) =>
  (
    <ProductsContext.Consumer>
      {(context) => (
        <Component
          {...props}
          fetchProducts={context.fetchProducts}
          fetchProductById={context.fetchProductById}
          loadProductDetails={context.loadProductDetails}
          handleAttributeSelect={context.handleAttributeSelect}
          selectedAttributes={context.selectedAttributes}
          product={context.product}
          loading={context.loading}
        />
      )}
    </ProductsContext.Consumer>
  );
