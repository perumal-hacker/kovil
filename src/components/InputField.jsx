import React from 'react';
import styles from '../styles/TaxForm.module.css';

export function InputField({ label, id, type = "text" }) {
  return (
    <div className={styles.receiptDetails}>
      <label htmlFor={id} className={styles.sectionTitle}>{label}</label>
      <input
        type={type}
        id={id}
        className={styles.inputField}
        aria-label={label}
      />
    </div>
  );
}