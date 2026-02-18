import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { LuShoppingCart } from "react-icons/lu";
import { FaShippingFast } from "react-icons/fa";
import { AiTwotoneFrown } from "react-icons/ai";


export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const productImages = Array.isArray(product.imageUrl) ? product.imageUrl : [product.imageUrl];
  const mainImage = productImages[0] || '';
  const hoverImage = productImages[1] || mainImage;

  const isAvailable = product.stockQuantity > 0;

  // Get only the first 5 characteristics
  const displayedParams = product.params ? Object.entries(product.params).slice(0, 5) : [];

  return (
    <div
      className={`${styles.card} ${isHovered ? styles.hovered : ''} ${!isAvailable ? styles.outOfStockCard : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.heartIcon}>
        <AiOutlineHeart size={25} />
      </div>

      <div className={styles.imageContainer}>
        <img
          src={isHovered ? hoverImage : mainImage}
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.productName}>{product.name}</h3>
    

      <div className={isAvailable ? styles.readyToShip : styles.outOfStock}>
        {isAvailable ? (
        <>
        Готовий до відправки <FaShippingFast className={styles.shippingIcon} />
        </>
          ) : (
        <>Немає у наявності <AiTwotoneFrown className={styles.shippingIcon}/></>
        )}
        </div>

        <div className={styles.contPrice}>
          <div className={styles.prices}>
            {product.priceOld && <span className={styles.oldPrice}>{product.priceOld} ₴</span>}
            <span className={styles.newPrice}>{product.price} ₴</span>
          </div>
          {isAvailable && <LuShoppingCart size={25} className={styles.LuShoppingCart} />}
        </div>
      </div>

      {/* The product details section */}
      <div className={`${styles.productDetails} ${isHovered ? styles.showDetails : ''}`}>
        <ul className={styles.additionalDetails}>
          {displayedParams.map(([key, value], idx) => (
            <li key={idx} className={styles.paramItem}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
