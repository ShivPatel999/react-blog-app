import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 12));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Unable to load posts. Please check your connection and try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="status-container">
        <div className="loading-spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container">
        <div className="error-card">{error}</div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <h1 className="page-heading">Recent Blog Articles</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <article key={post.id} className="post-summary-card">
            <h2>{post.title}</h2>
            <p className="post-excerpt">
              {post.body.substring(0, 100)}...
            </p>
            <Link to={`/post/${post.id}`} className="read-more-btn">
              Read Full Post &rarr;
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}