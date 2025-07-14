import React, { useState } from 'react';
import { api } from '../api';
import { Card, InputGroup, Button, Form } from 'react-bootstrap';
import '../styles/custom.css';

export default function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name) return;
    await api.post('/users', { name });
    setName("");
    onUserAdded();
  };

  return (
    <Card className="p-4 shadow-sm mb-4">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="primary" onClick={handleAdd} className="custom-btn">
          Add User
        </Button>
      </InputGroup>
    </Card>
  );
}