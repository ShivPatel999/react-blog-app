import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page-card">
      <h1>Contact Us</h1>
      <p>Have questions or feedback? Send us a message below.</p>

      {submitted && (
        <div className="success-banner">
          Thank you! Your message has been received (Form Demo Only).
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            rows="4"
            placeholder="Your message..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>
    </div>
  );
}