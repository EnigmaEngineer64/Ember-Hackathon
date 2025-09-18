import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/VerificationResult.css";

function VerificationSuccess() {
  return (
    <div className="verification-result-page">
      <div className="wrapper">
        <Navbar />
      </div>

      {/* Main Verification Section */}
      <main className="verification-section">
        {/* Left Avatar */}
        <div className="avatar">
          <img src="/images/doneKid.png" alt="Success Avatar" />
        </div>

        {/* Right Verification Box */}
        <div className="verification-box success">
          <h2>
            VERIFICATION
            <br />
            DONE!
          </h2>
          <div className="check-icon">
            <img src="/images/tick.png" alt="Success Icon" />
          </div>
          <Link to="/login" className="login-btn">
            LOGIN
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default VerificationSuccess;
