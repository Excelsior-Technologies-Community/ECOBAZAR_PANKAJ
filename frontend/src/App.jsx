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
import Wishlist from "./pages/WishList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrder";
import OrderDetail from "./pages/OrderDetail";
import AdminRoute from "./Admin/Routes/AdminRoute";
import UserLayout from "./Layout/UserLayout";
import AdminLayout from "./Admin/Components/AdminLayout";
import Dashboard from "./Admin/Pages/Dashboard.jsx";
import Products from "./Admin/Pages/Products.jsx";
import AddProduct from "./Admin/Pages/AddProduct.jsx";
import EditProject from "./Admin/Pages/EditProject.jsx";
import Orders from "./Admin/Pages/Orders.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-orders/:id" element={<OrderDetail />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProject />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
