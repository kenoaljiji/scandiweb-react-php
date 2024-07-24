import React, { createContext, Component } from 'react';
import { ApolloProvider, gql, useQuery } from '@apollo/client';
import client from '../services/apollo-client';

export const ProductsContext = createContext();

export class ProductsProvider extends Component {
  fetchProducts = (category) => {
    return client.query({
      query: gql`
        query GetProducts($category: String!) {
          products(category: $category) {
            id
            name
            inStock
            description
            category
            brand
            gallery {
              id
              url
            }
            attributes {
              id
              name
              type
              items {
                id
                displayValue
                value
              }
            }
            prices {
              amount
              currency {
                label
                symbol
              }
            }
          }
        }
      `,
      variables: { category },
    });
  };

  render() {
    return (
      <ProductsContext.Provider value={this.fetchProducts}>
        {this.props.children}
      </ProductsContext.Provider>
    );
  }
}

export const withProducts = (Component) => (props) =>
  (
    <ProductsContext.Consumer>
      {(fetchProducts) => (
        <Component {...props} fetchProducts={fetchProducts} />
      )}
    </ProductsContext.Consumer>
  );
