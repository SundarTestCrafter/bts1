import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import Header from './Header';
import Footer from './Footer';
import PaginatedRequestsTable from './PaginatedRequestsTable';
import useIsMobile from '../hooks/useIsMobile';

function Requests() {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onMenuClick={toggleSidebar} />
      
      <div className="d-flex flex-grow-1" style={{ marginTop: '70px' }}>
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
            marginLeft: isMobile ? 0 : '250px',
            width: '100%',
            transition: 'margin-left 0.3s ease-in-out',
          }}
        >
          <PaginatedRequestsTable />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Requests;