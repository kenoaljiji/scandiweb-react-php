import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/header/Header';
import ProductListingPage from './pages/ProductListingPage.js/ProductListingPage';
import NotFound from './pages/notFound/NotFound';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route path='/' element={<ProductListingPage category='all' />} />
            <Route
              path='/category/:categoryName'
              element={<ProductListingPage />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
