import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import '../components/Products.css';

// terrariumProducts data remains the same...
const terrariumProducts = [
    { id: 'terra-001', image: 'https://picsum.photos/seed/terra-001/300/300', title: 'Classic Moss Terrarium', price: '3500.00', discountPrice: '2999.00', description: 'A beautiful closed terrarium featuring lush mosses and small ferns. Low maintenance.', createdBy: 'FlyFish Gardens', tags: ['Closed Terrarium', 'Moss', 'Low Maintenance'], },
    { id: 'terra-002', image: 'https://picsum.photos/seed/terra-002/300/300', title: 'Geometric Succulent Bowl', price: '4200.00', discountPrice: null, description: 'Open terrarium arrangement with assorted succulents in a stylish geometric glass bowl.', createdBy: 'Urban Ecosystems', tags: ['Open Terrarium', 'Succulent', 'Geometric'], },
    { id: 'terra-003', image: 'https://picsum.photos/seed/terra-003/300/300', title: 'Hanging Air Plant Globe', price: '2800.00', discountPrice: null, description: 'Elegant hanging glass globe featuring a Tillandsia air plant and decorative sand.', createdBy: 'FlyFish Gardens', tags: ['Hanging', 'Air Plant', 'Minimalist'], },
    { id: 'terra-004', image: 'https://picsum.photos/seed/terra-004/300/300', title: 'Forest Floor Jar', price: '3800.00', discountPrice: '3450.00', description: 'A miniature forest scene captured in a large jar, with moss, rocks, and small plants.', createdBy: 'Nature\'s Miniature', tags: ['Closed Terrarium', 'Forest', 'Large'], },
    { id: 'terra-005', image: 'https://picsum.photos/seed/terra-005/300/300', title: 'Desert Scape Terrarium', price: '4500.00', discountPrice: null, description: 'Open terrarium mimicking a desert landscape with cacti, succulents, and sand.', createdBy: 'Urban Ecosystems', tags: ['Open Terrarium', 'Cacti', 'Desert'], },
    { id: 'terra-006', image: 'https://picsum.photos/seed/terra-006/300/300', title: 'Waterfall Terrarium Kit', price: '5500.00', discountPrice: '4999.00', description: 'DIY kit to build your own closed terrarium with a miniature waterfall feature (pump not included).', createdBy: 'FlyFish Gardens', tags: ['DIY Kit', 'Closed Terrarium', 'Feature'], }
];


function Terrariums() {
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
  const pageDescription = "Discover the magic of miniature ecosystems with our handcrafted terrariums. Choose from closed, self-sustaining environments or open designs featuring succulents and air plants. Perfect for adding a touch of green to any space.";

  return (
    <main className="product-page-container" aria-labelledby="page-title">
      <header className="product-page-header animate-slide-down">
        <div className="header-content"> <h1 id="page-title">Living Art Terrariums</h1> <p className="page-subtitle">Miniature worlds, delivered to you.</p> </div>
        <button className="info-toggle-button" onClick={handleToggleInfo} aria-expanded={showInfo} aria-controls="page-info-content">
           <span>{showInfo ? 'Hide Info' : 'More Info'}</span> <img src={process.env.PUBLIC_URL + '/logo/logo.png'} alt="" aria-hidden="true" className={`info-toggle-logo ${showInfo ? 'expanded' : ''}`} />
        </button>
      </header>

      <div id="page-info-content" className={`page-info-message ${showInfo ? 'expanded' : 'collapsed'}`} aria-live="polite" aria-hidden={!showInfo} >
        <div className="page-info-content-inner"> <p>{pageDescription}</p> </div>
      </div>

      {/* REMOVED role="region" from this section */}
      <section className="product-grid-container" aria-label="Terrarium Products">
        <div ref={productListRef} className="product-list">
          {terrariumProducts.map((product, index) => (
            <div key={product.id} className="product-card-animation-target" style={{ '--stagger-delay': `${index * 0.08}s` }} >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Terrariums;
