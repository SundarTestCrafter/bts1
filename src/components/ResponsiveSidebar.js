import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaDatabase,
  FaProjectDiagram,
  FaListUl,
  FaCogs,
  FaUsers,
  FaStar,
  FaSignOutAlt,
  FaClipboardList
} from 'react-icons/fa';
import './ResponsiveSidebar.css';

const menuItems = [
  { label: 'Home', path: '/home', icon: <FaHome /> },
  { label: 'Projects', path: '/projects', icon: <FaDatabase /> },
  { label: 'Issues', path: '/bugs', icon: <FaDatabase /> },
  { label: 'Requests', path: '/requests', icon: <FaProjectDiagram /> },
  { label: 'Issues List View', path: '/issues', icon: <FaListUl /> },
  { label: 'Master', path: '/bugs', icon: <FaCogs /> },
  { label: 'Users', path: '/users', icon: <FaUsers /> },
  { label: 'Status', path: '/status', icon: <FaStar /> },
  { label: 'Priority', path: '/priority', icon: <FaClipboardList /> }
];

function ResponsiveSidebar({ isOpen = true }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div
      className="sidebar"
      style={{
        width: isOpen ? '200px' : '0',
        backgroundColor: '#212529',
        color: 'white',
        height: '100vh',
        overflowX: 'hidden',
        transition: 'width 0.3s ease',
        position: 'fixed',
        top: '56px',
        left: 0,
        zIndex: 999
      }}
    >
      <div className="text-center p-3 bg-primary">
        <img src="/btslogo.png" alt="Logo" height="30" className="me-2" />
        <strong>Bug Radar</strong>
      </div>
      <div className="p-3">
        <h6 className="text-white text-uppercase mb-3">Menu</h6>
        <ul className="list-unstyled">
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link
                to={item.path}
                className={`d-flex align-items-center text-decoration-none p-2 rounded ${
                  location.pathname === item.path ? 'bg-primary text-white' : 'text-white'
                }`}
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-3">
            <button
              onClick={handleLogout}
              className="btn btn-outline-light w-100 d-flex align-items-center justify-content-start"
            >
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ResponsiveSidebar;