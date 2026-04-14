import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Feedback.css";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "bug",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email");
      return;
    }

    // Submit feedback (in real app, send to backend)
    console.log("Feedback submitted:", formData);
    setSubmitted(true);

    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <h2>Share Your Feedback</h2>
        <p className="feedback-subtitle">Help us improve ProjectFlow</p>

        {submitted ? (
          <div className="success-message">
            <p>Thank you for your feedback!</p>
            <p>We appreciate your input.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Feedback Type</label>
              <select
                name="feedbackType"
                value={formData.feedbackType}
                onChange={handleChange}
              >
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="improvement">Improvement</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Tell us what you think..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Submit Feedback</button>
          </form>
        )}
      </div>
    </div>
  );
}