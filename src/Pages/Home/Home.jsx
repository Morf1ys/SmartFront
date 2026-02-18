// src/pages/Home/Home.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CategoryList from '../../components/CategoryList/CategoryList';
import PaginatedProductList from '../../components/PaginatedProductList/PaginatedProductList'; // Import the paginated component
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import { FaLaptop, FaMobileAlt, FaHome, FaDumbbell, FaTshirt, FaTools } from "react-icons/fa";
import { MdOutlineBusinessCenter, MdOutlineBathtub, MdOutlineSmartToy } from "react-icons/md";
import { GiDelicatePerfume, GiBrodieHelmet } from "react-icons/gi";
import { PiWashingMachineDuotone } from "react-icons/pi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();

  const categoryIcons = {
    "Товари для бізнесу": <MdOutlineBusinessCenter />,
    "Комп'ютери та ноутбуки": <FaLaptop />,
    "Смартфони, ТВ і електроніка": <FaMobileAlt />,
    "Сантехніка та ремонт": <MdOutlineBathtub />,
    "Інструменти та автотовари": <FaTools />,
    "Товари для дітей": <MdOutlineSmartToy />,
    "Побутова техніка, інтер'єр": <PiWashingMachineDuotone />,
    "Спорт і захоплення": <FaDumbbell />,
    "Одяг, взуття та аксесуари": <FaTshirt />,
    "Краса та здоров'я": <GiDelicatePerfume />,
    "Товари для дому": <FaHome />,
    "Амуніція": <GiBrodieHelmet />
  };

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:3000/categories');
        setCategories(categoryResponse.data.categories);

        const productResponse = await axios.get('http://localhost:3000/product-feed', {
          headers: { 'Accept': 'application/json' }
        });
        setProducts(productResponse.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(subcategoryId || categoryId);
    }
  }, [categoryId, subcategoryId]);

  const handleCategorySelect = (id, isSubcategory = false) => {
    setSelectedCategory(id);
    if (isSubcategory) {
      navigate(`/category/${categoryId}/${id}`);
    } else {
      navigate(`/category/${id}`);
    }
  };

  const handleToggleExpand = (categoryId) => {
    setExpandedCategory(prev => (prev === categoryId ? null : categoryId));
  };

  const handleLogoClick = () => {
    navigate('/');
    setSelectedCategory(null);
    setExpandedCategory(null);
  };

  const getCategoryPath = (categoryId) => {
    const mainCategory = categories.find(cat => cat._id === categoryId || cat.subcategories.some(sub => sub._id === categoryId));
    if (!mainCategory) return 'Unknown Category';

    if (mainCategory._id === categoryId) {
      return mainCategory.name;
    } else {
      const subcategory = mainCategory.subcategories.find(sub => sub._id === categoryId);
      return `${mainCategory.name} > ${subcategory ? subcategory.name : 'Unknown Subcategory'}`;
    }
  };

  const filteredProducts = selectedCategory 
    ? products
        .filter(product => {
          const mainCategory = categories.find(cat => cat._id === selectedCategory);
          const subcategories = mainCategory?.subcategories.map(subcat => subcat._id.toString()) || [];
          return product.category.toString() === selectedCategory || subcategories.includes(product.category.toString());
        })
        .sort((a, b) => {
          if (a.stockQuantity > 0 && b.stockQuantity === 0) return -1;
          if (a.stockQuantity === 0 && b.stockQuantity > 0) return 1;
          return 0;
        })
    : [];

  return (
    <div className={styles.home}>
      <Header onLogoClick={handleLogoClick} />
      <h2 className={styles['choose-categories']}>
        {selectedCategory ? `${getCategoryPath(selectedCategory)}` : 'Виберіть категорію'}
      </h2>
      <div className={styles['cont-main']}>
        <div>
          <CategoryList 
            categories={categories} 
            selectedCategory={selectedCategory} 
            expandedCategory={expandedCategory} 
            onSelectCategory={handleCategorySelect}
            onToggleExpand={handleToggleExpand}
            categoryIcons={categoryIcons}
          />
        </div>
        <div>
          {selectedCategory && filteredProducts.length ? (
            <PaginatedProductList products={filteredProducts} /> // Use PaginatedProductList here
          ) : (
            selectedCategory && <p>Please select a category to view products.</p>
          )}
        </div>
      </div>
    </div>
  );
}
