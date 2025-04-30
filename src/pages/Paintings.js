import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import '../components/Products.css';

// paintingProducts data remains the same...
const paintingProducts = [
    { id: 'paint-001', image: 'https://picsum.photos/seed/paint-001/300/300', title: 'Monstera Leaf Study', price: '4500.00', discountPrice: '3999.00', description: 'Detailed acrylic painting of a Monstera deliciosa leaf on canvas. Vibrant greens.', createdBy: 'Flora Art Studio', tags: ['Painting', 'Acrylic', 'Botanical', 'Canvas', 'Leaf'], },
    { id: 'paint-002', image: 'https://picsum.photos/seed/paint-002/300/300', title: 'Abstract Floral Burst', price: '6000.00', discountPrice: null, description: 'Energetic abstract painting inspired by blooming flowers. Mixed media on canvas.', createdBy: 'Abstract Visions', tags: ['Painting', 'Abstract', 'Floral', 'Mixed Media', 'Canvas'], },
    { id: 'paint-003', image: 'https://picsum.photos/seed/paint-003/300/300', title: 'Watercolor Fern Collection', price: '3800.00', discountPrice: null, description: 'Set of three delicate watercolor paintings featuring different fern species. Framed.', createdBy: 'Watercolour Woods', tags: ['Painting', 'Watercolor', 'Botanical', 'Fern', 'Set', 'Framed'], },
    { id: 'paint-004', image: 'https://picsum.photos/seed/paint-004/300/300', title: 'Serene Forest Landscape', price: '7500.00', discountPrice: '6800.00', description: 'Calming oil painting depicting a misty forest scene. Large canvas, ready to hang.', createdBy: 'Landscape Masters', tags: ['Painting', 'Oil', 'Landscape', 'Forest', 'Canvas'], },
    { id: 'paint-005', image: 'https://picsum.photos/seed/paint-005/300/300', title: 'Tropical Bird of Paradise', price: '5200.00', discountPrice: null, description: 'Bold acrylic painting of a Bird of Paradise flower in bloom. Textured finish.', createdBy: 'Flora Art Studio', tags: ['Painting', 'Acrylic', 'Botanical', 'Flower', 'Tropical', 'Canvas'], }
];


function Paintings() {
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
  const pageDescription = "Bring the beauty of nature indoors with our collection of original paintings. Featuring botanical studies, landscapes, and abstract interpretations, these artworks are created by talented artists using various mediums like acrylic, oil, and watercolor.";

  return (
    <main className="product-page-container" aria-labelledby="page-title">
      <header className="product-page-header animate-slide-down">
        <div className="header-content"> <h1 id="page-title">Nature-Inspired Paintings</h1> <p className="page-subtitle">Art that breathes life into your walls.</p> </div>
        <button className="info-toggle-button" onClick={handleToggleInfo} aria-expanded={showInfo} aria-controls="page-info-content">
           <span>{showInfo ? 'Hide Info' : 'More Info'}</span> <img src={process.env.PUBLIC_URL + '/logo/logo.png'} alt="" aria-hidden="true" className={`info-toggle-logo ${showInfo ? 'expanded' : ''}`} />
        </button>
      </header>

      <div id="page-info-content" className={`page-info-message ${showInfo ? 'expanded' : 'collapsed'}`} aria-live="polite" aria-hidden={!showInfo} >
        <div className="page-info-content-inner"> <p>{pageDescription}</p> </div>
      </div>

      {/* REMOVED role="region" from this section */}
      <section className="product-grid-container" aria-label="Painting Products">
        <div ref={productListRef} className="product-list">
          {paintingProducts.map((product, index) => (
            <div key={product.id} className="product-card-animation-target" style={{ '--stagger-delay': `${index * 0.08}s` }} >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Paintings;
