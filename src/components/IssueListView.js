import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import Header from './Header';
import Footer from './Footer';
import BugMessageSlider from './BugMessageSlider';
import BugSummaryWidget from './BugSummaryWidget';
import IssueList from './IssueList';
import CreateModal from './CreateModal';
import useIsMobile from '../hooks/useIsMobile';

function IssueListView() {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // ✅ fix here

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
            marginLeft: isMobile ? 0 : '250px', // Optional: set 220px if Sidebar has that width
            width: '100%',
            transition: 'margin-left 0.3s ease-in-out',
          }}
        >
          <div className="container-fluid mt-3">
            <BugMessageSlider />
            <BugSummaryWidget />

            <div style={{ marginTop: "15px" }} className='row mb-2'>
              <div className='col text-end'>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                  + Add New Issue
                </button>
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <IssueList />
              </div>
            </div>

            <CreateModal show={showModal} handleClose={() => setShowModal(false)} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default IssueListView;