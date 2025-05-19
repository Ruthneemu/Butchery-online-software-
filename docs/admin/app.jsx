import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/style.css'; // ensure correct path to Tailwind CSS
import {
  BrowserRouter as Router,
  Routes,
  Route 
} from 'react-router-dom';
import Dashboard from './pages/dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
       
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
