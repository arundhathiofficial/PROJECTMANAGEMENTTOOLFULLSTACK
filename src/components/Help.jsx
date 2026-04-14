import { Link } from "react-router-dom";
import "./Help.css";

export default function Help() {
  return (
    <div className="help-container">
      <div className="help-card">
        <h2>Help Center</h2>
        <p>Welcome to ProjectFlow support. Here are some common questions.</p>

        <div className="faq">
          <h3>How do I create a project?</h3>
          <p>
            Click the "New Project" button in the header and fill the project
            details.
          </p>
        </div>

        <div className="faq">
          <h3>How can I search for projects?</h3>
          <p>Use the search bar in the header to find projects quickly.</p>
        </div>

        <div className="faq">
          <h3>How do I contact support?</h3>
          <p>Email us at support@projectflow.com</p>
        </div>

        <div className="faq">
          <h3>Forgot password?</h3>
          <p>Go to the login page and click "Forgot Password".</p>
        </div>

        {/* Go Home Button */}
        <div className="home-btn-container">
          <Link to="/" className="home-btn">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
