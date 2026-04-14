import Header from "./Header";
import "./ContactPage.css";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  }

  return (
    <div className="contact-page">
      <Header isLogin={false} />
      
      <section className="contact-section">
        <h1>Contact Us</h1>
        <div className="contact-card">
          <h2>Get in Touch</h2>
          <p>Email us at <strong>support@projectflow.com</strong></p>
          <p>We'd love to hear from you!</p>
          <button className="btn-home" onClick={goToHome}>Back to Home</button>
        </div>
      </section>
    </div>
  );
}