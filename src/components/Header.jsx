import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ isLogin, logedUser, projects = [], onProjectSelect, showSearch = true }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const userName = logedUser;

  const handleLogout = () => {
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
    setShowDropdown(false);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setSearchResults([]);
    } else {
      const results = projects.filter((project) =>
        project.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleProjectClick = (project) => {
    if (onProjectSelect) {
      onProjectSelect(project);
    }
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo">
            <h1>ProjectFlow.com</h1>
          </div>
        </div>

        {/* Navigation */}
        {!isLogin && (
          <nav className="nav-links">
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
            <Link to="/help">Help</Link>
          </nav>
        )}

        {isLogin && (
          <div className="header-actions">
            {/* Search Bar - Only show if showSearch is true */}
            {showSearch && (
              <div className="search-bar-container">
                <input
                  type="text"
                  placeholder="🔍 Search projects..."
                  className="search-bar"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {searchResults.length > 0 && (
                  <div className="search-dropdown">
                    {searchResults.map((project) => (
                      <div
                        key={project.id}
                        className="search-item"
                        onClick={() => handleProjectClick(project)}
                      >
                        📁 {project.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="user-profile-container">
              <div className="welcome-text">
                <strong>{userName}</strong>
              </div>

              <div
                className="user-profile"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                  alt="User"
                />
              </div>

              {showDropdown && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleSettings}>
                    ⚙️ Settings
                  </button>
                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}