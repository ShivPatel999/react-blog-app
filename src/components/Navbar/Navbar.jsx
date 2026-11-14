import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">My Blog</Link>
        <nav className="navbar-links">
          <Link to="/">Blog Posts</Link>
          <Link to="/post/1">Featured Post</Link>
          <Link to="/contact">Contact</Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </nav>
      </div>
    </header>
  );
}