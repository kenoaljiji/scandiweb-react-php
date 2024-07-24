import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/header/Header";
import Category from "./components/category/Category";
import NotFound from "./pages/notFound/NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Category category="all" />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
