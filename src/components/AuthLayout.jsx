import React from 'react';
import LoginForm from './LoginForm';
import styles from '../styles/AuthLayout.module.css';

export default function AuthLayout() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.welcomeTitle}>
          Welcome to Arulmigu Sri Ramaperumal Kovil
        </h1>
        <div className={styles.formContainer}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/a5fe471f855be196da465d6dd5eb9c5ff9dbdb2bce945ac88b11c26ed38c7f97?apiKey=cefa1649806149578fe3d15c65143941&"
            className={styles.backgroundImage}
            alt="Temple background"
          />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}