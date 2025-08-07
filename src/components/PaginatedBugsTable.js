import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "react-bootstrap";
import CreateModal from './CreateModal'; // Make sure this path is correct

const PaginatedBugsTable = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const bugsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    fetch("https://apex.oracle.com/pls/apex/vs_works/bugs/bugsinfo/")
      .then((res) => res.json())
      .then((data) => {
        setBugs(data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(bugs.length / bugsPerPage);
  const indexOfLast = currentPage * bugsPerPage;
  const indexOfFirst = indexOfLast - bugsPerPage;
  const currentBugs = bugs.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Issues List</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Issue
        </button>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" variant="primary" />
          <div>Loading...</div>
        </div>
      ) : (
        <>
          <table className="table table-striped table-dark" border="1" cellPadding="10" width="100%">
            <thead style={{ backgroundColor: "#eee", textAlign: "center" }}>
              <tr>
                <th>Title</th>
                <th>Steps</th>
                <th>Expected Result</th>
                <th>Current Result</th>
              </tr>
            </thead>
            <tbody>
              {currentBugs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">No data found</td>
                </tr>
              ) : (
                currentBugs.map((bug) => (
                  <tr key={bug.BUG_ID}>
                    <td>{bug.title}</td>
                    <td>{bug.steps_to_reproduce}</td>
                    <td>{bug.expected_result}</td>
                    <td>{bug.current_result}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="mt-3 text-center">
            <button className="btn btn-primary" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className="btn btn-outline-primary mx-1"
                onClick={() => goToPage(i + 1)}
                style={{
                  backgroundColor: currentPage === i + 1 ? "#007bff" : "white",
                  color: currentPage === i + 1 ? "white" : "black",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button className="btn btn-primary" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}

      {/* Create Bug Modal */}
      <CreateModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default PaginatedBugsTable;