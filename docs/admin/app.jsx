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
import Sales from './pages/sales';
import Reports from './pages/reports';
const App = () => {
  return (
    <Router>
      <Routes>
        <Routine path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
