import { useState } from 'react';

export default function BlogPost({ post }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <article className="blog-post">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-content">{post.content}</p>

      <div className="post-meta">
        <p><strong>Author:</strong> {post.author}</p>
        <p><strong>Date:</strong> {post.date}</p>
      </div>

      <div className="like-wrapper">
        <button
          type="button"
          onClick={toggleLike}
          className={`like-button ${isLiked ? 'active' : ''}`}
        >
          {isLiked ? '❤️ Liked' : '🤍 Like'} ({likes})
        </button>
      </div>
    </article>
  );
}