import React from "react";
import "../styles/Footer.css";

function Footer() {
  const handleClick = (action) => {
    console.log(`${action} clicked`);
    // Add actual functionality here later
  };

  return (
    <>
      <footer className="footer">
        {/* Newsletter */}
        {/* <div className="newsletter">
          <button onClick={() => handleClick("Newsletter")}>
            JOIN OUR NEWSLETTER
          </button>
        </div> */}

        {/* Social Media Links */}
        <div className="socials">
          <button
            onClick={() => handleClick("LinkedIn")}
            aria-label="LinkedIn"
            className="social-btn">
            <img src="/images/linkedin.png" alt="LinkedIn" />
          </button>
          <button
            onClick={() => handleClick("Instagram")}
            aria-label="Instagram"
            className="social-btn">
            <img src="/images/instagram.png" alt="Instagram" />
          </button>
          <button
            onClick={() => handleClick("Facebook")}
            aria-label="Facebook"
            className="social-btn">
            <img src="/images/facebook.png" alt="Facebook" />
          </button>
          <button
            onClick={() => handleClick("Phone")}
            aria-label="Phone"
            className="social-btn">
            <img src="/images/call.png" alt="Phone" />
          </button>
          <button
            onClick={() => handleClick("Email")}
            aria-label="Email"
            className="social-btn">
            <img src="/images/mail.png" alt="Email" />
          </button>
        </div>

        {/* Footer Links */}
        {/* <div className="footer-links">
          <button
            onClick={() => handleClick("Home")}
            className="footer-link-btn">
            HOME
          </button>
          <button
            onClick={() => handleClick("News")}
            className="footer-link-btn">
            NEWS
          </button>
          <button
            onClick={() => handleClick("About")}
            className="footer-link-btn">
            ABOUT
          </button>
          <button
            onClick={() => handleClick("Contact")}
            className="footer-link-btn">
            CONTACT US
          </button>
          <button
            onClick={() => handleClick("Team")}
            className="footer-link-btn">
            OUR TEAM
          </button>
          <button
            onClick={() => handleClick("Privacy")}
            className="footer-link-btn">
            PRIVACY POLICY
          </button>
          <button
            onClick={() => handleClick("Cookies")}
            className="footer-link-btn">
            COOKIES POLICY
          </button>
          <button
            onClick={() => handleClick("Terms")}
            className="footer-link-btn">
            TERMS & CONDITIONS
          </button>
        </div> */}
      </footer>

      {/* Copyright */}
      <div className="copyright-container">
        <div className="copyright">
          <b>COPYRIGHT ©️ 2025, TEAM KINETICX</b>
        </div>
      </div>
    </>
  );
}

export default Footer;
