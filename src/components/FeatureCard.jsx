import React from 'react';
import styles from '../styles/FeatureCard.module.css';

export const FeatureCard = ({ icon, title }) => {
  return (
    <div className={styles.featureCard} tabIndex="0" role="button">
      <img
        loading="lazy"
        src={icon}
        className={styles.featureIcon}
        alt={`${title} feature`}
      />
      <h3 className={styles.featureTitle}>{title}</h3>
    </div>
  );
};