import './contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-heading">Get In Touch</h1>
      <p className="contact-subheading">Wed love to hear from you! Fill out the form below to contact us.</p>

      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" id="name" name="name" className="form-input" placeholder="Your Name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" id="email" name="email" className="form-input" placeholder="Your Email" required />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Your Message</label>
          <textarea id="message" name="message" className="form-input" placeholder="Your Message" rows="5" required></textarea>
        </div>

        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div>
  );
}
