import React from 'react';
import styles from './Notes.module.css';

export const PoojaCard = ({ title, notes, date, imageSrc }) => {  // content is the notes field
  const imageUrl = imageSrc ? `http://localhost:8080${imageSrc}` : null;

  return (
    <article className={styles.poojaCard}>
      <div className={styles.poojaCardContainer}>
        {imageUrl && (
          <img
            loading="lazy"
            src={imageUrl}
            alt={`Pooja illustration for ${title}`}
            className={styles.poojaImage}
          />
        )}
        <h3 className={styles.poojaTitle}>{title}</h3>
        <div className={styles.poojaContent}>
          {notes || 'No content available.'} {/* Display notes (content) */}
        </div>
      </div>
      {date && <time className={styles.noteDate}>{date}</time>}
    </article>
  );
};
