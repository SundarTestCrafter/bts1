import React, { useState } from 'react';
import axios from 'axios';

function AddRequirementModal({ projectId, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [mainModule, setMainModule] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !mainModule.trim()) {
      alert('Title and Main Module are required.');
      return;
    }

    setLoading(true);

    try {
      await axios.post('/pls/apex/vs_works/bts_requirements/', {
        project_id: projectId,
        requirement_title: title,
        main_module: mainModule,
        description: description
      });

      setSuccess(true);
      setTitle('');
      setMainModule('');
      setDescription('');
      onAdd(); // refresh list

      // Close after a brief delay
      setTimeout(() => {
        setSuccess(false);
        setLoading(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error adding requirement:', error);
      alert('Failed to add requirement.');
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content shadow">
            <div className="modal-header">
              <h5 className="modal-title">Add Requirement</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={loading}
              ></button>
            </div>

            <div className="modal-body">
              {success && (
                <div className="alert alert-success">
                  Requirement added successfully!
                </div>
              )}

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Main Module"
                value={mainModule}
                onChange={(e) => setMainModule(e.target.value)}
                disabled={loading}
              />

              <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              ></textarea>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRequirementModal;