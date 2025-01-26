import React from 'react';
import styles from '../styles/ServiceCard.module.css';

export const ServiceCard = ({ icon, title, description, actionIcon }) => {
  return (
    <div className={styles.serviceCard} tabIndex="0" role="button">
      <img
        loading="lazy"
        src={icon}
        className={styles.serviceIcon}
        alt={`${title} icon`}
      />
      <h3 className={styles.serviceTitle}>{title}</h3>
      <p className={styles.serviceDescription}>{description}</p>
      <img
        loading="lazy"
        src={actionIcon}
        className={styles.actionIcon}
        alt=""
      />
    </div>
  );
};