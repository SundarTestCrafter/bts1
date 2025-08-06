import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaginatedStatus() {
  const [statuses, setStatuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusesPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/pls/apex/vs_works/bts_status/');
      setStatuses(response.data.items || []);
      setError('');
    } catch (err) {
      setError('Unable to load status data.');
    } finally {
      setLoading(false);
    }
  };

  const indexOfLast = currentPage * statusesPerPage;
  const indexOfFirst = indexOfLast - statusesPerPage;
  const currentStatuses = statuses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(statuses.length / statusesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Status List</h4>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>Status ID</th>
                <th>Status Name</th>
                <th>Sequence</th>
              </tr>
            </thead>
            <tbody>
              {currentStatuses.map(status => (
                <tr key={status.status_id}>
                  <td>{status.status_id}</td>
                  <td>{status.status_name}</td>
                  <td>{status.sequence}</td>
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

export default PaginatedStatus;