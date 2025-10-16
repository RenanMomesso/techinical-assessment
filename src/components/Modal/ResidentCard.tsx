import React from 'react';
import { Resident } from '../../types';

interface ResidentCardProps {
  resident: Resident;
}

export const ResidentCard: React.FC<ResidentCardProps> = ({ resident }) => {
  const formatHeight = (height: string): string => {
    const numHeight = parseFloat(height);
    if (isNaN(numHeight)) return height;
    return `${height} cm`;
  };

  const formatMass = (mass: string): string => {
    if (mass === 'unknown') return 'Unknown';
    const numMass = parseFloat(mass.replace(/,/g, ''));
    if (isNaN(numMass)) return mass;
    return `${mass} kg`;
  };

  const formatGender = (gender: string): string => {
    if (gender === 'n/a') return 'Unknown';
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  return (
    <div className="resident-card">
      <div className="resident-header">
        <h4 className="resident-name">{resident.name}</h4>
        <span className="resident-birth-year">{resident.birth_year}</span>
      </div>
      
      <div className="resident-details">
        <div className="resident-detail">
          <span className="detail-label">Height:</span>
          <span className="detail-value">{formatHeight(resident.height)}</span>
        </div>
        
        <div className="resident-detail">
          <span className="detail-label">Mass:</span>
          <span className="detail-value">{formatMass(resident.mass)}</span>
        </div>
        
        <div className="resident-detail">
          <span className="detail-label">Gender:</span>
          <span className="detail-value">{formatGender(resident.gender)}</span>
        </div>
      </div>
    </div>
  );
};