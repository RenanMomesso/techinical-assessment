import React from 'react';
import { Planet, SortConfig, TableColumn } from '../../types';

interface TableHeaderProps {
  columns: TableColumn[];
  sortConfig: SortConfig | null;
  onSort: (key: keyof Planet | 'residentCount') => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  sortConfig,
  onSort
}) => {
  const getSortIcon = (columnKey: keyof Planet | 'residentCount') => {
    if (sortConfig?.key !== columnKey) {
      return '↕️';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.key}>
            {column.sortable ? (
              <button
                className="sort-button"
                onClick={() => onSort(column.key)}
                aria-label={`Sort by ${column.label}`}
              >
                {column.label} <span className="sort-icon">{getSortIcon(column.key)}</span>
              </button>
            ) : (
              column.label
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};