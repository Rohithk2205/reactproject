import React from 'react';
import { useCart } from './CartContext';

const Product = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.name}</p>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <style>
                {`
                    .product-card { border: 1px solid #ddd; border-radius: 8px; padding: 10px; text-align: center; }
                    img { width: 100%; height: auto; border-radius: 4px; }
                    button { background-color: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
                `}
            </style>
        </div>
    );
};

export default Product;
