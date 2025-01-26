import React from 'react';
import styles from '../../styles/Events.module.css';

export const EventCard = ({ image, title }) => {
  return (
    <div className={styles.eventCard}>
      <img
        loading="lazy"
        src={image}
        alt={`${title} event`}
        className={styles.eventImage}
      />
      <div className={styles.eventTitle}>{title}</div>
    </div>
  );
};