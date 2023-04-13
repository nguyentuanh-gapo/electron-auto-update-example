import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import icon from '../../assets/icon.svg';
import './App.css';

function Hello() {
  const [show, setShow] = useState(false);
  const [hasNewVersion, setHasNewVersion] = useState(false);
  const [downloading, setDownloading] = useState(true);

  const handleDowload = () => {
    setDownloading(true);
    window.electron.ipcRenderer.sendMessage('download', []);
  };

  const handleRestartAndInstall = () => {
    window.electron.ipcRenderer.sendMessage('restart_app', []);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  window.electron.ipcRenderer.on('update_available', () => {
    setHasNewVersion(true);
  });

  window.electron.ipcRenderer.on('update_downloaded', () => {
    setDownloading(false);
    handleShow();
  });

  return (
    <div className="wrapper">
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1 style={{ textAlign: 'center' }}>Ahihi</h1>
      <h3 style={{ textAlign: 'center' }}>
        Version: {process.env.APP_VERSION}
      </h3>
      {hasNewVersion ? (
        <Button variant="primary" onClick={handleDowload}>
          Update Now
        </Button>
      ) : null}
      {downloading ? (
        <div className="d-flex flex-column w-100 align-items-center">
          Downloading
          <ProgressBar
            animated
            now={100}
            style={{ width: '100%', height: 5 }}
          />
        </div>
      ) : null}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Update Downloaded. It will be installed on restart. Restart now?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleRestartAndInstall}>
            Restart and install
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
