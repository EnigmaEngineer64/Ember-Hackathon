import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/LoginPage.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted:", formData);
    // Add login logic here
    if (formData.username && formData.password) {
      alert("Login successful! Welcome to Ember!");
      navigate("/");
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password functionality coming soon!");
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <Navbar />
      </div>

      {/* Login Section */}
      <div className="main">
        <img src="/images/logingKid.png" alt="Pixel Kid" />
        <div className="login-and-create-account">
          <div className="login-box">
            <h2 className="login-word">LOGIN</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">USERNAME/EMAIL ID</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />

              <button
                type="button"
                className="forgot"
                onClick={handleForgotPassword}>
                FORGOT PASSWORD?
              </button>

              <button type="submit">LOGIN</button>
            </form>
          </div>

          <div className="create-account">
            <p className="new-text">DON'T HAVE AN ACCOUNT?</p>
            <Link to="/signup" className="new-account">
              Create New Account
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;
