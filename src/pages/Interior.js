import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import '../components/Products.css';

// interiorProducts data remains the same...
const interiorProducts = [
    { id: 'int-001', image: 'https://picsum.photos/seed/int-001/300/300', title: 'Reclaimed Wood Coffee Table', price: '18000.00', discountPrice: '16500.00', description: 'Sturdy coffee table crafted from reclaimed wood, featuring unique grain patterns. Eco-friendly choice.', createdBy: 'Sustainable Living Co.', tags: ['Furniture', 'Wood', 'Reclaimed', 'Living Room'], },
    { id: 'int-002', image: 'https://picsum.photos/seed/int-002/300/300', title: 'Organic Cotton Throw Blanket', price: '4500.00', discountPrice: null, description: 'Soft and cozy throw blanket made from 100% GOTS certified organic cotton. Natural dye.', createdBy: 'Eco Comforts', tags: ['Textile', 'Organic Cotton', 'Blanket', 'Bedroom'], },
    { id: 'int-003', image: 'https://picsum.photos/seed/int-003/300/300', title: 'Bamboo Pendant Light Shade', price: '6200.00', discountPrice: null, description: 'Handwoven bamboo light shade that casts a warm, natural glow. Sustainable lighting option.', createdBy: 'Natural Weave Decor', tags: ['Lighting', 'Bamboo', 'Handmade', 'Sustainable'], },
    { id: 'int-004', image: 'https://picsum.photos/seed/int-004/300/300', title: 'Eco-Interior Design Consultation', price: '15000.00', discountPrice: null, description: 'Personalized consultation service to help you create a sustainable and beautiful living space. (Per Room)', createdBy: 'FlyFish Design Services', tags: ['Service', 'Consultation', 'Sustainable Design'], isService: true, },
    { id: 'int-005', image: 'https://picsum.photos/seed/int-005/300/300', title: 'Recycled Glass Vase Set', price: '3100.00', discountPrice: '2800.00', description: 'Set of three elegant vases made from 100% recycled glass. Perfect for flowers or as standalone decor.', createdBy: 'GreenGlass Art', tags: ['Decor', 'Glass', 'Recycled', 'Vase', 'Set'], },
    { id: 'int-006', image: 'https://picsum.photos/seed/int-006/300/300', title: 'Cork Yoga Mat', price: '5000.00', discountPrice: null, description: 'Sustainable and naturally anti-microbial yoga mat made from cork and natural rubber.', createdBy: 'Mindful Living', tags: ['Wellness', 'Cork', 'Yoga', 'Sustainable'], }
];


function Interior() {
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
  const pageDescription = "Create mindful living spaces with our curated selection of eco-friendly interior products and design services. From sustainable furniture and natural textiles to consultations, we help you build a home that reflects your values and connection to nature.";

  return (
    <main className="product-page-container" aria-labelledby="page-title">
      <header className="product-page-header animate-slide-down">
        <div className="header-content"> <h1 id="page-title">Eco Interior Design</h1> <p className="page-subtitle">Sustainable style for conscious living.</p> </div>
        <button className="info-toggle-button" onClick={handleToggleInfo} aria-expanded={showInfo} aria-controls="page-info-content">
           <span>{showInfo ? 'Hide Info' : 'More Info'}</span> <img src={process.env.PUBLIC_URL + '/logo/logo.png'} alt="" aria-hidden="true" className={`info-toggle-logo ${showInfo ? 'expanded' : ''}`} />
        </button>
      </header>

      <div id="page-info-content" className={`page-info-message ${showInfo ? 'expanded' : 'collapsed'}`} aria-live="polite" aria-hidden={!showInfo} >
        <div className="page-info-content-inner"> <p>{pageDescription}</p> </div>
      </div>

      {/* REMOVED role="region" from this section */}
      <section className="product-grid-container" aria-label="Interior Products and Services">
        <div ref={productListRef} className="product-list">
          {interiorProducts.map((product, index) => (
            <div key={product.id} className="product-card-animation-target" style={{ '--stagger-delay': `${index * 0.08}s` }} >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Interior;
