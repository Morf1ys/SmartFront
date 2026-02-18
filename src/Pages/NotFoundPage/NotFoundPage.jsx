// src/Pages/NotFoundPage/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import defaultImage from '../../assets/404.png';
import Header from '../../components/Header/Header';


export default function NotFoundPage() {
    return (
  <div>
   <Header/>   
  <div className={styles['not-fon-page-cont']}>
    <img className={styles.imegfound} src={defaultImage} alt="not found" />
    <h1>404 - Сторінка не знайдена</h1>
    <p>{`Вибачте, але сторінка, яку ви шукаєте, не існує.`}</p>
    <Link to="/"><button className={styles.btnBackHome}>Повернутися на головну</button></Link>
  </div>
    </div>
  );
}
