import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">My Blog</Link>
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/posts">Blog Posts</Link>
          <Link to="/contact">Contact</Link>

          {isAuthenticated ? (
            <>
              <span className="nav-user-badge">Hi, {user.username}</span>
              <button type="button" onClick={handleLogout} className="auth-nav-btn logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="auth-nav-btn login-link-btn">
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </nav>
      </div>
    </header>
  );
}