import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import Bugs from './components/Bugs';
import Requests from './components/Requests';
import IssueListView from './components/IssueListView';
import Users from './components/Users';
import Status from './components/Status';
import Priority from './components/Priority';
import Projects from './components/Projects';
import RequirementsPages from './components/RequirementsPages';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      <Route path="/bugs" element={<ProtectedRoute><Bugs /></ProtectedRoute>} />
      <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
      <Route path="/issues" element={<ProtectedRoute><IssueListView /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/status" element={<ProtectedRoute><Status /></ProtectedRoute>} />
      <Route path="/priority" element={<ProtectedRoute><Priority /></ProtectedRoute>} />

      {/* Route with dynamic project ID */}
      <Route
        path="/requirements/:projectId"
        element={<ProtectedRoute><RequirementsPages /></ProtectedRoute>}
      />
    </Routes>
  );
}

export default App;