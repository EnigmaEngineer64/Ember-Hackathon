import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/VerificationResult.css";

function VerificationFailed() {
  return (
    <div className="verification-result-page">
      <div className="wrapper">
        <Navbar />
      </div>

      {/* Main Verification Section */}
      <main className="verification-section">
        {/* Left Avatar */}
        <div className="avatar">
          <img src="/images/failedKid.png" alt="Failed Avatar" />
        </div>

        {/* Right Verification Box */}
        <div className="verification-box failed">
          <h2>
            VERIFICATION
            <br />
            FAILED!
          </h2>
          <div className="check-icon">
            <img src="/images/fail.png" alt="Failed Icon" />
          </div>
          <div className="button-group">
            <Link to="/otp-verification" className="try-again-btn">
              TRY AGAIN
            </Link>
            <Link to="/login" className="login-btn">
              LOGIN
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default VerificationFailed;
