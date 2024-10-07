// src/CategoryList/CategoryList.jsx
import React from 'react';
import styles from './CategoryList.module.css';

export default function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className={styles.categories}>
      {categories.map((category, index) => (
        <button
          key={index}
          className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
