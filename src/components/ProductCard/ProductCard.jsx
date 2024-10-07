import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import { AiOutlineHeart } from 'react-icons/ai';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const productImages = Array.isArray(product.imageUrl) ? product.imageUrl : [product.imageUrl];
  const mainImage = productImages[0] || '';
  const hoverImage = productImages[1] || mainImage;

  // Перевірка на наявність товару
  const isOutOfStock = product.stockQuantity === 0;

  return (
    <div
      className={`${styles.card} ${isHovered ? styles.hovered : ''} ${isOutOfStock ? styles.outOfStock : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Іконка серця у правому верхньому куті */}
      <div className={styles.heartIcon}>
        <AiOutlineHeart size={25} />
      </div>

      <div className={styles.imageContainer}>
        {/* Зображення змінюється при ховері на фото */}
        <img
          src={isHovered ? hoverImage : mainImage}
          alt={product.name}
          className={styles.productImage}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.prices}>
          {product.priceOld && (
            <span className={styles.oldPrice}>{product.priceOld} ₴</span>
          )}
          <span className={styles.newPrice}>{product.price} ₴</span>
        </div>
      </div>

      {/* Відображення статусу наявності товару */}
      {isOutOfStock ? (
        <div className={styles.outOfStockLabel}>Немає в наявності</div>
      ) : (
        <div className={`${styles.productDetails} ${isHovered ? styles.showDetails : ''}`}>
          <ul className={styles.additionalDetails}>
            {product.params && Object.entries(product.params).slice(0, 5).map(([key, value], idx) => (
              <li key={idx} className={styles.paramItem}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
