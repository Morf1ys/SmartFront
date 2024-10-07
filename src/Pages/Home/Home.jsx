// src/pages/Home/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryList from '../../components/CategoryList/CategoryList';
import ProductList from '../../components/ProductList/ProductList';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';

export default function Home() {
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
    
       <div className={styles.home}>
      <Header />
      {/* Далі йде основний контент сторінки */}
    
    <div className={styles.home}>
      <h1>Product Categories</h1>
      <CategoryList 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      <h2>{selectedCategory ? `Products in ${selectedCategory}` : 'Select a Category'}</h2>
      {selectedCategory && products[selectedCategory] ? (
        <ProductList products={products[selectedCategory]} />
      ) : (
        <p>Please select a category to view products.</p>
      )}
      </div>
      </div>
  );
}
