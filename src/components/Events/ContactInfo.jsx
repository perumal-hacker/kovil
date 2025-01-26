import React from 'react';
import styles from '../../styles/Events.module.css';


export const ContactInfo = ({ icon, text }) => {
  return (
    <div className={styles.contactRow}>
      <img
        loading="lazy"
        src={icon}
        alt=""
        className={styles.contactIcon}
      />
      <div className={styles.contactText}>{text}</div>
    </div>
  );
};