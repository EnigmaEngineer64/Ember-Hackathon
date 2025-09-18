import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/SignUpPage.css";

function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
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
    console.log("Signup attempted:", formData);
    // Add signup logic here
    alert("Account created! Please verify your email and phone number.");
    // Navigate to OTP verification
    navigate("/otp-verification");
  };

  return (
    <div className="signup-page">
      <div className="wrapper">
        <Navbar />
      </div>

      {/* Create New Account Section */}
      <section className="signup-section">
        <div className="signup-container">
          {/* Left side image */}
          <div className="signup-image">
            <img src="/images/logingKid.png" alt="Pixel Avatar" />
          </div>

          {/* Right side form */}
          <div className="signup-form">
            <h1 className="form-title">CREATE NEW ACCOUNT</h1>

            <form onSubmit={handleSubmit}>
              <div className="input-group two-col">
                <div className="col">
                  <label htmlFor="firstName">FIRST NAME</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="surname">SURNAME</label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Gender</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleInputChange}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={handleInputChange}
                    />
                    Other
                  </label>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  className="width100"
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">EMAIL ID</label>
                <input
                  className="width100"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="mobile">MOBILE NO.</label>
                <input
                  className="width100"
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div className="login-redirect">
          <p>Already have an account?</p>
          <Link className="login-btn" to="/login">
            LOGIN
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SignUpPage;
