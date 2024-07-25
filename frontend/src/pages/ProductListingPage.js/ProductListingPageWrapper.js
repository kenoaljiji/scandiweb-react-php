// Assuming RouterContext.js is correctly set up and exported useRouter
import React from 'react';
import { useRouter } from '../../context/routerContext';
import ProductListingPage from './ProductListingPage';

function ProductListingPageWrapper() {
  const { params, navigate } = useRouter(); // Getting navigate and params from useRouter

  return <ProductListingPage navigate={navigate} params={params} />;
}

export default ProductListingPageWrapper;
