import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/OTPVerification.css";

function OTPVerification() {
  const [emailOTP, setEmailOTP] = useState(["", "", "", ""]);
  const [phoneOTP, setPhoneOTP] = useState(["", "", "", ""]);
  const emailRefs = useRef([]);
  const phoneRefs = useRef([]);
  const navigate = useNavigate();

  const handleOTPChange = (value, index, type) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      if (type === "email") {
        const newOTP = [...emailOTP];
        newOTP[index] = value;
        setEmailOTP(newOTP);

        // Auto-focus next input
        if (value && index < 3) {
          emailRefs.current[index + 1]?.focus();
        }
      } else {
        const newOTP = [...phoneOTP];
        newOTP[index] = value;
        setPhoneOTP(newOTP);

        // Auto-focus next input
        if (value && index < 3) {
          phoneRefs.current[index + 1]?.focus();
        }
      }
    }
  };

  const handleKeyDown = (e, index, type) => {
    if (e.key === "Backspace") {
      if (type === "email" && !emailOTP[index] && index > 0) {
        emailRefs.current[index - 1]?.focus();
      } else if (type === "phone" && !phoneOTP[index] && index > 0) {
        phoneRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = (type) => {
    const otp = type === "email" ? emailOTP.join("") : phoneOTP.join("");

    if (otp.length === 4) {
      console.log(`${type} OTP verification:`, otp);

      // Simulate verification logic
      if (otp === "1234") {
        navigate("/verification-success");
      } else {
        navigate("/verification-failed");
      }
    } else {
      alert("Please enter a complete 4-digit OTP");
    }
  };

  const handleResend = (type) => {
    console.log(`Resending ${type} OTP`);
    alert(
      `${type.charAt(0).toUpperCase() + type.slice(1)} OTP has been resent!`
    );

    // Clear the inputs
    if (type === "email") {
      setEmailOTP(["", "", "", ""]);
      emailRefs.current[0]?.focus();
    } else {
      setPhoneOTP(["", "", "", ""]);
      phoneRefs.current[0]?.focus();
    }
  };

  return (
    <div className="otp-page">
      <div className="wrapper">
        <Navbar />
      </div>

      {/* Main OTP Section */}
      <main className="main">
        {/* Left Avatar */}
        <div className="avatar">
          <img src="/images/logingKid.png" alt="Pixel Avatar" />
        </div>

        {/* OTP Verification Box */}
        <div className="login-box">
          <h2>
            VERIFY <br /> WITH OTP
          </h2>

          {/* Email OTP */}
          <div className="input-group">
            <label>Email Verification</label>
            <div className="otp-inputs">
              {emailOTP.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (emailRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleOTPChange(e.target.value, index, "email")
                  }
                  onKeyDown={(e) => handleKeyDown(e, index, "email")}
                />
              ))}
            </div>
            <button
              className="verify-btn"
              onClick={() => handleVerify("email")}>
              VERIFY
            </button>
            <button className="resend" onClick={() => handleResend("email")}>
              RESEND OTP
            </button>
          </div>

          {/* Phone OTP */}
          <div className="input-group">
            <label>Phone Verification</label>
            <div className="otp-inputs">
              {phoneOTP.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (phoneRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleOTPChange(e.target.value, index, "phone")
                  }
                  onKeyDown={(e) => handleKeyDown(e, index, "phone")}
                />
              ))}
            </div>
            <button
              className="verify-btn"
              onClick={() => handleVerify("phone")}>
              VERIFY
            </button>
            <button className="resend" onClick={() => handleResend("phone")}>
              RESEND OTP
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default OTPVerification;
