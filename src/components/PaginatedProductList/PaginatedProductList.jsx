import React, { useState } from 'react';
import ProductList from '../ProductList/ProductList';
import styles from './PaginatedProductList.module.css';

export default function PaginatedProductList({ products, itemsPerPage = 16 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState(new Set([1]));
  const [showLeftDots, setShowLeftDots] = useState(false);
  const [showRightDots, setShowRightDots] = useState(false);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Отримуємо товари для всіх завантажених сторінок
  const loadMoreProducts = Array.from(loadedPages).reduce((acc, page) => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    return acc.concat(products.slice(start, end));
  }, []);

  // Отримуємо товари для обраної сторінки
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Обробка натискання "Завантажити ще"
  const handleLoadMore = () => {
    const nextPage = Math.min(Math.max(...loadedPages) + 1, totalPages);
    if (!loadedPages.has(nextPage)) {
      setLoadedPages((prevPages) => new Set([...prevPages, nextPage]));
    }
  };

  // Обробка переходу на конкретну сторінку
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoadedPages(new Set([page])); // Скидаємо завантажені сторінки для нової сторінки
    setShowLeftDots(false);
    setShowRightDots(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Відображення прихованих сторінок при натисканні на "..."
  const handleDotsClick = (position) => {
    if (position === 'left') {
      setShowLeftDots(!showLeftDots);
    } else if (position === 'right') {
      setShowRightDots(!showRightDots);
    }
  };

  // Рендер скороченої пагінації з інтерактивними кнопками "..."
  const renderPagination = () => {
    const paginationItems = [];
    if (totalPages <= 9) { // Відображаємо всі сторінки, якщо їх менше 9
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`${styles.pageButton} ${i === currentPage || loadedPages.has(i) ? styles.activePage : styles.inactivePage}`}
          >
            {i}
          </button>
        );
      }
    } else {
      paginationItems.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`${styles.pageButton} ${1 === currentPage || loadedPages.has(1) ? styles.activePage : styles.inactivePage}`}
        >
          1
        </button>
      );

      if (currentPage > 5 && !showLeftDots) {
        paginationItems.push(
          <button key="left-dots" onClick={() => handleDotsClick('left')} className={styles.dotsButton}>
            ...
          </button>
        );
      } else if (showLeftDots) {
        for (let i = 2; i < currentPage - 2; i++) {
          paginationItems.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`${styles.pageButton} ${i === currentPage || loadedPages.has(i) ? styles.activePage : styles.inactivePage}`}
            >
              {i}
            </button>
          );
        }
      }

      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      for (let i = start; i <= end; i++) {
        paginationItems.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`${styles.pageButton} ${i === currentPage || loadedPages.has(i) ? styles.activePage : styles.inactivePage}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 4 && !showRightDots) {
        paginationItems.push(
          <button key="right-dots" onClick={() => handleDotsClick('right')} className={styles.dotsButton}>
            ...
          </button>
        );
      } else if (showRightDots) {
        for (let i = currentPage + 3; i < totalPages; i++) {
          paginationItems.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`${styles.pageButton} ${i === currentPage || loadedPages.has(i) ? styles.activePage : styles.inactivePage}`}
            >
              {i}
            </button>
          );
        }
      }

      paginationItems.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`${styles.pageButton} ${totalPages === currentPage || loadedPages.has(totalPages) ? styles.activePage : styles.inactivePage}`}
        >
          {totalPages}
        </button>
      );
    }
    return paginationItems;
  };

  return (
    <div>
      {/* Відображення товарів: всі завантажені ("Завантажити ще") або лише обрана сторінка */}
      <ProductList products={loadedPages.size > 1 ? loadMoreProducts : paginatedProducts} />

      {/* Кнопка "Завантажити ще", яка доступна на будь-якій сторінці, окрім останньої */}
      {Math.max(...loadedPages) < totalPages && (
        <button className={styles.loadMoreButton} onClick={handleLoadMore}>
          <span className={styles.loadMoreIcon}>⟳</span> Показати ще
        </button>
      )}

      {/* Пагінація */}
      {products.length > itemsPerPage && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            &lt;
          </button>
          {renderPagination()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
