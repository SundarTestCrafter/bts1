import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBug, FaFileAlt, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const BugSummaryWidget = () => {
  const [counts, setCounts] = useState({
    total: 0,
    new: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await axios.get('/pls/apex/vs_works/bugs/bugsinfo/');
        const bugs = res.data.items;

        const newBugs = bugs.filter(b => b.status_id === 1).length;
        const inProgress = bugs.filter(b => b.status_id === 21).length;
        const closed = bugs.filter(b => b.status_id === 2).length;

        setCounts({
          total: bugs.length,
          new: newBugs,
          inProgress,
          closed,
        });
      } catch (err) {
        console.error('Failed to fetch bugs:', err);
      }
    };

    fetchBugs();
  }, []);

  const cardStyle = {
    borderRadius: '10px',
    padding: '20px',
    background: '#c2eff6ff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    height: '100%',
  };

  const iconStyle = (bg) => ({
    backgroundColor: bg,
    color: '#000',
    borderRadius: '50%',
    padding: '10px',
    fontSize: '1.5rem',
  });

  return (
    <div className="row g-4">
      <div className="col-md-3 col-sm-6">
        <div style={cardStyle}>
          <div style={iconStyle('#e3f2fd')}><FaBug color="#1976d2" /></div>
          <div>
            <h4 style={{ margin: 0 }}>{counts.total}</h4>
            <small style={{ color: '#666' }}>TOTAL ISSUES</small>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div style={cardStyle}>
          <div style={iconStyle('#e3f2fd')}><FaFileAlt color="#0288d1" /></div>
          <div>
            <h4 style={{ margin: 0 }}>{counts.new}</h4>
            <small style={{ color: '#666' }}>NEW</small>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div style={cardStyle}>
          <div style={iconStyle('#fff3e0')}><FaSpinner color="#f57c00" /></div>
          <div>
            <h4 style={{ margin: 0 }}>{counts.inProgress}</h4>
            <small style={{ color: '#666' }}>IN PROGRESS</small>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div style={cardStyle}>
          <div style={iconStyle('#e8f5e9')}><FaCheckCircle color="#2e7d32" /></div>
          <div>
            <h4 style={{ margin: 0 }}>{counts.closed}</h4>
            <small style={{ color: '#666' }}>CLOSED</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugSummaryWidget;