import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.module.css';

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product-feed', {
          headers: {
            'Accept': 'application/json'
          }
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <h1>Products</h1>
      <div>
        {products.map((product, index) => (
          <div key={index} className="product">
            <h2>{product.name}</h2>
            {/* Рендеринг HTML-контенту */}
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
            <p>Price: {product.price} UAH</p>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} width="100" />}
          </div>
        ))}
      </div>
    </div>
  );
}
