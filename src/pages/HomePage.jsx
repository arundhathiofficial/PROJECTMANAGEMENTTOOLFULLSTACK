import Header from "../components/Header";
import "./HomePage.css";
import heroImage from "../assets/images/hero.jpg";
import taskImage from "../assets/images/task.jpg";
import teamImage from "../assets/images/team.png";
import analyticsImage from "../assets/images/an.jpg";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const featuresRef = useRef(null);

  const goToSignUp = ()=>{
    navigate("/signup")
  }
  const goToHelp = () =>{
    navigate("/help")
  }

  const goToFeedback = () => {
    navigate("/feedback")
  }

  const goToContact = () => {
    navigate("/contact")
  }

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="home-page">
      <Header isLogin={false} />

      {/* HERO SECTION */}
      <section className="hero">
        <img src={heroImage} alt="Hero" className="hero-image" />

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">Manage Your Projects Like a Pro</h1>

          <p className="hero-subtitle">
            ProjectFlow helps teams collaborate efficiently, track progress, and
            deliver projects on time.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={goToSignUp}>Get Started Free</button>
            
          <a href="/documents/pmt.pdf" download>
          <button className="btn-secondary">
            View Documentation
          </button>
          </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" ref={featuresRef}>
        <h2 className="section-title">Why Choose ProjectFlow?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <img src={taskImage} alt="Task" className="feature-image" />
            <h3>Smart Task Tracking</h3>
            <p>Organize and prioritize tasks easily.</p>
          </div>

          <div className="feature-card">
            <img src={teamImage} alt="Team" className="feature-image" />
            <h3>Team Collaboration</h3>
            <p>Work together with real-time updates.</p>
          </div>

          <div className="feature-card">
            <img
              src={analyticsImage}
              alt="Analytics"
              className="feature-image"
            />
            <h3>Analytics</h3>
            <p>Track project progress with reports.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Start?</h2>
        <p>Join thousands of teams using ProjectFlow</p>
        <button className="btn-cta" onClick={goToSignUp}>Start Free Trial</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>ProjectFlow</h4>
            <p>Modern project management for teams.</p>
          </div>

          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#features" onClick={(e) => { e.preventDefault(); scrollToFeatures(); }}>Features</a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); goToContact(); }}>Connect Us</a>
              </li>
              <li>
               <a href="" onClick={goToHelp}>Help</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="" onClick={goToFeedback}>Feedback</a>
              </li>
              <li>
                <a href="#">Linkedin</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 ProjectFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
