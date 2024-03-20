import React from "react";
import Header from "./components/header/header";
import ProductList from "./components/productList/productList";
import Cart from "./components/cart/cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Contact from "./components/contact/contact";
import Laptop from "./components/laptop/laptop";
import Accessories from "./components/accessories/accessories";
import ErrorPage from "./components/error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mobile" element={<ProductList />} />
          <Route path="/laptop" element={<Laptop />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="category/mobile" element={<ProductList />} />
          <Route path="category/laptop" element={<Laptop />} />
          <Route path="category/accessories" element={<Accessories />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
