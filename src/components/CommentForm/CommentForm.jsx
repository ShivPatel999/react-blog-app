import { useState } from "react";

export default function CommentForm({ onAddComment, isSubmitting }) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !body.trim()) {
      setValidationError("Please fill out both your name and comment before submitting.");
      return;
    }

    setValidationError("");
    onAddComment({
      name: name.trim(),
      body: body.trim(),
    });

    setName("");
    setBody("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3>Leave a Comment</h3>
      
      {validationError && (
        <div className="form-error-msg">{validationError}</div>
      )}

      <div className="form-group">
        <label htmlFor="commenter-name">Name</label>
        <input
          id="commenter-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="commenter-body">Comment</label>
        <textarea
          id="commenter-body"
          rows="3"
          placeholder="Write your comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Submit Comment"}
      </button>
    </form>
  );
}