import React from 'react';
import styles from './Notes.module.css';

export const NoteCard = ({ title, content, date, imageSrc }) => {
  const imageUrl = imageSrc ? `http://localhost:8080${imageSrc}` : null;

  return (
    <article className={styles.noteCard}>
      

      {/* Image */}
      {imageUrl && (
        <img
          loading="lazy"
          src={imageUrl}
          alt={`Note illustration for ${title || 'Untitled Note'}`}
          className={styles.noteImage}
        />
      )}
      {/* Title */}
      <h3 className={styles.noteTitle}>{title || 'Untitled Note'}</h3> {/* Fallback if title is empty */}

      {/* Content */}
      <div className={styles.noteContent}>
        {content || 'No content available.'} {/* Added fallback for content */}
      </div>

      {/* Date */}
      {date && <time className={styles.noteDate}>{date}</time>} {/* Conditionally render date */}
    </article>
  );
};
