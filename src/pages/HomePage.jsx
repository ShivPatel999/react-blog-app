import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className="landing-container">
      <section className="hero-banner">
        <span className="hero-badge">React Community Blog</span>
        <h1>
          {isAuthenticated
            ? `Welcome back, ${user.username}!`
            : "Discover Ideas, Stories, and Tech Insights"}
        </h1>
        <p className="hero-description">
          A modern, full-featured blogging platform built with React. Explore articles from diverse authors, switch seamlessly between light and dark themes, and share your thoughts with the community.
        </p>

        <div className="hero-cta-group">
          <Link to="/posts" className="cta-primary-btn">
            Explore Blog
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" className="cta-secondary-btn">
              Login
            </Link>
          ) : (
            <Link to="/post/1" className="cta-secondary-btn">
              Featured Article
            </Link>
          )}
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-box">
          <h3>Dynamic Articles</h3>
          <p>Browse live posts fetched dynamically with detailed author profiles and instant routing.</p>
        </div>
        <div className="feature-box">
          <h3>Interactive Discussions</h3>
          <p>Sign in with your account to leave comments and engage with writers across every post.</p>
        </div>
        <div className="feature-box">
          <h3>Adaptive Themes</h3>
          <p>Switch between crisp light mode and comfortable dark mode with persistent preferences.</p>
        </div>
      </section>
    </div>
  );
}