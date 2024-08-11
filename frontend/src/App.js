import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/header/Header';
import ProductListingPage from './pages/ProductListingPage/ProductListingPage';
import ProductDetailsPage from './pages/productDetailsPage/ProductDetailsPage';
import NotFound from './pages/notFound/NotFound';
import './App.scss';

import CartOverlay from './components/cartOverlay/CartOverlay';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <CartOverlay />
        <div className='container'>
          <Routes>
            <Route path='/' element={<ProductListingPage />} />
            <Route path='/:categoryName' element={<ProductListingPage />} />
            <Route
              path='/product/:category/:productId'
              element={<ProductDetailsPage />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
