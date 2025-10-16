import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterControls } from '../Table/FilterControls';

describe('FilterControls', () => {
  const defaultProps = {
    filterConfig: {
      climate: '',
      terrain: ''
    },
    onFilterChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filter inputs', () => {
    render(<FilterControls {...defaultProps} />);

    expect(screen.getByLabelText('Filter by Climate:')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by Terrain:')).toBeInTheDocument();
  });

  it('displays current filter values', () => {
    const propsWithValues = {
      ...defaultProps,
      filterConfig: {
        climate: 'arid',
        terrain: 'desert'
      }
    };

    render(<FilterControls {...propsWithValues} />);

    expect(screen.getByDisplayValue('arid')).toBeInTheDocument();
    expect(screen.getByDisplayValue('desert')).toBeInTheDocument();
  });

  it('calls onFilterChange when climate filter changes', () => {
    render(<FilterControls {...defaultProps} />);

    const climateInput = screen.getByLabelText('Filter by Climate:');
    fireEvent.change(climateInput, { target: { value: 'arid' } });

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      climate: 'arid',
      terrain: ''
    });
  });

  it('calls onFilterChange when terrain filter changes', () => {
    render(<FilterControls {...defaultProps} />);

    const terrainInput = screen.getByLabelText('Filter by Terrain:');
    fireEvent.change(terrainInput, { target: { value: 'desert' } });

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      climate: '',
      terrain: 'desert'
    });
  });

  it('handles clear button functionality', () => {
    const propsWithValues = {
      ...defaultProps,
      filterConfig: {
        climate: 'arid',
        terrain: 'desert'
      }
    };

    render(<FilterControls {...propsWithValues} />);

    const clearButton = screen.getByText('Clear Filters');
    fireEvent.click(clearButton);

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      climate: '',
      terrain: ''
    });
  });
});