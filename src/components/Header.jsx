import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

export const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navItems = [
    { label: "Home", link: "/", className: styles.homeLink },
    { label: "Festivals", link: "/poojas", className: styles.poojasLink },
    !isAuthenticated
      ? {
          label: "Login",
          link: null,
          className: styles.loginLink,
          onClick: (e) => {
            e.preventDefault();
            setIsLoginModalOpen(true);
          },
        }
      : {
          label: "Dashboard",
          link: "/dashboard",
          className: styles.dashboardLink,
        },
  ];

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/3b233f243f9c731b44a9b05e2880b2f958cd09912a84e3237f456ae200b26fef?apiKey=cefa1649806149578fe3d15c65143941&"
          className={styles.logo}
          alt="Temple Logo"
        />
        <nav className={styles.navigation}>
          {navItems.map((item, index) =>
            item.link ? (
              <Link
                key={index}
                to={item.link}
                className={item.className}
                tabIndex="0"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={index}
                href="/"
                className={item.className}
                tabIndex="0"
                onClick={item.onClick}
              >
                {item.label}
              </a>
            )
          )}
        </nav>
      </header>

      {isLoginModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <LoginForm
              setIsAuthenticated={setIsAuthenticated}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </>
  );
};
