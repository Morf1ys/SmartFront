import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.module.css';

export default function App() {
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product-feed', {
          headers: {
            'Accept': 'application/json'
          }
        });

        const productsByCategory = response.data.products.reduce((acc, product) => {
          const category = product.category || 'Uncategorized';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});

        setProducts(productsByCategory);
        setCategories(Object.keys(productsByCategory));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <h1>Product Categories</h1>
      <div className="categories">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <h2>{selectedCategory ? `Products in ${selectedCategory}` : 'Select a Category'}</h2>
      <div className="products">
        {selectedCategory && products[selectedCategory] ? (
          products[selectedCategory].map((product, index) => (
            <div key={index} className="product">
              <h3>{product.name}</h3>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
              <p>Price: {product.price} {product.currencyId || 'UAH'}</p>
              {product.priceOld && (
                <p>Old Price: <del>{product.priceOld} {product.currencyId || 'UAH'}</del></p>
              )}
              <p>Vendor: {product.vendor}</p>
              <p>Delivery: {product.delivery ? 'Available' : 'Not Available'}</p>
              <p>Stock: {product.stockQuantity}</p>
              <div className="images">
                {Array.isArray(product.imageUrl) ? product.imageUrl.map((url, idx) => (
                  <img key={idx} src={url} alt={`${product.name} ${idx + 1}`} width="100" />
                )) : (
                  product.imageUrl && <img src={product.imageUrl} alt={product.name} width="100" />
                )}
              </div>
              {product.params && (
                <div className="params">
                  <h4>Additional Parameters:</h4>
                  <ul>
                    {Object.entries(product.params).map(([key, value], idx) => (
                      <li key={idx}><strong>{key}:</strong> {value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Please select a category to view products.</p>
        )}
      </div>
    </div>
  );
}
