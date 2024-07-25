import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/header/Header';
import ProductListingPage from './pages/ProductListingPage.js/ProductListingPage';
import NotFound from './pages/notFound/NotFound';
import './App.scss';
import { RouterProvider, useRouter } from './context/routerContext';
import ProductListingPageWrapper from './pages/ProductListingPage.js/ProductListingPageWrapper';

class App extends Component {
  render() {
    return (
      <Router>
        <RouterProvider>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/' element={<ProductListingPageWrapper />} />
              <Route
                path='/category/:categoryName'
                element={<ProductListingPageWrapper />}
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </RouterProvider>
      </Router>
    );
  }
}

export default App;
