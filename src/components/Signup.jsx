import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Basic validation
    if (!fullName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Full name validation (at least 2 characters)
    if (fullName.trim().length < 2) {
      alert("Please enter a valid full name");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // For demo purposes, accept the signup and redirect to login
    // In a real app, you'd send this data to a backend
    alert("Account created successfully! Please sign in.");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <Link to="/" className="home-link">
          Go to Home
        </Link>

        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <p>
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
}
