import React from 'react'; // Removed useRef as it's not needed now
import './Topbar.css';
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from 'react-router-dom';

const Topbar = () => {

  return (
    // The 'navbar' div now acts only as a semantic container, not for layout
    <nav className="navbar" aria-label="Checkout navigation">
      {/* Brand remains hidden */}
      <div className="navbar-brand" aria-hidden="true">
        <Link to="/">fLY fISH</Link>
      </div>

      {/* The ul itself will be positioned fixed */}
      <ul className="navbar-links">
        <li>
          <Link to="/cart" className="checkout-link">
            <MdOutlineShoppingCartCheckout aria-hidden="true" /> Check out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;