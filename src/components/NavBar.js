import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink, removed unused Link
import './NavBar.css';
import ProductCard from './ProductCard';

// Icons
import * as Icons from "react-icons/md";
import * as Fa6Icons from "react-icons/fa6";
import * as FaIcons from "react-icons/fa";
import { GiHoodedFigure } from "react-icons/gi";
import { TbHomeEco } from "react-icons/tb";

// Original discount products data
const originalDiscountProducts = [
    { id: 'discount-terra-001', image: 'https://picsum.photos/seed/discount-terra-001/150/150', title: 'Moss Terrarium', price: '3500.00', discountPrice: '2999.00', description: 'Lush moss & ferns.' }, // Added short desc
    { id: 'discount-apparel-001', image: 'https://picsum.photos/seed/discount-apparel-001/150/150', title: 'Organic Fish Tee', price: '1200.00', discountPrice: '999.00', description: '100% Organic Cotton.' },
    { id: 'discount-fig-001', image: 'https://picsum.photos/seed/discount-fig-001/150/150', title: 'Meditating Frog', price: '1500.00', discountPrice: '1299.00', description: 'Peaceful resin frog.' },
    { id: 'discount-paint-001', image: 'https://picsum.photos/seed/discount-paint-001/150/150', title: 'Leaf Study', price: '4500.00', discountPrice: '3999.00', description: 'Detailed acrylic leaf.' }
];

// Constants
const SCROLL_INTERVAL = 5000;
const ITEM_SCROLL_WIDTH = 214; // Width (198px) + Gap (1rem = 16px)

const Sidebar = () => {
    const [email, setEmail] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const intervalRef = useRef(null);
    const listContainerRef = useRef(null);

    const displayProducts = [...originalDiscountProducts, originalDiscountProducts[0]];

    // --- Carousel Logic (remains the same) ---
    const nextSlide = useCallback(() => { if (!isJumping) setCurrentIndex(prev => prev + 1); }, [isJumping]);
    const stopScrollInterval = useCallback(() => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } }, []);
    const startScrollInterval = useCallback(() => { stopScrollInterval(); intervalRef.current = setInterval(nextSlide, SCROLL_INTERVAL); }, [nextSlide, stopScrollInterval]);

    useEffect(() => {
        if (currentIndex === displayProducts.length - 1) {
            setIsJumping(true);
            const jumpTimeout = setTimeout(() => {
                setCurrentIndex(0);
                const transitionTimeout = setTimeout(() => setIsJumping(false), 50);
                 return () => clearTimeout(transitionTimeout);
            }, 600); // Match CSS transition duration
            return () => clearTimeout(jumpTimeout);
        }
    }, [currentIndex, displayProducts.length]);

    useEffect(() => {
        startScrollInterval();
        const currentListContainer = listContainerRef.current;
        if (currentListContainer) {
            currentListContainer.addEventListener('mouseenter', stopScrollInterval);
            currentListContainer.addEventListener('mouseleave', startScrollInterval);
        }
        return () => {
            stopScrollInterval();
            if (currentListContainer) {
                currentListContainer.removeEventListener('mouseenter', stopScrollInterval);
                currentListContainer.removeEventListener('mouseleave', startScrollInterval);
            }
        };
    }, [startScrollInterval, stopScrollInterval]);
    // --- End Carousel Logic ---

    const handleDotClick = (index) => {
        if (index === currentIndex % originalDiscountProducts.length) return;
        stopScrollInterval();
        setIsJumping(false);
        setCurrentIndex(index);
    };

    const handleNewsletterSubmit = (event) => {
        event.preventDefault();
        if (email && email.includes('@')) { alert(`Thank you for subscribing with ${email}!`); setEmail(''); }
        else { alert('Please enter a valid email address.'); }
    };

    const scrollOffset = -currentIndex * ITEM_SCROLL_WIDTH;
    const logicalIndex = currentIndex % originalDiscountProducts.length;

    return (
        <aside className="sidebar">
            <div className="sidebar-content-wrapper">

                <section ref={listContainerRef} className="discount-section" aria-labelledby="discount-heading">
                    <h3 id="discount-heading" className="sidebar-section-title">Latest Discounts</h3>
                    <div className="discount-carousel-container">
                        <div
                            className={`discount-products-list-inner ${isJumping ? 'no-transition' : ''}`}
                            style={{ transform: `translateX(${scrollOffset}px)` }}
                        >
                            {displayProducts.map((product, index) => (
                                <div key={`${product.id}-${index}`} className="sidebar-product-card-wrapper">
                                    <ProductCard
                                        id={product.id}
                                        image={product.image}
                                        title={product.title}
                                        price={product.price}
                                        discountPrice={product.discountPrice}
                                        description={product.description} // Pass description
                                        variant="sidebar-vertical" // New variant name
                                        />
                                </div>
                            ))}
                        </div>
                        <div className="carousel-dots">
                            {originalDiscountProducts.map((_, index) => (
                                <button key={index} className={`dot ${index === logicalIndex ? 'active' : ''}`} onClick={() => handleDotClick(index)} aria-label={`Go to item ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                </section>

                 {/* Middle Section (Branding + Nav) */}
                 <div className="sidebar-middle-section">
                    <div className="sidebar-branding">
                        <img className='sidebar-logo' src={process.env.PUBLIC_URL + '/logo/logo.png'} alt="Fly Fish Logo" />
                        <h1>fLY fISH</h1>
                    </div>
                    <nav className="sidebar-nav" aria-label="Main navigation">
                        <ul>
                            {/* NavLinks... */}
                            <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}><Icons.MdHome /><span>Home</span></NavLink></li>
                            <li><NavLink to="/terrariums" className={({ isActive }) => isActive ? 'active-link' : ''}><Fa6Icons.FaFish /><span>Terrariums</span></NavLink></li>
                            <li><NavLink to="/apparel" className={({ isActive }) => isActive ? 'active-link' : ''}><FaIcons.FaTshirt /><span>Apparel</span></NavLink></li>
                            <li><NavLink to="/figures" className={({ isActive }) => isActive ? 'active-link' : ''}><GiHoodedFigure /><span>Figurines</span></NavLink></li>
                            <li><NavLink to="/paintings" className={({ isActive }) => isActive ? 'active-link' : ''}><FaIcons.FaPaintBrush /><span>Paintings</span></NavLink></li>
                            <li><NavLink to="/interior" className={({ isActive }) => isActive ? 'active-link' : ''}><TbHomeEco /><span>Interior</span></NavLink></li>
                            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active-link' : ''}><Icons.MdOutlineMail /><span>Contact Us</span></NavLink></li>
                        </ul>
                    </nav>
                </div>

                {/* Newsletter Section */}
                <section className="newsletter-section" aria-labelledby="newsletter-heading">
                    <h3 id="newsletter-heading" className="sidebar-section-title">Join Our Newsletter</h3>
                    <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                        <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                        <input type="email" id="newsletter-email" className="newsletter-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <button type="submit" className="newsletter-button">Subscribe</button>
                    </form>
                </section>
            </div>
        </aside>
    );
};

export default Sidebar;
