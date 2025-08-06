import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import CreateProjectModal from './CreateProjectModal';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // 👈 Initialize navigate

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/pls/apex/vs_works/bts_projects/');
      setProjects(response.data.items || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleProjectCreated = () => {
    fetchProjects();
    setShowModal(false);
  };

  const handleCardClick = (projectId) => {
    navigate(`/requirements/${projectId}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Projects</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Create Project
        </button>
      </div>

      <div className="row">
        {projects.map((project) => (
          <div key={project.project_id} className="col-md-4 mb-4">
            <div
              className="card shadow-sm h-100 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(project.project_id)}
            >
              <div className="card-body">
                <h5 className="card-title">{project.project_name}</h5>
                <p className="card-text">{project.description}</p>
                <p className="card-text">
                  <small className="text-muted">Created: {project.created_date?.split('T')[0]}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <CreateProjectModal
          closeModal={() => setShowModal(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}
    </div>
  );
}

export default Projects;