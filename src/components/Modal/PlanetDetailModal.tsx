import React from 'react';
import { Planet, IResidentService } from '../../types';
import { useResidentsQuery } from '../../hooks/useResidentsQuery';
import { Modal } from './Modal';
import { ResidentCard } from './ResidentCard';
import { Charts } from './Charts';
import { Statistics } from './Statistics';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage';

interface PlanetDetailModalProps {
  planet: Planet | null;
  isOpen: boolean;
  onClose: () => void;
  residentService: IResidentService;
}

export const PlanetDetailModal: React.FC<PlanetDetailModalProps> = ({
  planet,
  isOpen,
  onClose,
  residentService
}) => {
  const { residents, loading, error, stats } = useResidentsQuery(
    planet?.residents || [],
    residentService
  );

  if (!planet) return null;

  const modalContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (residents.length === 0) {
      return (
        <div className="no-residents">
          <p>This planet has no known residents.</p>
        </div>
      );
    }

    return (
      <div className="planet-detail-content">
        {stats && <Statistics stats={stats} totalResidents={residents.length} />}
        
        <div className="residents-section">
          <h4 className="section-title">Residents</h4>
          <div className="residents-grid">
            {residents.map((resident: any) => (
              <ResidentCard key={resident.url} resident={resident} />
            ))}
          </div>
        </div>

        {stats && stats.genderDistribution.length > 0 && (
          <Charts 
            genderDistribution={stats.genderDistribution}
            heightData={stats.heightData}
          />
        )}
      </div>
    );
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`${planet.name} - Planet Details`}
    >
      <div className="planet-info">
        <div className="planet-basic-info">
          <div className="info-item">
            <span className="info-label">Climate:</span>
            <span className="info-value">{planet.climate}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Terrain:</span>
            <span className="info-value">{planet.terrain}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Population:</span>
            <span className="info-value">{planet.population}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Diameter:</span>
            <span className="info-value">{planet.diameter} km</span>
          </div>
        </div>
      </div>
      
      {modalContent()}
    </Modal>
  );
};