import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';

function ProtectedPage({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeMenu = () => setSidebarOpen(false);

  // Listen for resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      {!isMobile && <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      {isMobile && isSidebarOpen && <MobileMenu closeMenu={closeMenu} />}

      <div className="d-flex" style={{ paddingTop: '70px' }}>
        <main
          className="flex-grow-1"
          style={{ marginLeft: !isMobile ? '220px' : '0', padding: '20px' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default ProtectedPage;