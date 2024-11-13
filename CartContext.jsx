//CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};





// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);

//     useEffect(() => {
//         const fetchCart = async () => {
//             try {
//                 // Ensure the endpoint matches your json-server configuration
//                 const response = await axios.get('http://localhost:5001/cart');
//                 setCart(response.data); // The data returned is an array
//                 calculateTotal(response.data);
//             } catch (error) {
//                 // Improved error handling
//                 if (error.response) {
//                     console.error('Error fetching cart:', error.response.data);
//                 } else if (error.request) {
//                     console.error('No response received:', error.request);
//                 } else {
//                     console.error('Error setting up the request:', error.message);
//                 }
//             }
//         };

//         fetchCart();
//     }, []);


//     const calculateTotal = (cartItems) => {
//         const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
//         setTotalPrice(total);
//     };

//     const addToCart = async (product) => {
//         const existingItem = cart.find(item => item.id === product.id);
//         try {
//             if (existingItem) {
//                 const updatedCart = cart.map(item =>
//                     item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//                 );
//                 setCart(updatedCart);
//                 calculateTotal(updatedCart);
//                 await axios.put(`http://localhost:5001/cart/${product.id}`, {
//                     ...existingItem,
//                     quantity: existingItem.quantity + 1,
//                 });
//             } else {
//                 const newItem = { ...product, quantity: 1 };
//                 const updatedCart = [...cart, newItem];
//                 setCart(updatedCart);
//                 calculateTotal(updatedCart);
//                 await axios.post('http://localhost:5001/cart', newItem);
//             }
//         } catch (error) {
//             console.error('Error adding item to cart:', error);
//         }
//     };

//     const removeFromCart = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5001/cart/${id}`);
//             const updatedCart = cart.filter(item => item.id !== id);
//             setCart(updatedCart);
//             calculateTotal(updatedCart);
//         } catch (error) {
//             console.error('Error removing item from cart:', error);
//         }
//     };

//     const updateQuantity = async (id, quantity) => {
//         const updatedCart = cart.map(item =>
//             item.id === id ? { ...item, quantity } : item
//         );
//         setCart(updatedCart);
//         calculateTotal(updatedCart);
//         try {
//             await axios.put(`http://localhost:5001/cart/${id}`, { ...cart.find(item => item.id === id), quantity });
//         } catch (error) {
//             console.error('Error updating item quantity:', error);
//         }
//     };

//     const clearCart = async () => {
//         try {
//             const deleteRequests = cart.map(item => axios.delete(`http://localhost:5001/cart/${item.id}`));
//             await Promise.all(deleteRequests);
//             setCart([]); // Clear cart state only after deletion is successful
//             setTotalPrice(0);
//         } catch (error) {
//             console.error('Error clearing cart:', error);
//         }
//     };

//     return (
//         <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);




// import React, { useState } from 'react';
// import { useCart } from './CartContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Home = () => {
//     const { addToCart } = useCart();
//     const navigate = useNavigate();
//     const [cartItems, setCartItems] = useState(new Set()); // State to track added items
//     const [message, setMessage] = useState(''); // State to track messages

//     const products = [
//         {
//             id: 1,
//             name: "Officially Licensed One Piece Luffy Straw Hat by ABYSTYLE",
//             imageUrl: "https://imgs.search.brave.com/ZKU7OcTtFvtbLOnp0dpblrtaTYlTN6XF8S8gBkGKPk8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2Jwb3N0ZXJzLmNv/bS9tZWRpYS9jYXRh/bG9nL3Byb2R1Y3Qv/Y2FjaGUvMS9pbWFn/ZS83Mzd4OTM4Lzlk/Zjc4ZWFiMzM1MjVk/MDhkNmU1ZmI4ZDI3/MTM2ZTk1LzAvSS8w/SU5ENUNWSjNJVV8x/MS5qcGc",
//             originalPrice: "Rs. 499",
//             discountPrice: "Rs. 299",
//         },
//         {
//             id: 2,
//             name: "Goku Statue (Luminous Base) | Goku - Spirit Bomb Ready",
//             imageUrl: "https://imgs.search.brave.com/4wC8RJNlOyZonCsgGNbNFyQDepEWw5jKH1W_kHyvoh4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxV2ZaWVE0WDhM/LmpwZw",
//             price: "Rs. 1,999",
//         },
//         {
//             id: 3,
//             name: "Attack on Titan Pins | Cool Anime Lapel Pin",
//             imageUrl: "https://imgs.search.brave.com/na5u_p0FrD_SVAReeh82RSu0ZbHyUCA2OW3NhgBt4J8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxcGM4d1diNHFM/LmpwZw",
//             originalPrice: "Rs. 299",
//             discountPrice: "Rs. 199",
//         },
//         {
//             id: 4,
//             name: "Collect Them All: Spy X Family Enamel Pins",
//             imageUrl: "https://geekmonkey.in/cdn/shop/files/21_dff31e25-2d96-45e4-8776-2f1277a06ed2.jpg?crop=center&height=400&v=1721609009&width=400",
//             originalPrice: "Rs. 299",
//             discountPrice: "Rs. 199",
//         },
//         {
//             id: 5,
//             name: "Attack on Titan Figure | Levi Figure (Anime Edition) set of 5",
//             imageUrl: "https://geekmonkey.in/cdn/shop/files/26_b824782f-d2a5-422e-baa0-6f8ce4214532.jpg?crop=center&height=400&v=1712623509&width=400",
//             originalPrice: "Rs. 1299",
//             discountPrice: "Rs. 1199",
//         },
//         {
//             id: 6,
//             name: "Black Clover Yami Sukehiro Sword",
//             imageUrl: "https://imgs.search.brave.com/75ya6z3kEYKJf9iUJAPvH9wAsgMlm412mH5GAOZNeB8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZXpjb3NwbGF5LmNv/bS9tZWRpYS9jYXRh/bG9nL3Byb2R1Y3Qv/Yi9sL2JsYWNrX2Ns/b3Zlcl95YW1pX3N1/a2VoaXJvX3N3b3Jk/X2FuZF9zY2FiYmFy/ZF9jb3NwbGF5X3dl/YXBvbl9wcm9wXzEu/anBn",
//             price: "Rs. 999",
//         }
//     ];

//     const handleLogout = () => {
//         navigate('/login');
//     };

//     const handleCart = () => {
//         navigate('/cart');
//     };

//     const formatPrice = (priceString) => {
//         return parseInt(priceString.replace(/[^0-9]/g, ""), 10);
//     };

//     const handleAddToCart = async (product) => {
//         const price = product.discountPrice ? formatPrice(product.discountPrice) : formatPrice(product.price);
//         const updatedProduct = { ...product, price };

//         // Check if the product is already in the cart
//         if (cartItems.has(product.id)) {
//             setMessage("Already added to cart!");
//             setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
//             return;
//         }

//         try {
//             // Check if the product is in db.json
//             const response = await axios.get(`http://localhost:5001/cart/${product.id}`);
//             if (response.status === 200) {
//                 setMessage("Product already in cart!");
//                 setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
//                 return;
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 404) {
//                 // Add product if not found
//                 try {
//                     await axios.post('http://localhost:5001/cart', updatedProduct);

//                     setCartItems((prev) => new Set([...prev, product.id])); // Add product ID to cartItems
//                     addToCart(updatedProduct); // Add to context
//                     setMessage("Product added to cart!");
//                     setTimeout(() => setMessage(''), 2000); // Clear message
//                 } catch (error) {
//                     console.error('Error adding to cart:', error);
//                     setMessage("Failed to add product to cart.");
//                     setTimeout(() => setMessage(''), 2000); // Clear message
//                 }
//             }
//         }
//     };

//     return (
//         <div className="store-container">
//             <header>
//                 <h1>Product Store</h1>
//                 <nav>
//                     <ul>
//                         <li>
//                             <button onClick={handleCart}>Cart</button>
//                         </li>
//                         <li>
//                             <button onClick={handleLogout}>Logout</button>
//                         </li>
//                     </ul>
//                 </nav>
//             </header>

//             {message && <div className="message">{message}</div>} {/* Display message */}

//             <div className="product-grid">
//                 {products.map((product) => (
//                     <div key={product.id} className="product-card">
//                         <img src={product.imageUrl} alt={product.name} />
//                         <div className="product-name">{product.name}</div>
//                         <div>
//                             <span>{product.discountPrice || product.originalPrice}</span>
//                         </div>
//                         <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
//                     </div>
//                 ))}
//             </div>

//             <style jsx>{`
//                 .store-container {
//                     padding: 20px;
//                     font-family: Arial, sans-serif;
//                     background-color: #f8f8f8;
//                 }

//                 header {
//                     text-align: center;
//                     margin-bottom: 20px;
//                 }

//                 header h1 {
//                     font-size: 2.5em;
//                     color: #333;
//                 }

//                 .message {
//                     color: green; 
//                     text-align: center;
//                     margin-bottom: 20px;
//                 }

//                 .product-grid {
//                     display: grid;
//                     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//                     gap: 20px;
//                 }

//                 .product-card {
//                     background-color: white;
//                     padding: 15px;
//                     border-radius: 10px;
//                     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//                     text-align: center;
//                 }

//                 .product-card img {
//                     max-width: 100%;
//                     height: auto;
//                     border-radius: 8px;
//                     margin-bottom: 15px;
//                 }
//                                     .product-name {
//                     font-size: 1.1em;
//                     color: #333;
//                     margin-bottom: 10px;
//                     font-weight: bold;
//                 }

//                 nav ul {
//                     list-style-type: none;
//                     padding: 0;
//                 }

//                 nav ul li {
//                     display: inline;
//                     margin-right: 10px;
//                 }

//                 button {
//                     padding: 10px 15px;
//                     background-color: #007BFF;
//                     color: white;
//                     border: none;
//                     border-radius: 5px;
//                     cursor: pointer;
//                 }

//                 button:hover {
//                     background-color: #0056b3;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Home;


