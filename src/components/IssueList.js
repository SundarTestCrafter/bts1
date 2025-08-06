import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function IssueList() {
  const [bugs, setBugs] = useState([]);
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMap, setStatusMap] = useState({});

  const statusColors = {
    "New": "rgb(26, 182, 81)",
    "In Progress": "rgb(249, 175, 45)",
    "Closed": "rgb(44, 44, 44)",
    "Resolved": "rgb(62, 96, 223)"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bugsRes, statusRes] = await Promise.all([
          axios.get('/pls/apex/vs_works/bugs/bugsinfo/'),
          axios.get('/pls/apex/vs_works/bts_status/')
        ]);

        setBugs(bugsRes.data.items);
        setFilteredBugs(bugsRes.data.items);

        const map = {};
        statusRes.data.items.forEach(item => {
          map[item.status_id] = item.status_name;
        });
        setStatusMap(map);
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = bugs.filter(bug =>
      (bug.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       bug.module?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredBugs(filtered);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredBugs(bugs);
  };

  return (
    <div className="mb-3">
      {/* Search Bar and Buttons */}
      <div className="row mb-3">
        <div className="col-md-6 d-flex align-items-center">
          <div className="input-group">
            <span className="input-group-text bg-white border-primary">
              <FaSearch className="text-primary" />
            </span>
            <input
              type="text"
              className="form-control border-primary"
              placeholder="Search by title or module..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex mt-2 mt-md-0">
          <button className="btn btn-primary me-2" onClick={handleSearch}>
            Search
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      {filteredBugs.map(bug => {
        const statusName = statusMap[bug.status_id];
        const badgeColor = statusColors[statusName] || "#6c757d";

        return (
          <div key={bug.bug_id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{bug.title}</h5>
              <div className='row'>
                <div className="col-lg-3 col-md-12 mb-4">
                  {bug.module && (
                    <p className="card-text">
                      <strong>Module:</strong> {bug.module}
                    </p>
                  )}
                </div>
                <div className="col-lg-3 col-md-12 mb-4">
                  {bug.steps_to_reproduce && (
                    <p className="card-text">
                      <strong>Steps:</strong> {bug.steps_to_reproduce}
                    </p>
                  )}
                </div>
                <div className="col-lg-3 col-md-12 mb-4">
                  {bug.expected_result && (
                    <p className="card-text">
                      <strong>Expected Result:</strong><br />
                      {bug.expected_result}
                    </p>
                  )}
                </div>
                <div className="col-lg-3 col-md-12 mb-4">
                  {bug.current_result && (
                    <p className="card-text">
                      <strong>Current Result:</strong><br />
                      {bug.current_result}
                    </p>
                  )}
                </div>

                {statusName && (
                  <div className="col-12 mt-2">
                    <span
                      className="badge"
                      style={{
                        backgroundColor: badgeColor,
                        color: "#fff",
                        fontSize: "14px",
                        padding: "6px 12px",
                        borderRadius: "8px"
                      }}
                    >
                      {statusName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default IssueList;