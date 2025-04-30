import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import '../components/Products.css';

// figurineProducts data remains the same...
const figurineProducts = [
    { id: 'fig-001', image: 'https://picsum.photos/seed/fig-001/300/300', title: 'Meditating Frog Figurine', price: '1500.00', discountPrice: '1299.00', description: 'Hand-painted resin frog statue in a peaceful meditation pose. Adds zen to any space.', createdBy: 'Artisan Crafts', tags: ['Figurine', 'Resin', 'Zen', 'Animal'], },
    { id: 'fig-002', image: 'https://picsum.photos/seed/fig-002/300/300', title: 'Ceramic Bird Set (Pair)', price: '1800.00', discountPrice: null, description: 'Set of two elegant ceramic birds with a glossy finish. Perfect for shelves or mantels.', createdBy: 'Clay Creations', tags: ['Figurine', 'Ceramic', 'Bird', 'Set'], },
    { id: 'fig-003', image: 'https://picsum.photos/seed/fig-003/300/300', title: 'Abstract Wooden Sculpture', price: '3200.00', discountPrice: null, description: 'Unique abstract figurine hand-carved from sustainable wood. A conversation starter.', createdBy: 'WoodArtistry', tags: ['Sculpture', 'Wood', 'Abstract', 'Handmade'], },
    { id: 'fig-004', image: 'https://picsum.photos/seed/fig-004/300/300', title: 'Miniature Terrarium Fox', price: '950.00', discountPrice: null, description: 'Tiny, detailed fox figurine designed to be placed inside terrariums or fairy gardens.', createdBy: 'FlyFish Gardens', tags: ['Miniature', 'Resin', 'Animal', 'Terrarium Accessory'], },
    { id: 'fig-005', image: 'https://picsum.photos/seed/fig-005/300/300', title: 'Sleeping Cat Statue', price: '1600.00', discountPrice: '1450.00', description: 'Adorable sleeping cat figurine made from durable polyresin. Weather-resistant for outdoor use.', createdBy: 'Artisan Crafts', tags: ['Figurine', 'Resin', 'Animal', 'Garden'], },
    { id: 'fig-006', image: 'https://picsum.photos/seed/fig-006/300/300', title: 'Geometric Metal Deer', price: '2900.00', discountPrice: null, description: 'Modern geometric deer sculpture crafted from metal wire. Adds a contemporary touch.', createdBy: 'MetalWorks Inc.', tags: ['Sculpture', 'Metal', 'Geometric', 'Animal'], }
];


function Figures() {
  const [showInfo, setShowInfo] = useState(false);
  const productListRef = useRef(null);

  // --- Animation Logic (Same as other product pages) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); },
      { threshold: 0.1, }
    );
    const currentProductList = productListRef.current;
    let cards = [];
    if (currentProductList) { cards = currentProductList.querySelectorAll('.product-card-animation-target'); cards.forEach((card) => observer.observe(card)); }
    return () => { cards.forEach((card) => { if (observer) observer.unobserve(card); }); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array is correct

  const handleToggleInfo = () => { setShowInfo(prevShowInfo => !prevShowInfo); };
  const pageDescription = "Add personality and charm to your home or garden with our collection of unique figurines and sculptures. Handcrafted from various materials like resin, ceramic, wood, and metal, these pieces bring artistry to any setting.";

  return (
    <main className="product-page-container" aria-labelledby="page-title">
      <header className="product-page-header animate-slide-down">
        <div className="header-content"> <h1 id="page-title">Artisan Figurines</h1> <p className="page-subtitle">Small details, big impact.</p> </div>
        <button className="info-toggle-button" onClick={handleToggleInfo} aria-expanded={showInfo} aria-controls="page-info-content">
           <span>{showInfo ? 'Hide Info' : 'More Info'}</span> <img src={process.env.PUBLIC_URL + '/logo/logo.png'} alt="" aria-hidden="true" className={`info-toggle-logo ${showInfo ? 'expanded' : ''}`} />
        </button>
      </header>

      {/* This div is fine */}
      <div id="page-info-content" className={`page-info-message ${showInfo ? 'expanded' : 'collapsed'}`} aria-live="polite" aria-hidden={!showInfo} >
        <div className="page-info-content-inner"> <p>{pageDescription}</p> </div>
      </div>

      {/* REMOVED role="region" from this section */}
      <section className="product-grid-container" aria-label="Figurine Products">
        <div ref={productListRef} className="product-list">
          {figurineProducts.map((product, index) => (
            <div key={product.id} className="product-card-animation-target" style={{ '--stagger-delay': `${index * 0.08}s` }} >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Figures;