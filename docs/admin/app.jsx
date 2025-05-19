import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/style.css'; // ensure correct path to Tailwind CSS

const App = () => {
  return (
    <div className="p-4 text-center text-xl text-blue-600">
           ✅ React is working!
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
