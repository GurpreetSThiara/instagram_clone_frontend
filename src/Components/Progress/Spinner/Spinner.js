// CircularProgress.js
import React from 'react';
import './Spinner.css'; // Import your CSS file

const Spinner = ({ isLoading }) => {
  return (
    <div className={`circular-progress ${isLoading ? 'show' : 'hide'}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
