import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/LoginForm.module.css";

export default function LoginForm() {
  const [mobileNumber, setMobileNumber] = useState(""); // Mobile number (or username) state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // Error message state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status state

  // Handle login API call
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      // Make POST request to backend for login
      const response = await axios.post("http://localhost:8080/api/login", {
        username: mobileNumber,
        password: password,
      });

      if (response.status === 200) {
        setError("");
        setIsLoggedIn(true); // Update login status

        // Save the token in localStorage for later use
        localStorage.setItem("token", response.data.token);
      }
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  // Check if the user is logged in (based on token in localStorage)
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  };

  // Call checkLoginStatus on component mount
  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  if (isLoggedIn) {
    // Render success message and dashboard link
    return (
      <div className={styles.loginContainer}>
        <h1 className={styles.welcomeTitle}>Login Successful!</h1>
        <p className={styles.successMessage}>
          You are now logged in. Click below to access your dashboard.
        </p>
        <a href="/dashboard" className={styles.loginLink}>
          Go to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.welcomeTitle}>
        Welcome to Arulmigu Sri Ramaperumal Kovil
      </h1>
      <div className={styles.mainContent}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/7a0ac0e8dacce197fd81a25a84f5444cfb95beace28855fa2cb1f51ef768535a?apiKey=cefa1649806149578fe3d15c65143941&"
          className={styles.backgroundImage}
          alt="Temple background"
        />
        <form className={styles.formContainer} onSubmit={handleLogin}>
          <label htmlFor="mobileNumber" className={styles.inputLabel}>
            User
          </label>
          <input
            type="text"
            id="mobileNumber"
            className={styles.inputField}
            placeholder="Enter your User ID"
            aria-label="Enter your user ID"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />

          <label htmlFor="password" className={styles.inputLabel}>
            Password
          </label>
          <div className={styles.passwordContainer}>
            <input
              type="password"
              id="password"
              className={styles.inputField}
              placeholder="Enter your password"
              aria-label="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
