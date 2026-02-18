import React from 'react';
import styles from './CategoryList.module.css';

export default function CategoryList({ categories, selectedCategory, expandedCategory, onSelectCategory, onToggleExpand, categoryIcons }) {
  const handleMainCategoryClick = (categoryId) => {
    onToggleExpand(categoryId);
    onSelectCategory(categoryId);
  };

  // Функція для перевірки, чи є головна категорія активною або містить активну підкатегорію
  const isMainCategoryActive = (category) => {
    return selectedCategory === category._id || category.subcategories.some(sub => sub._id === selectedCategory);
  };

  return (
    <div className={styles.categoryList}>
      {categories.map((category) => (
        <div key={category._id} className={styles.categoryItem}>
          <button
            className={`${styles.categoryButton} ${
              isMainCategoryActive(category) ? styles.active : ''
            }`}
            onClick={() => handleMainCategoryClick(category._id)}
          >
            <div className={styles['category-icon-cont']}>
            <span className={styles.categoryIcon}>
            {categoryIcons[category.name]}
            </span>
            <span className={styles.categoryName}>{category.name}</span>
            </div>

            {category.subcategories && category.subcategories.length > 0 && (
              <span
                className={`${styles.arrow} ${
                  expandedCategory === category._id ? styles.arrowDown : styles.arrowRight
                }`}
              ></span>
            )}
          </button>
          {expandedCategory === category._id && category.subcategories && (
            <div className={styles.subcategoryList}>
              {category.subcategories.map((subcat) => (
                <button
                  key={`${category._id}-${subcat._id}`}
                  className={`${styles.subcategoryButton} ${
                    selectedCategory === subcat._id ? styles.active : ''
                  }`}
                  onClick={() => onSelectCategory(subcat._id, true)}
                >
                  {subcat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
