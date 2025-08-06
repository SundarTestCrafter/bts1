import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RequirementsPage() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('Requirements');

  const [requirements, setRequirements] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [testCases, setTestCases] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  // Load data when active tab or project changes
  useEffect(() => {
    if (activeTab === 'Requirements') fetchRequirements();
    else if (activeTab === 'Test Scenarios') fetchScenarios();
    else if (activeTab === 'Test Cases') fetchTestCases();
  }, [activeTab, projectId]);

  const fetchRequirements = async () => {
    const res = await axios.get(`/pls/apex/vs_works/bts_requirements/?project_id=${projectId}`);
    setRequirements(res.data.items || []);
  };

  const fetchScenarios = async () => {
    const res = await axios.get(`/pls/apex/vs_works/bts_test_scenarios/?project_id=${projectId}`);
    setScenarios(res.data.items || []);
  };

  const fetchTestCases = async () => {
    const res = await axios.get(`/pls/apex/vs_works/bts_test_cases/?project_id=${projectId}`);
    setTestCases(res.data.items || []);
  };

  const handleAdd = async () => {
    const apiMap = {
      'Requirements': '/pls/apex/vs_works/bts_requirements/',
      'Test Scenarios': '/pls/apex/vs_works/bts_test_scenarios/',
      'Test Cases': '/pls/apex/vs_works/bts_test_cases/',
    };

    if (!formData.title) {
      alert('Title is required');
      return;
    }

    try {
      await axios.post(apiMap[activeTab], { ...formData, project_id: projectId });
      setShowModal(false);
      setFormData({});
      if (activeTab === 'Requirements') fetchRequirements();
      else if (activeTab === 'Test Scenarios') fetchScenarios();
      else if (activeTab === 'Test Cases') fetchTestCases();
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.response?.data?.message || 'Unknown error');
    }
  };

  const renderList = () => {
    if (activeTab === 'Requirements') {
      return (
        <ul>
          {requirements.map((req) => (
            <li key={req.requirement_id}>
              <strong>{req.requirement_title}</strong> – {req.main_module} → {req.sub_module}
            </li>
          ))}
        </ul>
      );
    }

    if (activeTab === 'Test Scenarios') {
      return (
        <ul>
          {scenarios.map((s) => (
            <li key={s.scenario_id}>
              <strong>{s.scenario_title}</strong> – {s.scenario_description}
            </li>
          ))}
        </ul>
      );
    }

    if (activeTab === 'Test Cases') {
      return (
        <ul>
          {testCases.map((tc) => (
            <li key={tc.testcase_id}>
              <strong>{tc.title}</strong> – {tc.expected_result}
            </li>
          ))}
        </ul>
      );
    }

    return <div><i>Issues content coming soon...</i></div>;
  };

  const renderModalFields = () => {
    return (
      <>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {activeTab === 'Requirements' && (
          <>
            <div className="mb-3">
              <label>Main Module</label>
              <input
                className="form-control"
                value={formData.main_module || ''}
                onChange={(e) => setFormData({ ...formData, main_module: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Sub Module</label>
              <input
                className="form-control"
                value={formData.sub_module || ''}
                onChange={(e) => setFormData({ ...formData, sub_module: e.target.value })}
              />
            </div>
          </>
        )}

        {activeTab === 'Test Scenarios' && (
          <div className="mb-3">
            <label>Description</label>
            <input
              className="form-control"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        )}

        {activeTab === 'Test Cases' && (
          <>
            <div className="mb-3">
              <label>Description</label>
              <input
                className="form-control"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Expected Result</label>
              <input
                className="form-control"
                value={formData.expected_result || ''}
                onChange={(e) => setFormData({ ...formData, expected_result: e.target.value })}
              />
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="d-flex" style={{ height: '100vh'}}>
      {/* Sidebar */}
      <div style={{ width: '220px', backgroundColor: '#1aabeeff', color: 'white', padding: '1rem' }}>
        <h5>Project Menu</h5>
        <ul className="list-unstyled">
          {['Requirements', 'Test Scenarios', 'Test Cases', 'Issues'].map((tab) => (
            <li
              key={tab}
              style={{
                padding: '8px 0',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>{activeTab} for Project ID: {projectId}</h4>
          {activeTab !== 'Issues' && (
            <button className="btn btn-primary" onClick={() => {
              setFormData({});
              setShowModal(true);
            }}>
              + Add {activeTab}
            </button>
          )}
        </div>

        {renderList()}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add {activeTab}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">{renderModalFields()}</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAdd}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequirementsPage;