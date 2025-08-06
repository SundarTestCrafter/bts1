import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import Header from './Header';
import Footer from './Footer';
import BugStatusChart from './BugStatusChart';
import BugStatusPieChart from './BugStatusPieChart';
import BugMessageSlider from './BugMessageSlider';
import BugSummaryWidget from './BugSummaryWidget';
import useIsMobile from '../hooks/useIsMobile';

function HomePage() {
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
          <div className="container-fluid mt-3">
        <h2>Welcome to Bug Radar</h2>
        <p>Detect. Track. Resolve.</p>

        <BugMessageSlider />
        <BugSummaryWidget />

        <div style={{marginTop: "15px"}} className="row">
          <div style={{ border: "1px solid #2990eaff", borderRadius: "5px"}} className="col-lg-6 col-md-12 mb-4">
            <div style={{ overflowX: 'auto' }}>
              <BugStatusChart />
            </div>
          </div>
          <div style={{ border: "1px solid #2990eaff", borderRadius: "5px", }} className="col-lg-6 col-md-12 mb-4">
            <div style={{ overflowX: 'auto' }}>
              <BugStatusPieChart />
            </div>
          </div>
        </div>
      </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;