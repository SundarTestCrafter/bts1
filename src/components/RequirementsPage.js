import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddRequirementModal from './AddRequirementModal';
import AddTestScenarioModal from './AddTestScenarioModal';
import AddTestCaseModal from './AddTestCaseModal';

function RequirementsPage() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('requirements');
  const [requirements, setRequirements] = useState([]);
  const [testScenarios, setTestScenarios] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [showRequirementModal, setShowRequirementModal] = useState(false);
  const [showTestScenarioModal, setShowTestScenarioModal] = useState(false);
  const [showTestCaseModal, setShowTestCaseModal] = useState(false);

  useEffect(() => {
    fetchRequirements();
    fetchTestScenarios();
    fetchTestCases();
  }, [projectId]);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get('/pls/apex/vs_works/bts_requirements/');
      const filtered = response.data.items.filter(
        (item) => item.project_id === parseInt(projectId)
      );
      setRequirements(filtered);
    } catch (error) {
      console.error('Error fetching requirements:', error);
    }
  };

  const fetchTestScenarios = async () => {
    try {
      const response = await axios.get('/pls/apex/vs_works/bts_test_scenarios/');
      const filtered = response.data.items.filter(
        (item) => item.project_id === parseInt(projectId)
      );
      setTestScenarios(filtered);
    } catch (error) {
      console.error('Error fetching test scenarios:', error);
    }
  };

  const fetchTestCases = async () => {
    try {
      const response = await axios.get('/pls/apex/vs_works/bts_test_cases/');
      const filtered = response.data.items.filter(
        (item) => item.project_id === parseInt(projectId)
      );
      setTestCases(filtered);
    } catch (error) {
      console.error('Error fetching test cases:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'requirements':
        return (
          <div>
            {requirements.map((req) => (
              <div key={req.requirement_id} className="card mb-2">
                <div className="card-body">
                  <h5>{req.requirement_title}</h5>
                  <p>{req.description}</p>
                  <small className="text-muted">Main Module: {req.main_module}</small>
                </div>
              </div>
            ))}
          </div>
        );
      case 'test-scenarios':
        return (
          <div>
            {testScenarios.map((ts) => (
              <div key={ts.scenario_id} className="card mb-2">
                <div className="card-body">
                  <h5>{ts.scenario_title}</h5>
                  <p>{ts.objective}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'test-cases':
        return (
          <div>
            {testCases.map((tc) => (
              <div key={tc.test_case_id} className="card mb-2">
                <div className="card-body">
                  <h5>{tc.test_case_title}</h5>
                  <p><strong>Steps:</strong> {tc.test_steps}</p>
                  <p><strong>Expected Result:</strong> {tc.expected_result}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'issues':
        return <div><p>No issues loaded yet.</p></div>;
      default:
        return null;
    }
  };

  const renderAddButton = () => {
    switch (activeTab) {
      case 'requirements':
        return (
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={() => setShowRequirementModal(true)}>
              + Add Requirement
            </button>
          </div>
        );
      case 'test-scenarios':
        return (
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={() => setShowTestScenarioModal(true)}>
              + Add Test Scenario
            </button>
          </div>
        );
      case 'test-cases':
        return (
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={() => setShowTestCaseModal(true)}>
              + Add Test Case
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 border-end" style={{ minHeight: '100vh' }}>
          <div className="list-group mt-4">
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'requirements' ? 'active' : ''}`}
              onClick={() => setActiveTab('requirements')}
            >
              Requirements
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'test-scenarios' ? 'active' : ''}`}
              onClick={() => setActiveTab('test-scenarios')}
            >
              Test Scenarios
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'test-cases' ? 'active' : ''}`}
              onClick={() => setActiveTab('test-cases')}
            >
              Test Cases
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'issues' ? 'active' : ''}`}
              onClick={() => setActiveTab('issues')}
            >
              Issues
            </button>
          </div>
        </div>

        <div className="col-md-9 p-4">
          {renderAddButton()}
          {renderContent()}
        </div>
      </div>

      {showRequirementModal && (
        <AddRequirementModal
          projectId={parseInt(projectId)}
          closeModal={() => setShowRequirementModal(false)}
          onRequirementAdded={fetchRequirements}
        />
      )}

      {showTestScenarioModal && (
        <AddTestScenarioModal
          projectId={parseInt(projectId)}
          onClose={() => setShowTestScenarioModal(false)}
          onAdd={fetchTestScenarios}
        />
      )}

      {showTestCaseModal && (
        <AddTestCaseModal
          projectId={parseInt(projectId)}
          onClose={() => setShowTestCaseModal(false)}
          onAdd={fetchTestCases}
        />
      )}
    </div>
  );
}

export default RequirementsPage;