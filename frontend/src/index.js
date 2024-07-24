import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProductsProvider } from './context/graphQlContext';
import client from './services/apollo-client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </ApolloProvider>
);
