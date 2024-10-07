import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

export default function ProductList({ products }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Функції для обробки наведення
  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <div className={styles.products}>
      {products.map((product, index) => (
        <ProductCard
          className={styles['product-card']}
          key={index}
          product={product}
          isHovered={hoveredIndex === index} // Передаємо інформацію, чи є картка активною
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}
