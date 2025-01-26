import React from 'react';
import styles from './PoojaCard.module.css';

export const PoojaCard = ({ imageUrl }) => {
  return (
    <img
      loading="lazy"
      src={imageUrl}
      alt="Weekly pooja schedule"
      className={styles.poojaImage}
    />
  );
};