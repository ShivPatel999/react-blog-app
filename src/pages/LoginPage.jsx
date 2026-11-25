import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both a username and password.");
      return;
    }
    if (password.trim().length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }
    setError("");
    login(username.trim());
    navigate("/posts");
  };

  return (
    <div className="auth-card">
      <h1>Welcome Back</h1>
      <p className="auth-subtitle">Sign in to read articles and join the discussion.</p>

      {error && <div className="error-banner">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-username">Username</label>
          <input
            id="login-username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn full-width-btn">
          Login
        </button>
      </form>
    </div>
  );
}