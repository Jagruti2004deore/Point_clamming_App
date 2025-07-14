// src/components/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Table, Card, Row, Col, Badge } from 'react-bootstrap';
import { FaCrown, FaMedal } from 'react-icons/fa';
import '../styles/custom.css';

export default function Leaderboard({ refresh, highlightTopThree }) {
  const [users, setUsers] = useState([]);

  const fetchLeaderboard = async () => {
    const res = await api.get("/leaderboard");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [refresh]);

  const topThree = users.slice(0, 3);
  const others = users.slice(3);

  return (
    <div className="mb-5">
      <h3 className="text-center mt-4 mb-3">🏆 Leaderboard</h3>

      {highlightTopThree && (
        <Row className="mb-4 justify-content-center text-center">
          {topThree.map((user, index) => (
            <Col key={user._id} xs={12} md={4}>
              <Card
                border="light"
                className="mb-2 shadow-sm leaderboard-card"
                style={{
                  backgroundColor:
                    index === 0 ? '#fff6d1' :
                    index === 1 ? '#e3f2fd' :
                    '#f3e5f5'
                }}
              >
                <Card.Body>
                  <div className="mb-2">
                    {index === 0 && <FaCrown size={24} color="gold" />}
                    {index === 1 && <FaMedal size={20} color="silver" />}
                    {index === 2 && <FaMedal size={20} color="#cd7f32" />}
                  </div>
                  <h5>
                    <Badge bg={index === 0 ? "warning" : index === 1 ? "primary" : "secondary"}>
                      {index + 1}
                    </Badge>
                  </h5>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>Total Points: {user.totalPoints}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th className="rank-col">Rank</th>
            <th>User</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {others.map((u, index) => (
            <tr key={u._id}>
              <td className="text-center">{index + 4}</td>
              <td>{u.name}</td>
              <td>{u.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
