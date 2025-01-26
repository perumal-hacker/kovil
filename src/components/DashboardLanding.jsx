import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { UpdateCard } from './UpdateCard';
import { QuickAccessCard } from './QuickAccessCard';
import styles from '../styles/Dashboard.module.css';

const updates = [
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/ed8033cf6d7208bb89c2c8710f41ffa969077b4c06f4b710b5502c69cb71e60b?apiKey=cefa1649806149578fe3d15c65143941&", title: "Weekly pooja in 2 days" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/ffe990f6a6c1f993677d918ce67c9d3a1a32c56a5b9698b7fd9f8dd874e5530a?apiKey=cefa1649806149578fe3d15c65143941&", title: "Ghee low in stock" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/928eca076431126f092257c663aaad73768784e4772cb116b09e0cb9103f3fbd?apiKey=cefa1649806149578fe3d15c65143941&", title: "Sugar low in stock" },
];

const quickAccess = [
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/6d0f7a05e4bfde4119d00dd1f1f9b8b7759901c463c4750fc42e3176f1299ad7?apiKey=cefa1649806149578fe3d15c65143941&", title: "New Notes", link: "/notes" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/1004cbdd2476a3d4b9723efd88561cf77c7eadff1714f3e9eff3d4d9c1a84ef7?apiKey=cefa1649806149578fe3d15c65143941&", title: "Stock update", link: "/stock-register" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/b4bee3ff6681db36b9cd8524d8b46b7d6a2edc12c2dfe3ab495815e82e1a9a87?apiKey=cefa1649806149578fe3d15c65143941&", title: "Tax", link: "/tax-form" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/0dbb5a3f52867c5e6882dd0c1ae9258005ab4b69354632ccaefe0d9e85690c50?apiKey=cefa1649806149578fe3d15c65143941&", title: "Cost", link: "/cost-layout" },
];

export const DashboardLanding = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage
    if (!token) {
      navigate('/login'); // Use navigate() to redirect instead of history.push()
    } else {
      setIsAuthenticated(true); // Token exists, user is authenticated
    }
  }, [navigate]); // Make sure to include navigate in the dependency array

  // If the user is not authenticated, show loading until authentication is checked
  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.dashboardTitle}>Dashboard</h1>
          <div className={styles.adminSection}>
            <span className={styles.adminText}>Administrator</span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/4a93c00a724f16513db2a6e233044a57d70f02bcb578e74bdf0f837eb5e92bfa?apiKey=cefa1649806149578fe3d15c65143941&"
              alt="Administrator profile"
              className={styles.adminImage}
            />
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Updates</h2>
        <div className={styles.updatesGrid}>
          {updates.map((update, index) => (
            <UpdateCard key={index} {...update} />
          ))}
        </div>

        <div className={styles.divider} />

        <h2 className={styles.sectionTitle}>Quick access</h2>
        <div className={styles.quickAccessGrid}>
          {quickAccess.map((item, index) => (
            <QuickAccessCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
