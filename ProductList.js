import React from 'react';
import Product from './Product';

const ProductList = ({ products }) => {
    return (
        <div className="product-grid">
            {products.map(product => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;