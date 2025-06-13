import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// HubSpot API endpoints
export const hubspotApi = {
  // Auth
  initiateAuth: () => `${API_BASE_URL}/hubspot/auth/initiate`,
  handleCallback: (code) => `${API_BASE_URL}/hubspot/auth/callback?code=${code}`,

  // Sync
  syncCalls: () => `${API_BASE_URL}/hubspot/sync/calls`,
  syncMeetings: () => `${API_BASE_URL}/hubspot/sync/meetings`,
  syncDeals: () => `${API_BASE_URL}/hubspot/sync/deals`,
};

// API functions
export const initiateHubSpotAuth = () => {
  window.location.href = hubspotApi.initiateAuth();
};

export const handleHubSpotCallback = async (code) => {
  try {
    const response = await api.get(hubspotApi.handleCallback(code));
    return response.data;
  } catch (error) {
    console.error('Error handling HubSpot callback:', error);
    throw error;
  }
};

export const syncHubSpotCalls = async () => {
  try {
    const response = await api.post(hubspotApi.syncCalls());
    return response.data;
  } catch (error) {
    console.error('Error syncing calls:', error);
    throw error;
  }
};

export const syncHubSpotMeetings = async () => {
  try {
    const response = await api.post(hubspotApi.syncMeetings());
    return response.data;
  } catch (error) {
    console.error('Error syncing meetings:', error);
    throw error;
  }
};

export const syncHubSpotDeals = async () => {
  try {
    const response = await api.post(hubspotApi.syncDeals());
    return response.data;
  } catch (error) {
    console.error('Error syncing deals:', error);
    throw error;
  }
};

export default api; 