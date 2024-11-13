// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Cart from './Cart';
import ProtectedRoute from './ProtectedRoute';
import { CartProvider } from './CartContext';
import './App.css';

const App = () => {
    return (
        <CartProvider>
            <Routes>
                <Route path="/" element={<ProtectedRoute element={<Login />} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </CartProvider>
    );
};

export default App;
