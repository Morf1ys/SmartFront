// src/ProductCard/ProductCard.jsx
import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <div className={styles.product}>
      <h3>{product.name}</h3>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
      <p>Price: {product.price} {product.currencyId || 'UAH'}</p>
      {product.priceOld && (
        <p>Old Price: <del>{product.priceOld} {product.currencyId || 'UAH'}</del></p>
      )}
      <p>Vendor: {product.vendor}</p>
      <p>Delivery: {product.delivery ? 'Available' : 'Not Available'}</p>
      <p>Stock: {product.stockQuantity}</p>
      <div className={styles.images}>
        {Array.isArray(product.imageUrl) ? product.imageUrl.map((url, idx) => (
          <img key={idx} src={url} alt={`${product.name} ${idx + 1}`} width="100" />
        )) : (
          product.imageUrl && <img src={product.imageUrl} alt={product.name} width="100" />
        )}
      </div>
      {product.params && (
        <div className={styles.params}>
          <h4>Additional Parameters:</h4>
          <ul>
            {Object.entries(product.params).map(([key, value], idx) => (
              <li key={idx}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
