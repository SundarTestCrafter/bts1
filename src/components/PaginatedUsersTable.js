import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaginatedUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetch('https://apex.oracle.com/pls/apex/vs_works/bts/master/')
      .then(response => response.json())
      .then(data => {
        console.log('User API response:', data.items);
        setUsers(data.items || []);
      });
  }, []);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / recordsPerPage);

  const paginate = (number) => setCurrentPage(number);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Users</h2>
      <Table striped bordered hover responsive>
        <thead className="table-primary text-center">
          <tr>
            <th>USER ID</th>
            <th>FULL NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentRecords.length === 0 ? (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          ) : (
            currentRecords.map((user, idx) => (
              <tr key={idx}>
                <td>{user.user_id}</td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.role_name}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default PaginatedUsersTable;