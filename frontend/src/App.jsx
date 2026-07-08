import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CheckOutHero from "./Components/CheckOutComponent/CheckOutHero";
import CheckOut from "./pages/CheckOut";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
