import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome, FaDatabase, FaListAlt, FaCogs, FaUsers, FaSignOutAlt,
  FaStar, FaArrowCircleRight, FaThList, FaChevronDown, FaChevronUp
} from 'react-icons/fa';

function MobileMenu({ isOpen, toggleMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMasterOpen, setIsMasterOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'bg-primary text-white' : 'text-dark';
  const isMasterActive = ['/users', '/status', '/priority'].some(path => location.pathname === path);

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={toggleMenu}></div>
      <div className="bg-white p-3 position-fixed top-0 start-0 w-75 h-100 shadow" style={{ zIndex: 1060 }}>
        <div className="text-end mb-3">
          <button className="btn btn-sm btn-outline-dark" onClick={toggleMenu}>Close</button>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/home" className={`nav-link ${isActive('/home')}`} onClick={toggleMenu}>
              <FaHome className="me-2" /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bugs" className={`nav-link ${isActive('/bugs')}`} onClick={toggleMenu}>
              <FaDatabase className="me-2" /> Issues
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/requests" className={`nav-link ${isActive('/requests')}`} onClick={toggleMenu}>
              <FaArrowCircleRight className="me-2" /> Requests
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/issues" className={`nav-link ${isActive('/issues')}`} onClick={toggleMenu}>
              <FaThList className="me-2" /> Issues List View
            </Link>
          </li>

          {/* Master Dropdown Toggle */}
          <li className="nav-item">
            <button
              className={`nav-link btn w-100 text-start ${isMasterActive ? 'bg-primary text-white' : 'text-dark'}`}
              onClick={() => setIsMasterOpen(!isMasterOpen)}
            >
              <FaCogs className="me-2" /> Master
              {isMasterOpen ? <FaChevronUp className="float-end" /> : <FaChevronDown className="float-end" />}
            </button>

            {isMasterOpen && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link to="/users" className={`nav-link ${isActive('/users')}`} onClick={toggleMenu}>
                    <FaUsers className="me-2" /> Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/status" className={`nav-link ${isActive('/status')}`} onClick={toggleMenu}>
                    <FaStar className="me-2" /> Status
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/priority" className={`nav-link ${isActive('/priority')}`} onClick={toggleMenu}>
                    <FaListAlt className="me-2" /> Priority
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item mt-3">
            <span className="nav-link text-danger" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <FaSignOutAlt className="me-2" /> Logout
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MobileMenu;