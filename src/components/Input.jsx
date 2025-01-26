import React from 'react';
import styles from '../styles/Input.module.css';

export function Input({ label, type = 'text', placeholder, id }) {
  const isPassword = type === 'password';
  
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <div className={isPassword ? styles.passwordContainer : undefined}>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={styles.inputField}
          aria-label={label}
        />
        {isPassword && (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/53b0ed673f1101701424dce2239b3437080094b8de1e3717b359420dc5a40f11?apiKey=cefa1649806149578fe3d15c65143941&"
            className={styles.passwordIcon}
            alt=""
          />
        )}
      </div>
    </div>
  );
}