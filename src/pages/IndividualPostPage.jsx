import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentForm from "../components/CommentForm/CommentForm";

export default function IndividualPostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [postError, setPostError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    setPostError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((postData) => {
        setPost(postData);

        fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((userData) => setAuthor(userData))
          .catch((err) => console.error("Error fetching author:", err));

        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load comments");
        return res.json();
      })
      .then((commentsData) => {
        setComments(commentsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading post data:", err);
        setPostError("Failed to load post details. Please try again.");
        setLoading(false);
      });
  }, [id]);

  const handleAddComment = (newCommentData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: parseInt(id, 10),
        name: newCommentData.name,
        body: newCommentData.body,
        email: "guest@user.com",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to post comment to server");
        }
        return res.json();
      })
      .then((createdComment) => {
        setComments((prev) => [
          ...prev,
          {
            id: createdComment.id || Date.now(),
            name: newCommentData.name,
            body: newCommentData.body,
          },
        ]);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 4000);
      })
      .catch((err) => {
        console.error("Error posting comment:", err);
        setSubmitError("Failed to submit comment. Please try again.");
        setIsSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div className="status-container">
        <div className="loading-spinner"></div>
        <p>Loading post details...</p>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="status-container">
        <div className="error-card">{postError || "Article not found."}</div>
        <Link to="/" className="back-link">&larr; Return to All Posts</Link>
      </div>
    );
  }

  return (
    <div className="individual-post-wrapper">
      <Link to="/" className="back-link">&larr; Back to Blog Posts</Link>

      <article className="post-detail-card">
        <h1 className="post-detail-title">{post.title}</h1>

        <div className="author-card-meta">
          <p>
            <strong>Author:</strong> {author ? author.name : "Loading author..."}
          </p>
          {author && (
            <p>
              <strong>Email:</strong> <a href={`mailto:${author.email}`}>{author.email}</a>
            </p>
          )}
        </div>

        <div className="post-detail-content">
          <p>{post.body}</p>
        </div>
      </article>

      <section className="comments-section-wrapper">
        <CommentForm onAddComment={handleAddComment} isSubmitting={isSubmitting} />

        {submitSuccess && (
          <div className="comment-alert success">Comment posted successfully!</div>
        )}
        {submitError && (
          <div className="comment-alert error">{submitError}</div>
        )}

        <div className="comments-display-area">
          <h3>Comments ({comments.length})</h3>

          {comments.length === 0 ? (
            <p className="no-comments-msg">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <ul className="comments-list">
              {comments.map((item) => (
                <li key={item.id} className="comment-bubble">
                  <span className="comment-author">{item.name}</span>
                  <p className="comment-text">{item.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}