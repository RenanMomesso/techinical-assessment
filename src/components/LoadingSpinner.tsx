import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner" aria-label="Loading planets data">
        <div className="spinner"></div>
      </div>
      <p>Loading Star Wars planets...</p>
    </div>
  );
};