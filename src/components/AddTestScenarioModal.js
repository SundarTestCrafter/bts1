import React, { useState } from 'react';
import axios from 'axios';

const AddTestScenarioModal = ({ show, onClose, onAdd, projectId }) => {
  const [scenarioTitle, setScenarioTitle] = useState('');

  if (!show) return null;

  const handleSubmit = async () => {
    if (!scenarioTitle.trim()) {
      alert('Scenario title is required.');
      return;
    }

    try {
      const response = await axios.post('/pls/apex/vs_works/bts_test_scenarios/', {
        project_id: projectId,
        scenario_title: scenarioTitle,
      });

      console.log('Scenario added:', response);

      if (response.status === 201 || response.status === 200) {
        onAdd();   // Refresh list
        onClose(); // Close modal
      } else {
        console.error('Unexpected response:', response);
        alert('Unexpected server response. Please try again.');
      }
    } catch (error) {
      console.error('Error adding scenario:', error.response?.data || error.message);
      alert('Failed to add scenario. Please check project_id and try again.');
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Test Scenario</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Scenario Title</label>
              <input
                type="text"
                className="form-control"
                value={scenarioTitle}
                onChange={(e) => setScenarioTitle(e.target.value)}
                placeholder="Enter test scenario title"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button onClick={handleSubmit} className="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTestScenarioModal;