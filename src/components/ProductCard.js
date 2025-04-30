import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import './ProductCard.css';

// Helper function for consistent price formatting
const formatPrice = (amount) => {
  const number = parseFloat(amount);
  if (isNaN(number)) {
    // Handle cases where price might not be a valid number initially
    console.warn(`Invalid price value received: ${amount}`);
    return 'N/A';
  }
  // Using Intl.NumberFormat for locale-aware currency formatting
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR', // Assuming Indian Rupees based on '₹'
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const ProductCard = ({ id, image, title, description, price, discountPrice, createdBy }) => {
  // Using a more descriptive state name
  const [quantityInCart, setQuantityInCart] = useState(0);

  // Using useCallback to potentially optimize event handlers if needed elsewhere
  const handleAddToCart = useCallback(() => {
    setQuantityInCart(1); // Set initial quantity to 1
  }, []);

  const handleIncrement = useCallback(() => {
    setQuantityInCart(prevQuantity => prevQuantity + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setQuantityInCart(prevQuantity => Math.max(0, prevQuantity - 1)); // Ensure quantity doesn't go below 0
  }, []);

  const displayPrice = formatPrice(discountPrice || price);
  const originalPriceFormatted = discountPrice ? formatPrice(price) : null;
  const hasDiscount = !!discountPrice && parseFloat(discountPrice) < parseFloat(price);

  return (
    <article className="product-card" aria-labelledby={`product-title-${id}`}>
      <div className="product-image-wrapper">
        <img
          src={image}
          alt={title || 'Product image'} // Use title for alt text if available
          className="product-image"
          loading="lazy" // Defer loading off-screen images
        />
      </div>

      <div className="product-content">
        <div className="product-details">
          {title && <h3 id={`product-title-${id}`} className="product-title">{title}</h3>}
          {description && <p className="product-description">{description}</p>}
          {createdBy && <p className="product-creator">By: {createdBy}</p>}
        </div>

        <div className="product-footer">
          <div className="product-pricing">
            <span className="current-price">{displayPrice}</span>
            {hasDiscount && originalPriceFormatted && (
              <span className="original-price">{originalPriceFormatted}</span>
            )}
          </div>

          <div className="product-actions">
            {quantityInCart === 0 ? (
              <button
                type="button" // Explicitly set button type
                className="product-button add-to-cart-button"
                onClick={handleAddToCart}
                aria-label={`Add ${title || 'product'} to cart`}
              >
                <FaShoppingCart aria-hidden="true" />
                <span>Add to Cart</span>
              </button>
            ) : (
              <div className="cart-controls">
                <button
                  type="button"
                  className="product-button control-button decrement-button"
                  onClick={handleDecrement}
                  aria-label={`Decrease quantity of ${title || 'product'}`}
                  disabled={quantityInCart <= 0} // Should ideally not be needed due to logic, but good failsafe
                >
                  <FaMinus aria-hidden="true" />
                </button>
                <span className="quantity-display" aria-live="polite" role="status">
                  {quantityInCart}
                </span>
                <button
                  type="button"
                  className="product-button control-button increment-button"
                  onClick={handleIncrement}
                  aria-label={`Increase quantity of ${title || 'product'}`}
                >
                  <FaPlus aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ID is useful for keys and aria
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  // Ensuring price/discountPrice can be string or number, but required
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  discountPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  createdBy: PropTypes.string,
};

ProductCard.defaultProps = {
  title: 'Product', // Default title for better alt text / aria-label
  description: '',
  discountPrice: null,
  createdBy: '',
};

export default ProductCard;