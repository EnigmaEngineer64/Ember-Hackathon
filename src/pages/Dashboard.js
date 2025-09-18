import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Dashboard.css";

function Dashboard() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ fullName: "", email: "", message: "" });
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="header-wrapper">
        <Navbar />

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-text">
            <h1 className="hero-heading">AI THAT CARES</h1>
            <p className="hero-subheading">LEARNING THAT LASTS</p>
            <button className="btn-start">START</button>
          </div>
          <div className="hero-img">
            <img src="/images/heroSectionImg.png" alt="Hero Character" />
          </div>
        </section>
      </div>

      {/* Middle Content */}
      <div className="middle-wrapper">
        {/* About Section */}
        <section className="about">
          <div className="about-img">
            <img
              className="about-character"
              src="/images/middle-img.png"
              alt="About Character"
            />
          </div>
          <div className="about-text">
            <h2 className="about-heading">ABOUT US</h2>
            <p className="about-desc">
              Ember is an interactive learning platform built for kids with
              ADHD. We make studying feel like play with a colorful design, fun
              activities, and an AI buddy that guides kids every step of the
              way. By blending psychology and technology, we help children stay
              focused, build confidence, and learn at their own pace.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact">
          <div className="contact-left">
            <div className="contact-name">
              <h2 className="contact-heading">TEAM</h2>
              <img
                className="contactHeading-logo"
                src="/images/EMBER[1] 1 (2).png"
                alt="Ember Logo"
              />
            </div>
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <h1 className="form-heading">Contact Us!</h1>

                <label className="form-labels" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className="input-fields"
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />

                <label className="form-labels" htmlFor="email">
                  Email
                </label>
                <input
                  className="input-fields"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <label className="form-labels" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="input-fields"
                  rows="10"
                  cols="70"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />

                <button className="form-submitButton" type="submit">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
          <div className="contact-img">
            <img src="/images/contactUs.png" alt="Contact Character" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq">
          <div className="faq-img">
            <img src="/images/FAQImg.png" alt="FAQ Character" />
          </div>
          <div className="faq-box">
            <h2>FAQ</h2>
            <details>
              <summary>What is Ember?</summary>
              <p>
                Ember is an AI-powered learning buddy designed to help kids with
                ADHD.
              </p>
            </details>
            <details>
              <summary>How does Ember help kids with ADHD?</summary>
              <p>Through interactive learning and personalized guidance.</p>
            </details>
            <details>
              <summary>Is Ember only for kids with ADHD?</summary>
              <p>
                No, it benefits all children who want fun, engaging learning.
              </p>
            </details>
            <details>
              <summary>How does the AI chatbot work?</summary>
              <p>It provides interactive support, reminders, and motivation.</p>
            </details>
            <details>
              <summary>Can parents or teachers track progress?</summary>
              <p>Yes, Ember provides progress tracking for parents/teachers.</p>
            </details>
            <details>
              <summary>Is Ember safe for kids?</summary>
              <p>Absolutely, Ember is designed with child safety first.</p>
            </details>
            <button
              className="btn-secondary"
              onClick={() => alert("Question submission feature coming soon!")}>
              STILL HAVE A DOUBT? SUBMIT YOUR QUESTION!
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
