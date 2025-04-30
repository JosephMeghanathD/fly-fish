import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa"; // Updated Icons
import './Home.css';

// Placeholder for Featured Products using picsum
const featuredProductsData = [
  {
    id: 'feat-terra-001',
    name: 'Classic Moss Terrarium',
    // Use ID as seed, landscape ratio for featured
    image: 'https://picsum.photos/seed/feat-terra-001/400/300',
    link: '/terrariums',
    price: '₹2,999.00'
  },
  {
    id: 'feat-apparel-001',
    name: 'Organic Fish Tee',
    image: 'https://picsum.photos/seed/feat-apparel-001/400/300',
    link: '/apparel',
    price: '₹999.00'
  },
  {
    id: 'feat-fig-001',
    name: 'Meditating Frog',
    image: 'https://picsum.photos/seed/feat-fig-001/400/300',
    link: '/figures',
    price: '₹1,299.00'
  },
  {
    id: 'feat-paint-001',
    name: 'Monstera Leaf Study',
    image: 'https://picsum.photos/seed/feat-paint-001/400/300',
    link: '/paintings',
    price: '₹3,999.00'
  }
];

// Categories using picsum
const categories = [
  { name: 'Living Art Terrariums', imageSeed: 'cat-terrariums', link: '/terrariums', desc: 'Self-sustaining miniature ecosystems' },
  { name: 'Nature-Inspired Apparel', imageSeed: 'cat-apparel', link: '/apparel', desc: 'Organic cotton sustainable fashion' },
  { name: 'Artisan Figurines', imageSeed: 'cat-figures', link: '/figures', desc: 'Handcrafted decorative sculptures' },
  { name: 'Botanical Paintings', imageSeed: 'cat-paintings', link: '/paintings', desc: 'Nature-themed canvas artwork' },
  { name: 'Eco Interior Design', imageSeed: 'cat-interior', link: '/interior', desc: 'Sustainable home solutions' },
  { name: 'Contact & Custom Orders', imageSeed: 'cat-contact', link: '/contact', desc: 'Personalized design services' }
];


const Home = () => {
  // State and Effects for animations (remain the same)
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const featuredRef = useRef(null);
  const gridRef = useRef(null);
  const contactRef = useRef(null);

  const addVisibleClass = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };

  useEffect(() => {
    const heroTimer = setTimeout(() => setIsHeroVisible(true), 100);
    const options = { threshold: 0.1 };
    const observer = new IntersectionObserver(addVisibleClass, options);
    if (featuredRef.current) observer.observe(featuredRef.current);
    if (gridRef.current) observer.observe(gridRef.current);
    if (contactRef.current) observer.observe(contactRef.current);
    return () => {
        clearTimeout(heroTimer);
        if (featuredRef.current) observer.unobserve(featuredRef.current);
        if (gridRef.current) observer.unobserve(gridRef.current);
        if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);


  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Hero background image is set in CSS, leave as is or change CSS path */}
        <div className={`hero-content ${isHeroVisible ? 'visible' : ''}`}>
          <h1 className="main-heading animate-fade-in-up delay-1">Where Nature Meets Craft</h1>
          <p className="sub-heading animate-fade-in-up delay-2">Curated collections for mindful living spaces</p>
          <Link to="/terrariums" className="cta-button animate-fade-in-up delay-3">
            Explore Collections
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section ref={featuredRef} className="featured-section section-padding animate-reveal">
        <h2 className="section-title">Featured Finds</h2>
        <div className="featured-products-container">
          {featuredProductsData.map((product, index) => (
            <Link to={product.link} key={product.id} className={`featured-card animate-slide-up delay-${index + 1}`}>
              <div className="featured-card-image-wrapper">
                {/* Use picsum URL */}
                <img src={product.image} alt={product.name} loading="lazy" className="featured-card-image"/>
              </div>
              <div className="featured-card-info">
                <h3 className="featured-card-name">{product.name}</h3>
                <p className="featured-card-price">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* Category Grid Section */}
      <section ref={gridRef} className="grid-section section-padding animate-reveal">
         <h2 className="section-title">Explore Categories</h2>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link to={category.link} key={category.imageSeed} className="grid-card animate-fade-in-up" style={{ '--delay': `${index * 0.1}s` }}>
              <div className="grid-image-container">
                {/* Generate picsum URL for categories - square aspect ratio */}
                <img
                  src={`https://picsum.photos/seed/${category.imageSeed}/400/400`}
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

      {/* Contact Footer Section */}
      <section ref={contactRef} className="contact-footer section-padding animate-reveal">
        <h2 className="footer-heading">Connect With Us</h2>
        <div className="footer-icons">
          <a href="tel:+1234567890" aria-label="Phone" className="footer-icon-link animate-fade-in-up delay-1">
            <FaPhoneAlt className="footer-icon" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-icon-link animate-fade-in-up delay-2">
            <FaFacebook className="footer-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-icon-link animate-fade-in-up delay-3">
            <FaInstagram className="footer-icon" />
          </a>
          <a href="mailto:viki4dj@gmail.com" aria-label="Email" className="footer-icon-link animate-fade-in-up delay-4">
            <FaEnvelope className="footer-icon" />
          </a>
        </div>
        <p className="contact-info animate-fade-in-up delay-5">
          FLY FISH © {new Date().getFullYear()} | Crafting Nature-Inspired Spaces
        </p>
      </section>
    </div>
  );
};

export default Home;