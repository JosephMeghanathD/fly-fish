// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import './Home.css';
const Home = () => {
  const categories = [
    {
      name: 'Living Art Terrariums',
      image: process.env.PUBLIC_URL + '/terrariums/terra1.jpg',
      link: '/terrariums',
      desc: 'Self-sustaining miniature ecosystems'
    },
    {
      name: 'Nature-Inspired Apparel',
      image: process.env.PUBLIC_URL + '/apparel/apparel1.jpg',
      link: '/apparel',
      desc: 'Organic cotton sustainable fashion'
    },
    {
      name: 'Artisan Figurines',
      image: process.env.PUBLIC_URL + '/figure/figure1.jpg',
      link: '/figures',
      desc: 'Handcrafted decorative sculptures'
    },
    {
      name: 'Botanical Paintings',
      image: process.env.PUBLIC_URL + '/paint/paint1.jpg',
      link: '/paintings',
      desc: 'Nature-themed canvas artwork'
    },
    {
      name: 'Eco Interior Design',
      image: process.env.PUBLIC_URL + '/terrariums/terra2.png',
      link: '/interior',
      desc: 'Sustainable home solutions'
    },
    {
      name: 'Contact & Custom Orders',
      image: process.env.PUBLIC_URL + '/figure/figure2.jpg',
      link: '/contact',
      desc: 'Personalized design services'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), 
                      url(${process.env.PUBLIC_URL}/terrariums/terra6.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-content">
          <h1 className="main-heading">Where Nature Meets Craft</h1>
          <p className="sub-heading">Curated collections for mindful living spaces</p>
          <Link to="/terrariums" className="cta-button">
            Explore Collections
          </Link>
        </div>
      </section>

      {/* Category Grid */}
      <section className="grid-section">
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link to={category.link} key={index} className="grid-card">
              <div className="grid-image-container">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="grid-image"
                  loading="lazy"
                />
              </div>
              <div className="grid-overlay">
                <div className="grid-text">
                  <h3 className="grid-title">{category.name}</h3>
                  <p className="grid-desc">{category.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact Footer */}
      <section className="contact-footer">
        <h2 className="footer-heading">Contact Us</h2>
        <div className="footer-icons">
          <a href="tel:+19132088818" aria-label="Phone">
            <FaPhoneAlt className="footer-icon" />
          </a>
          <a href="https://www.linkedin.com/in/joseph-meghanath-9880ba149/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="footer-icon" />
          </a>
          <a href="https://github.com/JoeHitHardcom" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaGithub className="footer-icon" />
          </a>
          <a href="mailto:josephmeghanath@gmail.com" aria-label="Email">
            <MdAlternateEmail className="footer-icon" />
          </a>
        </div>
        <p className="contact-info">
          FLY FISH © {new Date().getFullYear()} | Crafting Nature-Inspired Spaces
        </p>
      </section>
    </div>
  );
};

export default Home;