import React, { createContext, Component } from 'react';
import { ApolloProvider, gql, useQuery } from '@apollo/client';
import client from '../services/apollo-client';
import { GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_BY_ID } from './queries';

export const ProductsContext = createContext();

export class ProductsProvider extends Component {
  fetchProducts = (category) => {
    return client.query({
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: { category },
    });
  };

  fetchProductById = (productId) => {
    return client.query({
      query: GET_PRODUCT_BY_ID,
      variables: { productId },
    });
  };

  render() {
    const { children } = this.props;
    const contextValue = {
      fetchProducts: this.fetchProducts,
      fetchProductById: this.fetchProductById,
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
        />
      )}
    </ProductsContext.Consumer>
  );
