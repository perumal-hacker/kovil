import React from 'react';
import styles from '../../styles/Temple.module.css';

export const SocialIcon = ({ src, alt }) => {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={styles.socialIcon}
    />
  );
};