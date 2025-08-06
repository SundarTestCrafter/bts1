import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateProjectModal({ closeModal, onProjectCreated }) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/pls/apex/vs_works/bts_users/')
      .then(response => {
        const items = response.data.items || [];
        setUsers(items);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleCreate = async () => {
    if (!projectName || !createdDate || !createdBy) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const isoDate = new Date(createdDate).toISOString();

      await axios.post('/pls/apex/vs_works/bts_projects/', {
        project_name: projectName,
        description: description,
        created_date: isoDate,
        created_by: createdBy
      });

      alert('Project created successfully');
      onProjectCreated(); // ✅ Refresh list + close modal
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title">Create Project</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Project Name *</label>
              <input
                type="text"
                className="form-control"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Created Date *</label>
              <input
                type="date"
                className="form-control"
                value={createdDate}
                onChange={(e) => setCreatedDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Created By *</label>
              <select
                className="form-select"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
              >
                <option value="">-- Select User --</option>
                {users.map(user => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectModal;