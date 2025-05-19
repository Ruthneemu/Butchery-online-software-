import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/style.css'; // ensure correct path to Tailwind CSS
import {
  BrowserRouter as Router,
  Routes,
  Route 
} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Inventory from './pages/inventory';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        {/* Add more routes as needed */}
       
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
