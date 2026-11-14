import { useState } from 'react';

export default function CommentSection() {
  const [comments, setComments] = useState([
    'Comment 1',
    'Comment 2',
    'Comment 3',
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setComments((prev) => [...prev, inputVal.trim()]);
    setInputVal('');
  };

  return (
    <section className="comment-section">
      <h2 className="comments-heading">Comments</h2>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      <div className="comments-display">
        <h3>Existing Comments:</h3>
        <ul className="comments-list">
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}