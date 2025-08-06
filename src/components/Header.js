import React, { useState } from 'react';
import btslogo from '../btslogo.png';
import { FaBars } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-primary fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src={btslogo} alt="Logo" height="40" className="me-2" />
            <h4 className="mb-0 text-white">Bug Radar</h4>
          </div>
          <button
            className="btn btn-outline-light d-md-none"
            onClick={toggleMobileMenu}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Fixed: Pass correct props */}
      <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
    </>
  );
}

export default Header;