import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

function Hello() {
  return (
    <div className="wrapper">
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1 style={{ textAlign: 'center' }}>Ahihi</h1>
      <h3 style={{ textAlign: 'center' }}>
        Version: {process.env.APP_VERSION}
      </h3>
      <button type="button">Update</button>
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
