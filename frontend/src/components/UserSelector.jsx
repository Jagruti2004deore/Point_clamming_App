// src/components/UserSelector.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Button, Form, Row, Col, InputGroup, Card, Alert, Spinner } from 'react-bootstrap';
import { FaUser, FaBullseye } from 'react-icons/fa';
import '../styles/custom.css';

export default function UserSelector({ onClaim }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClaim = async () => {
    if (!selectedUser) return;

    const res = await api.post(`/claim/${selectedUser}`);
    const { claimedPoints, user } = res.data;

    setMessage(`🎉 ${user.name} claimed ${claimedPoints} points!`);
    onClaim(`${user.name} claimed ${claimedPoints} points!`);

    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <>
      {message && <Alert variant="success">{message}</Alert>}
      <Card className="p-4 shadow-sm bg-light-gradient">
        <Row className="align-items-end g-3">
          <Col xs={12} md={6} lg={4}>
            <InputGroup>
              {loading ? (
                <Spinner animation="border" size="sm" className="me-2" />
              ) : (
                <span className="input-group-text"><FaUser /></span>
              )}
              <Form.Select
                className="shadow-sm"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Select a user</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>

          <Col xs="auto">
            <Button
              variant="success"
              className="shadow-sm custom-btn"
              onClick={handleClaim}
              disabled={!selectedUser}
            >
              <FaBullseye className="me-2" /> Claim Points
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
