// src/components/ClaimHistory.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function ClaimHistory({ refresh }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await api.get("/history");
      setHistory(res.data);
    };
    fetchHistory();
  }, [refresh]);

  return (
    <div className="mb-5">
      <h2 className="text-center mb-3">📜 Claim History</h2>
      <ul className="list-group">
  {history.map((entry) => (
    <li key={entry._id} className="list-group-item">
      <strong>{entry.userId ? entry.userId.name : '🕵️ Unknown User'}</strong> claimed{' '}
      <span className="text-success fw-bold">{entry.points}</span> points at{' '}
      <em>{new Date(entry.claimedAt).toLocaleString()}</em>
    </li>
  ))}
</ul>

    </div>
  );
}
