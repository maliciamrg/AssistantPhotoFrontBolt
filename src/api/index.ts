import axios from 'axios';
import { Photo, SeanceType, SeanceRepertoire } from '../types';

// Mock data and helper functions
const mockValidateRepertoire = (name: string): Promise<{ status: 'ok' | 'invalid' }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock validation logic - returns 'ok' for names longer than 3 characters
      resolve({ status: name.length > 3 ? 'ok' : 'invalid' });
    }, 500); // Simulate network delay
  });
};

// API functions
export const getPhotos = async (repertoireName: string, repertoirePath: string): Promise<Photo[]> => {
  try {
    const response = await axios.get(`/api/photos?repertoire=${repertoireName}&path=${repertoirePath}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};

export const updatePhoto = async (photoId: string, updates: Partial<Photo>): Promise<Photo> => {
  try {
    const response = await axios.patch(`/api/photos/${photoId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating photo:', error);
    throw error;
  }
};

export const sendUpdatedPhotos = async (photos: Photo[]): Promise<void> => {
  try {
    await axios.post('/api/photos/batch', { photos });
  } catch (error) {
    console.error('Error sending updated photos:', error);
    throw error;
  }
};

export const getSeanceTypes = async (): Promise<SeanceType[]> => {
  try {
    const response = await axios.get('/api/seance-types');
    return response.data;
  } catch (error) {
    console.error('Error fetching seance types:', error);
    return [];
  }
};

export const updateGetPhotos = async (repertoireName: string, repertoirePath: string): Promise<void> => {
  try {
    await axios.post('/api/photos/refresh', { repertoireName, repertoirePath });
  } catch (error) {
    console.error('Error refreshing photos:', error);
    throw error;
  }
};

export const getSeanceRepertoire = async (typeId: string): Promise<SeanceRepertoire[]> => {
  try {
    const response = await axios.get(`/api/seance-repertoire/${typeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching seance repertoire:', error);
    return [];
  }
};

export const validateRepertoire = async (name: string): Promise<{ status: 'ok' | 'invalid' }> => {
  // Use the mock function instead of making a real API call
  return mockValidateRepertoire(name);
};