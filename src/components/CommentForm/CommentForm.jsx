import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function CommentForm({ onAddComment }) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const [formError, setFormError] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="login-prompt-box">
        <p>You must be logged in to leave a comment.</p>
        <Link to="/login" className="cta-primary-btn">
          Log in to Comment
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      setFormError("Please enter a comment before submitting.");
      return;
    }

    setFormError("");
    onAddComment({
      name: user.username,
      body: commentText.trim()
    });

    setCommentText("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3>Leave a Comment</h3>
      <p className="commenting-as">
        Posting as <strong>{user.username}</strong>
      </p>

      {formError && <div className="error-banner">{formError}</div>}

      <div className="form-group">
        <label htmlFor="commenter-text">Comment</label>
        <textarea
          id="commenter-text"
          rows="3"
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </div>

      <button type="submit" className="submit-btn">
        Submit Comment
      </button>
    </form>
  );
}