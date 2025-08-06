import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BugMessageSlider = () => {
  const [messages, setMessages] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchBugMessages = async () => {
      try {
        const bugRes = await axios.get('/pls/apex/vs_works/bugs/bugsinfo/');
        const bugs = bugRes.data.items;

        const total = bugs.length;
        const critical = bugs.filter(b => b.priority === 'Critical').length;
        const newBugs = bugs.filter(b => b.status_id === 1).length;
        const closedBugs = bugs.filter(b => b.status_id ===2).length;

        const msgList = [
          `Total Bugs: ${total}`,
          `Critical Bugs: ${critical}`,
          `New Bugs: ${newBugs}`,
          `Closed Bugs: ${closedBugs}` ,
        ];

        setMessages(msgList);
      } catch (err) {
        setMessages(['Error fetching bug data']);
      }
    };

    fetchBugMessages();
  }, []);

  // Slider rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div style={{
      backgroundColor: '#e0f7fa',
      color: '#006064',
      padding: '10px 15px',
      marginBottom: '20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {messages.length > 0 ? (
        <div style={{ animation: 'fade 0.5s' }}>{messages[current]}</div>
      ) : (
        <div>Loading messages...</div>
      )}
    </div>
  );
};

export default BugMessageSlider;