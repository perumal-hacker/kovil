import React from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import styles from '../styles/Dashboard.module.css';

export const QuickAccessCard = ({ imageSrc, title, link }) => {
  return (
    <Link to={link} className={styles.quickAccessCard}>  {/* Use Link for navigation */}
      <img
        loading="lazy"
        src={imageSrc}
        alt={title}
        className={styles.quickAccessImage}
      />
      <div className={styles.quickAccessTitle}>{title}</div>
    </Link>
  );
};
