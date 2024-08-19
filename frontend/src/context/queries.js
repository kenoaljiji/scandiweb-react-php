import { gql } from '@apollo/client';

export const GET_PRODUCTS_BY_CATEGORY = gql`
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
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productId: ID!) {
    product(id: $productId) {
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
`;

export const PLACE_ORDER_MUTATION = gql`
  mutation PlaceOrder($items: [OrderItemInput!]!) {
    insertOrder(items: $items) {
      success
      orderId
      message
    }
  }
`;
