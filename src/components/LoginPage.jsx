import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.css";
import { Input } from "./Input";

export function LoginPage() {
  const [credentials, setCredentials] = useState({
    mobileNumber: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulated login logic (replace with your backend API)
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Save token to localStorage
        alert("Login successful!");
        navigate("/dashboard/home"); // Redirect to dashboard
      } else {
        alert("Invalid mobile number or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Logo */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/fc0ff708db7fbf8d927196a712d7f731cdc8f75dd0e0ce4108ef26b596f9f67e?apiKey=cefa1649806149578fe3d15c65143941&"
        className={styles.logo}
        alt="Temple logo"
      />
      
      {/* Welcome Text */}
      <div className={styles.welcomeText}>
        Welcome to Arulmigu Sri Ramaperumal Kovil
      </div>

      <div className={styles.formWrapper}>
        {/* Background Image */}
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/09eb033318bfa3b13ea028586747b6112a15d5ab9cd13df1cc1ccc38667acb69?apiKey=cefa1649806149578fe3d15c65143941&"
          className={styles.backgroundImage}
          alt=""
        />

        {/* Login Form */}
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <Input
            label="Mobile Number"
            type="tel"
            placeholder="Enter your mobile number"
            id="mobileNumber"
            value={credentials.mobileNumber}
            onChange={handleInputChange}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            id="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
