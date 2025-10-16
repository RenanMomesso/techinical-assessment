import { Resident, IResidentService } from '../types';

const fetchResident = async (url: string): Promise<Resident> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching resident:', error);
    throw new Error('Failed to fetch resident data');
  }
};

const getMultipleResidents = async (urls: string[]): Promise<Resident[]> => {
  try {
    const promises = urls.map(url => fetchResident(url));
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching multiple residents:', error);
    throw new Error('Failed to fetch residents data');
  }
};

export const residentService: IResidentService = {
  getResident: fetchResident,
  getMultipleResidents
};