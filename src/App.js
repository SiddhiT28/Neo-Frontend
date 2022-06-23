import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { useAuth } from './Data/AuthContext';
import Cart from './pages/Cart/Cart';
import Category from './pages/Category/Category';
import Checkout from './pages/Checkout/Checkout';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PageNotFound from './pages/NotFound/PageNotFound';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Register from './pages/Register/Register';
import { RetailerDashboard } from './pages/Retailer/RetailerDashboard/RetailerDashboard';
import SearchPage from './pages/SearchPage/SearchPage';
import ChangePassword from './pages/User/ChangePassword/ChangePassword';
import Profile from './pages/User/Profile/Profile';
import { Login as RetailerLogin } from "./pages/Retailer/Login/Login";
import { Wishlist } from './pages/Wishlist/Wishlist';
import { OrderCallback } from './pages/OrderPayment/OrderCallback';

function App() {


  return (
    <div className="App">

      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/category/:cat" element={<Category />} />
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/user/changePassword' element={<ChangePassword />} />
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path='orderCallback' element={<OrderCallback />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
