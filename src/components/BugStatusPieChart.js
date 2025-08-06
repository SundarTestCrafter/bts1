import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#00C49F', '#FF9F40', '#A28FFF'];

function BugStatusPieChart() {
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

        // Count bugs per status
        const counts = {};
        bugs.forEach(bug => {
          const statusId = String(bug.status_id);
          counts[statusId] = (counts[statusId] || 0) + 1;
        });

        // Format data for pie chart
        const formattedData = Object.entries(counts).map(([id, value]) => ({
          name: statusMap[id] || `Unknown (${id})`,
          value,
        }));

        setChartData(formattedData);
      } catch (err) {
        console.error('Failed to load pie chart data:', err);
      }
    }

    fetchChartData();
  }, []);

  return (
    <div>
      <h5>Bug Status</h5>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BugStatusPieChart;