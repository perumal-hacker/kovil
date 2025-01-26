import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/SideNavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faUserPlus,
  faTable,
  faBagShopping,
  faNoteSticky,
  faTags,
  faUsers,
  faSignOutAlt,  // Add this import for the logout icon
} from "@fortawesome/free-solid-svg-icons";

const SideNavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Clear the last visited route in localStorage
    localStorage.removeItem("lastVisitedRoute");
    // Redirect to the login page
    navigate("/");
  };

  const handleNavigation = (route) => {
    // Save the last visited route in localStorage
    localStorage.setItem("lastVisitedRoute", route);
    // Navigate to the selected route
    navigate(route);
  };

  return (
    <div
      className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}
    >
      <div className={styles.menuIcon} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link
            to="/dashboard/home"
            className={styles.navLink}
            onClick={() => handleNavigation("/dashboard/home")}
          >
            <FontAwesomeIcon icon={faHome} className={styles.icon} />
            {isExpanded && <span>Home</span>}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/dashboard/tax-form"
            className={styles.navLink}
            onClick={() => handleNavigation("/dashboard/tax-form")}
          >
            <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
            {isExpanded && <span>Add Data</span>}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/dashboard/data"
            className={styles.navLink}
            onClick={() => handleNavigation("/dashboard/data")}
          >
            <FontAwesomeIcon icon={faTable} className={styles.icon} />
            {isExpanded && <span>Data</span>}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/dashboard/stock"
            className={styles.navLink}
            onClick={() => handleNavigation("/dashboard/stock")}
          >
            <FontAwesomeIcon icon={faBagShopping} className={styles.icon} />
            {isExpanded && <span>Stocks</span>}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/dashboard/notes"
            className={styles.navLink}
            onClick={() => handleNavigation("/dashboard/notes")}
          >
            <FontAwesomeIcon icon={faNoteSticky} className={styles.icon} />
            {isExpanded && <span>Notes</span>}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/dashboard/cost"
            className={styles.navLink}
            onClick={() => handleNavigation("/dashboard/cost")}
          >
            <FontAwesomeIcon icon={faTags} className={styles.icon} />
            {isExpanded && <span>Cost</span>}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/dashboard/employee"
            className={styles.navLink}
            onClick={() => handleNavigation("/dashboard/employee")}
          >
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            {isExpanded && <span>Employee</span>}
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className={styles.logoutContainer}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon} />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SideNavBar;
