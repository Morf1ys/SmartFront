import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { VscMenu } from "react-icons/vsc";
import logoDesktop from '../../assets/images/Logo2.png';
import logoMobile from '../../assets/images/LogoMobile.png';
import { BiCategory } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";
import { PiUserBold } from "react-icons/pi";
import { LuShoppingCart } from "react-icons/lu";
import FoterBarMob from '../FooterBar/FooterBar.jsx';

const handleChange = (event) => {
  console.log("Вибрана мова:", event.target.value);
};

export default function Header({ onLogoClick }) {
  const [logo, setLogo] = useState(logoDesktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025) {
        setLogo(logoDesktop);
      } else {
        setLogo(logoMobile);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.container}>
          <button className={styles.modalButton}>
            <VscMenu size={24} />
          </button>
          <div className={styles.logo}>
            <Link to="/" onClick={onLogoClick}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <button className={styles.catalogButton}>
            <BiCategory size={30} className={styles['category-icon']} />
            <p className={styles.catalog}>Каталог</p>
          </button>
          <div className={styles.searchBar}>
            <BiSearchAlt size={23} className={styles['serch-icon']} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Пошук товарів..."
            />
            <button className={styles.searchButton}>Знайти</button>
          </div>
          <select
            className={styles.languageSelector}
            onChange={handleChange}
            defaultValue="ua"
          >
            <option value="ua">UA</option>
            <option value="en">RU</option>
          </select>
          <button className={styles.authButton}>
            <PiUserBold size={26} />
          </button>
          <button className={styles.cartButton}>
            <LuShoppingCart size={26} />
          </button>
        </div>
      </header>
      <FoterBarMob />
    </div>
  );
}
