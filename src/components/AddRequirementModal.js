import React, { useState } from 'react';
import axios from 'axios';

function AddRequirementModal({ projectId, onClose, onRequirementAdded }) {
  const [requirementTitle, setRequirementTitle] = useState('');
  const [mainModule, setMainModule] = useState('');
  const [subModule, setSubModule] = useState('');

  const handleAdd = async () => {
    if (!requirementTitle || !mainModule || !subModule) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await axios.post('/pls/apex/vs_works/bts_requirements/', {
        project_id: projectId,
        requirement_title: requirementTitle,
        main_module: mainModule,
        sub_module: subModule
      });
      onRequirementAdded(); // refresh list
    } catch (error) {
      console.error('Failed to add requirement:', error);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Requirement</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Requirement Title</label>
              <input
                type="text"
                className="form-control"
                value={requirementTitle}
                onChange={(e) => setRequirementTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Main Module</label>
              <input
                type="text"
                className="form-control"
                value={mainModule}
                onChange={(e) => setMainModule(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Sub Module</label>
              <input
                type="text"
                className="form-control"
                value={subModule}
                onChange={(e) => setSubModule(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAdd}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRequirementModal;