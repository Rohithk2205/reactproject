import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(new Set()); // State to track added items
    const [message, setMessage] = useState(''); // State to track messages

    const products = [
        {
            id: 1,
            name: "Officially Licensed One Piece Luffy Straw Hat by ABYSTYLE",
            imageUrl: "https://imgs.search.brave.com/ZKU7OcTtFvtbLOnp0dpblrtaTYlTN6XF8S8gBkGKPk8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2Jwb3N0ZXJzLmNv/bS9tZWRpYS9jYXRh/bG9nL3Byb2R1Y3Qv/Y2FjaGUvMS9pbWFn/ZS83Mzd4OTM4Lzlk/Zjc4ZWFiMzM1MjVk/MDhkNmU1ZmI4ZDI3/MTM2ZTk1LzAvSS8w/SU5ENUNWSjNJVV8x/MS5qcGc",
            originalPrice: 499,
            discountPrice: 299,
        },
        {
            id: 2,
            name: "Goku Statue (Luminous Base) | Goku - Spirit Bomb Ready",
            imageUrl: "https://imgs.search.brave.com/4wC8RJNlOyZonCsgGNbNFyQDepEWw5jKH1W_kHyvoh4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxV2ZaWVE0WDhM/LmpwZw",
            originalPrice: 1999,
            discountPrice: 999,
        },
        {
            id: 3,
            name: "Attack on Titan Pins | Cool Anime Lapel Pin",
            imageUrl: "https://imgs.search.brave.com/na5u_p0FrD_SVAReeh82RSu0ZbHyUCA2OW3NhgBt4J8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxcGM4d1diNHFM/LmpwZw",
            originalPrice: 299,
            discountPrice: 199,
        },
        {
            id: 4,
            name: "Roronoa Zoro Anime Wig | Anime Wali Holi",
            imageUrl: "https://geekmonkey.in/cdn/shop/files/81_054c710d-7b3e-45d7-8d88-00cc6f07eecb.jpg?crop=center&height=400&v=1711500257&width=400",
            originalPrice: 1799,
            discountPrice: 1549,
        },
        {
            id: 5,
            name: "Amazing Gojo Acrylic Anime Standee | Jujutsu Kaisen | Gifts for Anime Fans",
            imageUrl: "https://geekmonkey.in/cdn/shop/products/31_63035de5-52ac-41d6-a5d6-6c0243457c76.jpg?crop=center&height=400&v=1688410140&width=400",
            originalPrice: 499,
            discountPrice: 399,
        },
        {
            id: 6,
            name: "Anime Love Luggage Tag | Baggage Identifier Tag for Otaku",
            imageUrl: "https://geekmonkey.in/cdn/shop/files/39_68858786-90b9-40bc-9248-2779c8035370.jpg?crop=center&height=400&v=1713746702&width=400",
            originalPrice: 699,
            discountPrice: 599,
        },
        {
            id: 7,
            name: "Latest Bounty Fridge Magnet | One Piece Anime Collectible Magnets",
            imageUrl: "https://geekmonkey.in/cdn/shop/files/46_a368ea35-f620-40c8-83d9-d0502390a463.jpg?v=1726073452&width=400",
            originalPrice: 1599,
            discountPrice: 1099,
        },
        {
            id: 8,
            name: "Demon Slayer Figurine | Cool Anime Collectibles in India",
            imageUrl: "https://geekmonkey.in/cdn/shop/files/28_fc2f2061-1573-433e-96c7-ca80def86ddc.jpg?crop=center&height=400&v=1725237641&width=400",
            originalPrice: 699,
            discountPrice: 499,
        },
        {
            id: 9,
            name: "My Hero Academia All Might Action Figure",
            imageUrl: "https://example.com/all_might_action_figure.jpg",
            originalPrice: 1199,
            discountPrice: 799,
        },
        {
            id: 10,
            name: "Jujutsu Kaisen Gojo Satoru Blindfold Keychain",
            imageUrl: "https://example.com/gojo_keychain.jpg",
            originalPrice: 199,
            discountPrice: 99,
        },
        {
            id: 1,
            name: "Officially Licensed One Piece Luffy Straw Hat by ABYSTYLE",
            imageUrl: "https://imgs.search.brave.com/ZKU7OcTtFvtbLOnp0dpblrtaTYlTN6XF8S8gBkGKPk8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2Jwb3N0ZXJzLmNv/bS9tZWRpYS9jYXRh/bG9nL3Byb2R1Y3Qv/Y2FjaGUvMS9pbWFn/ZS83Mzd4OTM4Lzlk/Zjc4ZWFiMzM1MjVk/MDhkNmU1ZmI4ZDI3/MTM2ZTk1LzAvSS8w/SU5ENUNWSjNJVV8x/MS5qcGc",
            originalPrice: 499,
            discountPrice: 299,
        },
        {
            id: 2,
            name: "Goku Statue (Luminous Base) | Goku - Spirit Bomb Ready",
            imageUrl: "https://imgs.search.brave.com/4wC8RJNlOyZonCsgGNbNFyQDepEWw5jKH1W_kHyvoh4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxV2ZaWVE0WDhM/LmpwZw",
            originalPrice: 1999,
            discountPrice: 999,
        },
        {
            id: 3,
            name: "Attack on Titan Pins | Cool Anime Lapel Pin",
            imageUrl: "https://imgs.search.brave.com/na5u_p0FrD_SVAReeh82RSu0ZbHyUCA2OW3NhgBt4J8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxcGM4d1diNHFM/LmpwZw",
            originalPrice: 299,
            discountPrice: 199,
        },
        {
            id: 4,
            name: "Collect Them All: Spy X Family Enamel Pins",
            imageUrl: "https://geekmonkey.in/cdn/shop/files/21_dff31e25-2d96",
            originalPrice: 399,
            discountPrice: 249,
        },
        {
            id: 5,
            name: "Black Clover Yami Sukehiro Sword",
            imageUrl: "https://m.media-amazon.com/images/I/61ni-P3NfjL._SL1500_.jpg",
            originalPrice: 1499,
            discountPrice: 899,
        },
        {
            id: 6,
            name: "Naruto Shippuden Kunai Set (Cosplay Prop)",
            imageUrl: "https://example.com/naruto_kunai_set.jpg",
            originalPrice: 799,
            discountPrice: 499,
        },
        {
            id: 7,
            name: "Demon Slayer Nezuko Kamado Figure",
            imageUrl: "https://example.com/nezuko_figure.jpg",
            originalPrice: 1599,
            discountPrice: 1099,
        },
        {
            id: 8,
            name: "Dragon Ball Z Scouter (Cosplay Accessory)",
            imageUrl: "https://example.com/dbz_scouter.jpg",
            originalPrice: 399,
            discountPrice: 199,
        },
        {
            id: 9,
            name: "My Hero Academia All Might Action Figure",
            imageUrl: "https://example.com/all_might_action_figure.jpg",
            originalPrice: 1199,
            discountPrice: 799,
        },
        {
            id: 10,
            name: "Jujutsu Kaisen Gojo Satoru Blindfold Keychain",
            imageUrl: "https://example.com/gojo_keychain.jpg",
            originalPrice: 199,
            discountPrice: 99,
        },
        {
            id: 10,
            name: "Jujutsu Kaisen Gojo Satoru Blindfold Keychain",
            imageUrl: "https://example.com/gojo_keychain.jpg",
            originalPrice: 199,
            discountPrice: 99,
        },
        {
            id: 10,
            name: "Jujutsu Kaisen Gojo Satoru Blindfold Keychain",
            imageUrl: "https://example.com/gojo_keychain.jpg",
            originalPrice: 199,
            discountPrice: 99,
        }, 
        {
            id: 10,
            name: "Jujutsu Kaisen Gojo Satoru Blindfold Keychain",
            imageUrl: "https://example.com/gojo_keychain.jpg",
            originalPrice: 199,
            discountPrice: 99,
        },
        {
            id: 10,
            name: "Jujutsu Kaisen Gojo Satoru Blindfold Keychain",
            imageUrl: "https://example.com/gojo_keychain.jpg",
            originalPrice: 199,
            discountPrice: 99,
        }
    ];

   
    const handleLogout = () => {
        navigate('/login');
    };

    const handleCart = () => {
        navigate('/cart');
    };

    const formatPrice = (priceString) => {
        return parseInt(priceString.replace(/[^0-9]/g, ""), 10);
    };

    const handleAddToCart = async (product) => {
        axios.post('http://localhost:3001/chatify/cart', {
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            discountedPrice: product.discountPrice,
            originalPrice: product.originalPrice,
            quantity: 1
        })
        .then((res) => {
            console.log(res.data);
            setMessage("Product added to cart!");
            setTimeout(() => setMessage(''), 2000);
        })
        .catch((err) => {
            console.log(err);
            setMessage("Failed to add product to cart.");
            setTimeout(() => setMessage(''), 2000);
        });
    };

    return (
        <div className="store-container">
            <header>
                <h1 className="site-title">ToyzAnime</h1>
                <nav>
                    <ul>
                        <li><a href="/">New</a></li>
                        <li>
                            <a href="/">Anime Gifts</a>
                            <ul>
                                <li><a href="/">Naruto</a></li>
                                <li><a href="/">Dragon Ball</a></li>
                                <li><a href="/">One Piece</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/">Showbizz</a>
                            <ul>
                                <li><a href="/">Marvel</a></li>
                                <li><a href="/">DC</a></li>
                                <li><a href="/">Star Wars</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/">Gift by Type</a>
                            <ul>
                                <li><a href="/">Mugs</a></li>
                                <li><a href="/">T-Shirts</a></li>
                                <li><a href="/">Posters</a></li>
                            </ul>
                        </li>
                        <li><button onClick={handleCart}>Cart</button></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </nav>
            </header>

            {message && <div className="message">{message}</div>}

            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} />
                        <div className="product-name">{product.name}</div>
                        <div>
                            {product.originalPrice && (
                                <>
                                    <s style={{ color: 'red' }}>Rs.{product.originalPrice}</s><br />
                                    <span style={{ color: 'green' }}>Rs.{product.discountPrice}</span>
                                </>
                            )}
                        </div>
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .store-container {
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    background-color: #f8f8f8;
                }

                .site-title {
                    font-size: 3em;
                    color: #ff6347;
                    font-family: 'Comic Sans MS', cursive, sans-serif;
                    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    margin-bottom: 20px;
                }

                .message {
                    color: green;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                }

                .product-card {
                    background-color: white;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    display : flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .product-card img {
                    max-width: 100%;
                    height: 200px; /* Set a fixed height */
                    object-fit: fit; /* Ensure the image covers the area */
                    border-radius: 8px;
                    margin-bottom: 15px;
                }

                .product-name {
                    font-size: 1.1em;
                    color: #333;
                    margin-bottom: 10px;
                    font-weight: bold;
                }

                /* Navigation styling */
                nav ul {
                    list-style-type: none;
                    padding: 0;
                    text-align: center;
                }

                nav ul li {
                    display: inline-block;
                    margin-right: 15px;
                    position: relative;
                }

                nav ul li a {
                    text-decoration: none;
                    color: #007bff;
                    padding: 10px 15px;
                    display: block;
                    font-weight: bold;
                }

                nav ul li a:hover {
                    color: #0056b3;
                    text-decoration: underline;
                }

                nav ul li ul {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background-color: white;
                    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
                    padding: 10px 0;
                    border-radius: 5px;
                    z-index: 1;
                }

                nav ul li:hover ul {
                    display: block;
                }

                nav ul li ul li {
                    display: block;
                    padding: 8px 20px;
                    text-align: left;
                }

                nav ul li ul li a {
                    color: #007bff;
                    padding: 5px 0;
                }

                nav ul li ul li a:hover {
                    color: #0056b3;
                    text-decoration: underline;
                }

                button {
                    padding: 10px 15px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #0056b3;
                }
            `}</style>
        </div>
    );
};

export default Home;