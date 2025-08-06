import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

function BugStatusChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const [bugsRes, statusRes] = await Promise.all([
          axios.get('/pls/apex/vs_works/bugs/bugsinfo/'),
          axios.get('/pls/apex/vs_works/bts_status/')
        ]);

        const bugs = bugsRes.data.items || [];
        const statuses = statusRes.data.items || [];

        // Map status_id to status_name
        const statusMap = {};
        statuses.forEach(status => {
          statusMap[String(status.status_id)] = status.status_name;
        });

        // Count bugs per status_id
        const counts = {};
        bugs.forEach(bug => {
          const statusId = String(bug.status_id);
          counts[statusId] = (counts[statusId] || 0) + 1;
        });

        // Prepare final chart data
        const formattedData = Object.entries(counts).map(([id, count]) => ({
          name: statusMap[id] || `Unknown (${id})`,
          count,
        }));

        setChartData(formattedData);
      } catch (err) {
        console.error('Failed to load chart data:', err);
      }
    }

    fetchChartData();
  }, []);

  return (
    <div>
      <h5>Bug Status</h5>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-20} interval={0} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BugStatusChart;