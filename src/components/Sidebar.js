import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome, FaDatabase, FaArrowCircleRight, FaThList, FaCogs,
  FaUsers, FaStar, FaListAlt, FaSignOutAlt
} from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'bg-primary text-white' : 'text-white';
  const isMasterActive = ['/users', '/status', '/priority'].some(path => location.pathname === path);

  return (
    <div
      className={`bg-dark text-white p-3 sidebar ${isSidebarOpen ? 'open' : ''}`}
    >
      <div className="d-md-none text-end mb-2">
        <button className="btn btn-sm btn-light" onClick={toggleSidebar}>Close</button>
      </div>

      <h5 className="text-center mb-4">Menu</h5>

      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/home" className={`nav-link ${isActive('/home')}`} onClick={toggleSidebar}>
            <FaHome className="me-2" /> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/projects" className={`nav-link ${isActive('/projects')}`} onClick={toggleSidebar}>
            <FaDatabase className="me-2" /> Projects
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/bugs" className={`nav-link ${isActive('/bugs')}`} onClick={toggleSidebar}>
            <FaDatabase className="me-2" /> Issues
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/requests" className={`nav-link ${isActive('/requests')}`} onClick={toggleSidebar}>
            <FaArrowCircleRight className="me-2" /> Requests
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/issues" className={`nav-link ${isActive('/issues')}`} onClick={toggleSidebar}>
            <FaThList className="me-2" /> Issues List View
          </Link>
        </li>
        <li className="nav-item">
          <span
            className={`nav-link ${isMasterActive ? 'bg-primary text-white' : 'text-white'}`}
            onClick={() => setShowSubMenu(prev => !prev)}
            style={{ cursor: 'pointer' }}
          >
            <FaCogs className="me-2" /> Master
          </span>
          {showSubMenu && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <Link to="/users" className={`nav-link ${isActive('/users')}`} onClick={toggleSidebar}>
                  <FaUsers className="me-2" /> Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/status" className={`nav-link ${isActive('/status')}`} onClick={toggleSidebar}>
                  <FaStar className="me-2" /> Status
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/priority" className={`nav-link ${isActive('/priority')}`} onClick={toggleSidebar}>
                  <FaListAlt className="me-2" /> Priority
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item mt-3">
          <span className="nav-link text-danger" style={{ cursor: 'pointer' }} onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;