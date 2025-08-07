import React, { useState } from 'react';
import axios from 'axios';

function AddTestCaseModal({ projectId, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState('');
  const [expectedResult, setExpectedResult] = useState('');

  const handleSubmit = async () => {
    if (!title || !steps || !expectedResult) {
      alert("All fields are required.");
      return;
    }

    try {
      await axios.post('/pls/apex/vs_works/bts_test_cases/', {
        project_id: projectId,
        test_case_title: title,
        test_steps: steps,
        expected_result: expectedResult
      });

      onAdd(); // refresh the list
      onClose(); // close modal
    } catch (error) {
      console.error('Error adding test case:', error);
      alert('Failed to add test case. Please try again.');
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Add Test Case</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Test Case Title</label>
              <textarea
                className="form-control"
                rows="2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter test case title"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Test Steps</label>
              <textarea
                className="form-control"
                rows="3"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="Enter step-by-step instructions"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Expected Result</label>
              <textarea
                className="form-control"
                rows="2"
                value={expectedResult}
                onChange={(e) => setExpectedResult(e.target.value)}
                placeholder="Describe expected result"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Add Test Case</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddTestCaseModal;