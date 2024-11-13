import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const { cart, setCart, updateQuantity } = useCart();
    const [paymentOption, setPaymentOption] = useState('');
    const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', address: '' });
    const [showBill, setShowBill] = useState(false);
    const navigate = useNavigate();

    // Fetch cart items from the database when the component mounts
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:3001/chatify/cart');
                console.log(response.data.originalPrice )
                const formattedCart = response.data.map(item => (
                        console.log(item.originalPrice)
                ));
                setCart(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    }, [setCart]);

    const handlePaymentOptionChange = (e) => setPaymentOption(e.target.id);

    const handleCheckout = async () => {
        if (paymentOption && personalInfo.name && personalInfo.email && personalInfo.address) {
            try {
                await Promise.all(cart.map(item => axios.delete(`http://localhost:3001/chatify/cart/${item.id}`)));
                setCart([]);
                setShowBill(true);
                alert("Checkout successful! Your cart is now empty.");
                setTimeout(()=>{
                    navigate('/home');
                },5000)
            } catch (error) {
                console.error('Error during checkout:', error);
                alert('Checkout failed. Please try again.');
            }
        } else {
            alert('Please fill in all details and select a payment option');
        }
    };

    const handleBackToStore = () => navigate('/home');

    const handleChange = async (e, item) => {
        const value = Math.max(1, Math.min(5, parseInt(e.target.value) || 1));
        updateQuantity(item.id, value);
        try {
            await axios.patch(`http://localhost:3001/chatify/cart/${item.id}`, { quantity: value });
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const removeItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/chatify/cart/${id}`);
            setCart((prevCart) => prevCart.filter(item => item.id !== id));
            alert('Item removed from cart');
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const calculateTotalPrice = () => {
        return cart.reduce((acc, item) => {
            const itemPrice = item.originalPrice 
            return acc + (isNaN(itemPrice) ? 0 : itemPrice);
        }, 0);
    };

    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>
            <button className="back-button" onClick={handleBackToStore}>Back to Store</button>
            <ul className="cart-list">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map(item => (
                        <li key={item.id} className="cart-item">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">
                                 {item.originalPrice}
                            </span>
                            <button onClick={() => removeItem(item.id)} className="remove-button">Remove</button>
                        </li>
                    ))
                )}
            </ul>
            

            <section className="personal-info">
                <h2>Personal Information</h2>
                <label>
                    Name:
                    <input type="text" name="name" value={personalInfo.name} onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} required />
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={personalInfo.address} onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })} required />
                </label>
            </section>

            <section className="payment-options">
                <h2>Payment Options</h2>
                <label>
                    <input type="radio" id="paypal" name="payment" onChange={handlePaymentOptionChange} /> PayPal
                </label>
                <label>
                    <input type="radio" id="credit-card" name="payment" onChange={handlePaymentOptionChange} /> Credit Card
                </label>
                <label>
                    <input type="radio" id="bank-transfer" name="payment" onChange={handlePaymentOptionChange} /> Bank Transfer
                </label>
                <button onClick={handleCheckout} className="checkout-button">Checkout</button>
            </section>
            
            {showBill && (
                <div className="bill">
                    <h2>Bill</h2>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                {item.name} - {item.quantity} x Rs. {item.price.toFixed(2)} = Rs. {(item.price * item.quantity).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p>Total Amount: Rs. {calculateTotalPrice().toFixed(2)}</p>
                    <p>Payment Option: {paymentOption}</p>
                    <h3>Billing Details</h3>
                    <p>Name: {personalInfo.name}</p>
                    <p>Email: {personalInfo.email}</p>
                    <p>Address: {personalInfo.address}</p>
                </div>
            )}

            <style>
                {`
                    .cart-container { max-width: 800px; margin: 20px auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: Arial, sans-serif; }
                    h1 { text-align: center; color: #4CAF50; }
                    .back-button { margin-bottom: 15px; padding: 8px 16px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
                    .cart-list { list-style-type: none; padding: 0; margin-top: 20px; }
                    .cart-item { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #ddd; align-items: center; }
                    .item-name { font-weight: bold; color: #333; }
                    .item-price { color: #333; }
                    .quantity-input { width: 50px; margin-left: 10px; }
                    .remove-button { background-color: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
                    .total { font-weight: bold; font-size: 1.2em; margin-top: 20px; }
                    .personal-info, .payment-options { margin-top: 20px; }
                    .personal-info input, .payment-options input { display: block; margin: 10px 0; width: 100%; padding: 8px; }
                    .checkout-button { background-color: #28a745; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
                    .bill { margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 4px; }
                `}
            </style>
        </div>
    );
};

export default Cart;
