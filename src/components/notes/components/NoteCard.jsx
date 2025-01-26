import React from 'react';
import styles from './NoteCard.module.css';

export const NoteCard = ({ title, content, date, imageUrl }) => {
  return (
    <div className={styles.noteCardContainer}>
      <div className={styles.noteContent}>
        <img
          loading="lazy"
          src={imageUrl}
          alt=""
          className={styles.backgroundImage}
        />
        <div className={styles.titleWrapper}>
          <h3 className={styles.noteTitle}>{title}</h3>
          <div className={styles.divider} />
        </div>
        <p className={styles.noteText}>{content}</p>
      </div>
      <time className={styles.noteDate}>{date}</time>
    </div>
  );
};