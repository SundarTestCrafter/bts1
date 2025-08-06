import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import Header from './Header';
import Footer from './Footer';
import useIsMobile from '../hooks/useIsMobile';
import RequirementsPage from './RequirementsPage';

function RequirementsPages() {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onMenuClick={toggleSidebar} />
      
      <div className="d-flex flex-grow-1" style={{ marginTop: '30px' }}>
        {isMobile ? (
          <>
            <MobileMenu isOpen={sidebarOpen} onClose={closeSidebar} />
            {sidebarOpen && <div className="backdrop" onClick={closeSidebar}></div>}
          </>
        ) : (
          <Sidebar />
        )}

        <main
          className="p-4"
          style={{
            marginLeft: isMobile ? 0 : '220px',
            width: '100%',
            transition: 'margin-left 0.3s ease-in-out',
          }}
        >
          <RequirementsPage />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default RequirementsPages;