import React from 'react';
import { ResidentStats } from '../../types';

interface StatisticsProps {
  stats: ResidentStats;
  totalResidents: number;
}

export const Statistics: React.FC<StatisticsProps> = ({ stats, totalResidents }) => {
  return (
    <div className="statistics-container">
      <h4 className="statistics-title">Planet Statistics</h4>
      
      <div className="statistics-grid">
        <div className="stat-item">
          <div className="stat-value">{totalResidents}</div>
          <div className="stat-label">Total Residents</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.averageHeight || 'N/A'}</div>
          <div className="stat-label">Average Height (cm)</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.averageMass || 'N/A'}</div>
          <div className="stat-label">Average Mass (kg)</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.genderDistribution.length}</div>
          <div className="stat-label">Unique Genders</div>
        </div>
      </div>
    </div>
  );
};