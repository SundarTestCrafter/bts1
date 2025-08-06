import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaginatedPriority() {
  const [priorities, setPriorities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prioritiesPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPriorities();
  }, []);

  const fetchPriorities = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/pls/apex/vs_works/bts_priority/');
      setPriorities(response.data.items || []);
      setError('');
    } catch (err) {
      setError('Unable to load priority data.');
    } finally {
      setLoading(false);
    }
  };

  const indexOfLast = currentPage * prioritiesPerPage;
  const indexOfFirst = indexOfLast - prioritiesPerPage;
  const currentPriorities = priorities.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(priorities.length / prioritiesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Priority List</h4>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Priority Name</th>
              </tr>
            </thead>
            <tbody>
              {currentPriorities.map(priority => (
                <tr key={priority.priority_id}>
                  <td>{priority.priority_id}</td>
                  <td>{priority.priority_name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default PaginatedPriority;