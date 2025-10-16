// Domain types for Star Wars API
export interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  residents: string[];
  diameter: string;
  url: string;
}

export interface Resident {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  url: string;
}

export interface SWAPIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Application types
export interface TableColumn {
  key: keyof Planet | 'residentCount';
  label: string;
  sortable: boolean;
}

export interface SortConfig {
  key: keyof Planet | 'residentCount';
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  climate: string;
  terrain: string;
}

// Service interfaces
export interface IPlanetService {
  getAllPlanets(): Promise<Planet[]>;
}

export interface IResidentService {
  getResident(url: string): Promise<Resident>;
  getMultipleResidents(urls: string[]): Promise<Resident[]>;
}

// Hook interfaces
export interface UsePlanetsResult {
  planets: Planet[];
  loading: boolean;
  error: string | null;
}

export interface UseTableResult {
  currentPageData: Planet[];
  currentPage: number;
  totalPages: number;
  sortConfig: SortConfig | null;
  filterConfig: FilterConfig;
  setCurrentPage: (page: number) => void;
  handleSort: (key: keyof Planet | 'residentCount') => void;
  handleFilter: (filterConfig: FilterConfig) => void;
}

// Modal types
export interface ResidentStats {
  averageHeight: number;
  averageMass: number;
  genderDistribution: GenderDistribution[];
  heightData: HeightData[];
}

export interface GenderDistribution {
  gender: string;
  count: number;
  percentage: number;
}

export interface HeightData {
  name: string;
  height: number;
}