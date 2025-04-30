import React, { useState, useEffect, useRef } from 'react'; // Import useEffect, useRef
import ProductCard from '../components/ProductCard';
import '../components/Products.css'; // Shared styles for product page layout

// Updated product data using picsum for images (data remains the same)
const apparelProducts = [
    { id: 'apparel-001', image: 'https://picsum.photos/seed/apparel-001/300/300', title: 'Organic Cotton Fish Tee', price: '1200.00', discountPrice: '999.00', description: 'Comfortable fit tee made from 100% GOTS certified organic cotton.', createdBy: 'FlyFish Designs', tags: ['T-Shirt', 'Organic Cotton', 'Casual'], },
    { id: 'apparel-002', image: 'https://picsum.photos/seed/apparel-002/300/300', title: 'Forest Print Hoodie', price: '2500.00', discountPrice: null, description: 'Warm pullover hoodie with a serene forest print, made with recycled polyester blend.', createdBy: 'Nature Threads', tags: ['Hoodie', 'Recycled', 'Outerwear'], },
    { id: 'apparel-003', image: 'https://picsum.photos/seed/apparel-003/300/300', title: 'Mountain Range Sweatshirt', price: '2200.00', discountPrice: '1899.00', description: 'Cozy crewneck sweatshirt featuring a minimalist mountain silhouette.', createdBy: 'FlyFish Designs', tags: ['Sweatshirt', 'Cotton Blend', 'Casual'], },
    { id: 'apparel-004', image: 'https://picsum.photos/seed/apparel-004/300/300', title: 'Leaf Pattern Button-Up Shirt', price: '1800.00', discountPrice: null, description: 'Breathable short-sleeve button-up shirt with a subtle all-over leaf pattern.', createdBy: 'EcoWear', tags: ['Shirt', 'Button-Up', 'Summer'], },
    { id: 'apparel-005', image: 'https://picsum.photos/seed/apparel-005/300/300', title: 'Wave Embroidered Cap', price: '800.00', discountPrice: null, description: 'Stylish baseball cap made from organic cotton twill with minimalist wave embroidery.', createdBy: 'FlyFish Designs', tags: ['Accessory', 'Cap', 'Organic Cotton'], },
    { id: 'apparel-006', image: 'https://picsum.photos/seed/apparel-006/300/300', title: 'Recycled Material Jacket', price: '3500.00', discountPrice: '3199.00', description: 'Lightweight, packable jacket made from 100% recycled materials. Water-resistant finish.', createdBy: 'Sustainable Style Co.', tags: ['Jacket', 'Recycled', 'Outerwear', 'Water-Resistant'], }
];

function Apparel() {
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
            cards.forEach((card) => {
              // Check if observer is still tracking before unobserving
              if (observer && observer.takeRecords().find(record => record.target === card)) {
                 observer.unobserve(card);
              }
            });
        }
    };
  }, [apparelProducts]); // Dependency on products array
  // --- End Animation Logic ---

  const handleToggleInfo = () => {
    setShowInfo(prevShowInfo => !prevShowInfo);
  };

  const pageDescription = "Explore our collection of nature-inspired apparel, crafted with sustainable materials like organic cotton and recycled fabrics. Designed for comfort, durability, and style, our pieces connect you with the outdoors.";

  return (
    <main className="product-page-container" aria-labelledby="page-title">
      {/* Apply animation class to header */}
      <header className="product-page-header animate-slide-down">
        <div className="header-content">
           <h1 id="page-title">Sustainable Apparel</h1>
           <p className="page-subtitle">Wear your love for nature.</p>
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
      <section className="product-grid-container" aria-label="Apparel Products">
        <div ref={productListRef} className="product-list">
          {apparelProducts.map((product, index) => (
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

export default Apparel;