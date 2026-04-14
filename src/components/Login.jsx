import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = e.target.userId.value;
    const password = e.target.password.value;

    // Basic validation
    if (!userId || !password) {
      alert("Please fill in all fields");
      return;
     }

    // // User ID validation (ensure it's a number)
    // if (isNaN(  userId)) {
    //   alert("Please enter a valid User ID");
    //   return;
    // }

    // Pass logged user ID to Dashboard
    navigate("/dashboard", { state: { userId: userId } });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>
        <Link to="/" className="home-link">
          Go to Home
        </Link>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="userId" 
            placeholder="User ID" 
            required 
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}