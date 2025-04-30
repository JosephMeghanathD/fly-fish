import React, { useState, useEffect, useRef } from 'react'; // Import useEffect, useRef
import ProductCard from '../components/ProductCard';
import '../components/Products.css'; // Shared styles for product page layout

// Define figurine product data using picsum (data remains the same)
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
  const productListRef = useRef(null); // Ref for the list container

  // --- Animation Logic (Same as Terrariums.js) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
             observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const currentProductList = productListRef.current;
    if (currentProductList) {
        const cards = currentProductList.querySelectorAll('.product-card-animation-target');
        cards.forEach((card) => observer.observe(card));
    }

    return () => {
        if (currentProductList) {
            const cards = currentProductList.querySelectorAll('.product-card-animation-target');
             // Ensure observer exists before trying to unobserve
             if (observer) {
                 cards.forEach((card) => {
                    // Check if observer is still tracking before unobserving
                    if (observer.takeRecords().find(record => record.target === card)) {
                       observer.unobserve(card);
                    }
                 });
             }
        }
    };
  }, [figurineProducts]); // Dependency on products array
  // --- End Animation Logic ---

  const handleToggleInfo = () => {
    setShowInfo(prevShowInfo => !prevShowInfo);
  };

  const pageDescription = "Add personality and charm to your home or garden with our collection of unique figurines and sculptures. Handcrafted from various materials like resin, ceramic, wood, and metal, these pieces bring artistry to any setting.";

  return (
    <main className="product-page-container" aria-labelledby="page-title">
      {/* Apply animation class to header */}
      <header className="product-page-header animate-slide-down">
        <div className="header-content">
           <h1 id="page-title">Artisan Figurines</h1>
           <p className="page-subtitle">Small details, big impact.</p>
        </div>
        <button
            className="info-toggle-button"
            onClick={handleToggleInfo}
            aria-expanded={showInfo}
            aria-controls="page-info-content"
        >
           <span>{showInfo ? 'Hide Info' : 'More Info'}</span>
           <img
             src={process.env.PUBLIC_URL + '/logo/logo.png'}
             alt=""
             aria-hidden="true"
             className={`info-toggle-logo ${showInfo ? 'expanded' : ''}`}
           />
        </button>
      </header>

      {/* Use transition classes for info section */}
      <section
        id="page-info-content"
        className={`page-info-message ${showInfo ? 'expanded' : 'collapsed'}`}
        role="region"
        aria-live="polite"
        aria-hidden={!showInfo}
      >
        <div className="page-info-content-inner">
           <p>{pageDescription}</p>
        </div>
      </section>

      {/* Pass ref to product list container */}
      <section className="product-grid-container" aria-label="Figurine Products">
        <div ref={productListRef} className="product-list">
          {figurineProducts.map((product, index) => (
            // Add wrapper div for animation target and stagger delay
            <div
              key={product.id}
              className="product-card-animation-target"
              style={{ '--stagger-delay': `${index * 0.08}s` }}
            >
              <ProductCard
                id={product.id}
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                discountPrice={product.discountPrice}
                createdBy={product.createdBy}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Figures;
