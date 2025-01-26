import React from 'react';
import styles from '../styles/Dashboard.module.css';

export const UpdateCard = ({ imageSrc, title }) => {
  return (
    <div className={styles.updateCard}>
      <img
        loading="lazy"
        src={imageSrc}
        alt={title}
        className={styles.updateImage}
      />
      <div className={styles.updateTitle}>{title}</div>
    </div>
  );
};