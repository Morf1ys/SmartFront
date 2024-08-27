// src/App/App.jsx
import React from 'react';
import Home from './Pages/Home/Home';
import styles from './Pages/Home/Home.module.css';

export default function App() {
  return (
    <div className={styles.App}>
      <Home />
    </div>
  );
}
