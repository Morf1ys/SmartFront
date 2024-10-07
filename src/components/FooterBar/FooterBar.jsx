// src/FooterBar/FooterBar.jsx
import React from 'react';
import styles from './FooterBar.module.css';
import { BiCategory } from "react-icons/bi";
import { FaListCheck } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

export default function FooterBar() {
  return (
    <div className={styles.footerBar}>
      <button className={styles.button}><BiCategory size={26}/></button>
      <button className={styles.button}><FaListCheck  size={26}/></button>
      <button className={styles.button}><FaRegBell size={26}/></button>
      <button className={styles.button}><FaRegHeart size={26}/></button>
    </div>
  );
}
