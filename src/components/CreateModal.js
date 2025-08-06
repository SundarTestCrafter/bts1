import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function CreateModal({ show, handleClose, onSubmit }) {
  const [formData, setFormData] = useState({
    TITLE: '',
    STEPS_TO_REPRODUCE: '',
    EXPECTED_RESULT: '',
    CURRENT_RESULT: '',
    REPORTED_BY: '',
    ASSIGNED_TO: '',
    STATUS_NAME: '',
    PRIORITY_NAME: '',
    MODULE: ''
  });

  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [userRes, statusRes, priorityRes] = await Promise.all([
          axios.get("/pls/apex/vs_works/bts_users/"),
          axios.get("/pls/apex/vs_works/bts_status/"),
          axios.get("/pls/apex/vs_works/bts_priority/")
        ]);

        setUsers(userRes.data.items || []);
        setStatuses(statusRes.data.items || []);
        setPriorities(priorityRes.data.items || []);
      } catch (error) {
        console.error('Dropdown API error:', error);
        alert("Unable to load dropdown data. CORS error or server not reachable.");
      }
    };

    if (show) fetchDropdowns(); // only fetch when modal is shown
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    axios.post('/pls/apex/vs_works/bugs/bugsinfo/', formData)
      .then(res => {
        alert('Bug submitted successfully!');
        handleClose();
        if (onSubmit) onSubmit(); // notify parent
      })
      .catch(err => {
        console.error('Bug submit error:', err);
        alert('Failed to submit bug. Please try again.');
      });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Issue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control name="TITLE" value={formData.TITLE} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Module</Form.Label>
                <Form.Control name="MODULE" value={formData.MODULE} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mt-3">
            <Form.Label>Steps to Reproduce</Form.Label>
            <Form.Control as="textarea" rows={3} name="STEPS_TO_REPRODUCE" value={formData.STEPS_TO_REPRODUCE} onChange={handleChange} />
          </Form.Group>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Expected Result</Form.Label>
                <Form.Control name="EXPECTED_RESULT" value={formData.EXPECTED_RESULT} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Current Result</Form.Label>
                <Form.Control name="CURRENT_RESULT" value={formData.CURRENT_RESULT} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Reported By</Form.Label>
                <Form.Select name="REPORTED_BY" value={formData.REPORTED_BY} onChange={handleChange}>
                  <option value="">Select</option>
                  {users.map(user => (
                    <option key={user.user_id} value={user.full_name}>
                      {user.full_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Assigned To</Form.Label>
                <Form.Select name="ASSIGNED_TO" value={formData.ASSIGNED_TO} onChange={handleChange}>
                  <option value="">Select</option>
                  {users.map(user => (
                    <option key={user.user_id} value={user.full_name}>
                      {user.full_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="STATUS_NAME" value={formData.STATUS_NAME} onChange={handleChange}>
                  <option value="">Select</option>
                    {statuses.map(status => (
                    <option key={status.status_id} value={status.status_name}>
                      {status.status_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Form.Select name="PRIORITY_NAME" value={formData.PRIORITY_NAME} onChange={handleChange}>
                  <option value="">Select</option>
                  {priorities.map(priority => (
                    <option key={priority.priority_id} value={priority.priority_name}>
                      {priority.priority_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Add Issue</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateModal;