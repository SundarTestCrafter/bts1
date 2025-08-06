import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import 'bootstrap/dist/css/bootstrap.min.css';

const PaginatedRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetch("https://apex.oracle.com/pls/apex/vs_works/requests/requests/")
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data.items);
        setRequests(data.items || []);
      });
  }, []);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = requests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(requests.length / recordsPerPage);

  const paginate = (number) => setCurrentPage(number);

  return (
    <div className="container mt-4">
      <h2>Requests:</h2>
      <Table striped bordered hover variant="dark">
        <thead style={{ backgroundColor: "#0b8bb5ff", textAlign: "center" }}>
          <tr>
            <th>CUSTOMER</th>
            <th>ISSUE_DATE</th>
            <th>SERVER</th>
            <th>DESCRIPTION</th>
            <th>JP INCHARGE</th>
            <th>IN INCHARGE</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No data found
              </td>
            </tr>
          ) : (
            currentRecords.map((item, index) => (
              <tr key={index}>
                <td>{item.customer || "-"}</td>
                <td>{item.issue_date ? item.issue_date.split("T")[0] : "-"}</td>
                <td>{item.server || "-"}</td>
                <td>{item.description || "-"}</td>
                <td>{item.jp_incharg || "-"}</td>
                <td>{item.in_incharge || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(totalPages).keys()].map((num) => (
          <Pagination.Item
            key={num + 1}
            active={num + 1 === currentPage}
            onClick={() => paginate(num + 1)}
          >
            {num + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default PaginatedRequestsTable;