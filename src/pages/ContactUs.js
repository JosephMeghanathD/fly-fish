import React from 'react';
import '../components/Products.css'; // Reusing styles for page structure
import './ContactUs.css'; // Specific styles for this page

function ContactUs() {
  // The story behind FlyFish
  const story = `
    FlyFish began not just as a business, but as a quiet conversation between nature and craft. It started with Vikaram, finding solace in the intricate patterns of a mossy forest floor and the patient energy of handcrafted objects. There was a simple desire: to bring that feeling of grounded wonder, found where the natural world meets human creativity, into everyday spaces.

    Each terrarium built, each design chosen, carries a piece of that initial inspiration – the belief that surrounding ourselves with elements of nature, thoughtfully crafted, can reconnect us to something essential. It's about more than just decor; it's about cultivating mindful moments and appreciating the delicate balance in both ecosystems and art.

    We're still driven by that same passion, exploring new ways to blend sustainable practices with aesthetic beauty. Whether you have a question about our pieces, an idea for a custom creation, or simply want to share your own connection to nature and craft, we'd love to hear from you.
  `;

  // Split story into paragraphs for rendering
  const storyParagraphs = story.trim().split('\n\n');

  return (
    // Reuse the main container class for consistent padding/max-width
    <main className="product-page-container" aria-labelledby="page-title">

      {/* Reuse the header structure */}
      <header className="product-page-header">
        <div className="header-content">
           <h1 id="page-title">Our Story & Contact</h1>
           <p className="page-subtitle">Connecting through nature and craft.</p>
        </div>
        {/* No toggle button needed here */}
      </header>

      {/* Content Section */}
      <section className="contact-content">
        <div className="story-section">
          {storyParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="contact-details-section">
          <h2>Get in Touch</h2>
          <p>
            FlyFish is personally curated and managed by Vikaram D. For any inquiries, collaborations, or custom requests, please reach out directly:
          </p>
          <div className="contact-info">
            <p className="contact-name">
              <strong>Vikaram D</strong>
            </p>
            <p className="contact-email">
              <a href="mailto:viki4dj@gmail.com">viki4dj@gmail.com</a>
            </p>
          </div>
           <p className="contact-note">
            We aim to respond to all emails within 48 business hours.
           </p>
        </div>
      </section>

    </main>
  );
}

export default ContactUs;
