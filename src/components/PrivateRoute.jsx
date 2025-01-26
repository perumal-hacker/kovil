import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Set initial state to null for loading phase

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // If token exists, mark as authenticated
    } else {
      setIsAuthenticated(false); // No token found, mark as unauthenticated
      navigate("/", { replace: true }); // Redirect to the main page (login page)
    }
  }, [navigate]);

  // Show a loading state or null while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // You can replace this with a spinner or any loading UI
  }

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
