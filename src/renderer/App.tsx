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
  const [downloading, setDownloading] = useState(false);

  const handleDowload = () => {
    window.electron.ipcRenderer.sendMessage('download', []);
    setDownloading(true);
  };

  const handleRestartAndInstall = () => {
    window.electron.ipcRenderer.sendMessage('restart_app', []);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  window.electron.ipcRenderer.on('update_available', () => {
    console.log('-------->  update_available:');
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
          Update
        </Button>
      ) : null}
      {downloading ? <ProgressBar animated now={45} /> : null}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Woohoo, you're reading this text in a modal!`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRestartAndInstall}>
            Download
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
