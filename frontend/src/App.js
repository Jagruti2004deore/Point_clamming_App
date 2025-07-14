// src/App.js
import React, { useState } from 'react';
import AddUser from './components/AddUser';
import UserSelector from './components/UserSelector';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import { Modal, Button } from 'react-bootstrap';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const triggerRefresh = (message = '') => {
    setRefresh(!refresh);
    if (message) {
      setModalMessage(message);
      setShowModal(true);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🔥 Points Claiming App</h1>
      <AddUser onUserAdded={triggerRefresh} />
      <UserSelector onClaim={(msg) => triggerRefresh(msg)} />

      {/* Leaderboard Top 3 Highlight */}
      <Leaderboard refresh={refresh} highlightTopThree={true} />

      {/* Claim History Button */}
      <div className="text-center mb-4">
        <Button variant="info" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? 'Hide Claim History' : 'Show Claim History'}
        </Button>
      </div>

      {showHistory && <ClaimHistory refresh={refresh} />}

      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🎉 Claim Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
