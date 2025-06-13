const { hubspotClient, HUBSPOT_CONFIG } = require('../config/hubspot');
const Call = require('../models/Call');
const Meeting = require('../models/Meeting');

// OAuth2 authentication
const getAuthUrl = () => {
  const scopes = HUBSPOT_CONFIG.scopes.join(' ');
  return `https://app.hubspot.com/oauth/authorize?client_id=${HUBSPOT_CONFIG.clientId}&redirect_uri=${HUBSPOT_CONFIG.redirectUri}&scope=${scopes}`;
};

const getAccessToken = async (code) => {
  try {
    const response = await hubspotClient.oauth.tokensApi.create(
      'authorization_code',
      code,
      HUBSPOT_CONFIG.redirectUri,
      HUBSPOT_CONFIG.clientId,
      HUBSPOT_CONFIG.clientSecret
    );
    return response;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

// Data synchronization functions
const syncHubSpotCalls = async (userId, accessToken) => {
  try {
    const calls = await hubspotClient.crm.objects.calls.basicApi.getPage(
      undefined,
      undefined,
      ['timestamp', 'duration', 'fromNumber', 'toNumber', 'status', 'recordingUrl', 'summary', 'direction'],
      undefined,
      undefined,
      undefined,
      accessToken
    );

    // Convert and save calls to MongoDB
    const callPromises = calls.results.map(call => {
      const callData = {
        hubspotId: call.id,
        userId,
        timestamp: new Date(call.properties.timestamp),
        duration: parseInt(call.properties.duration) || 0,
        fromNumber: call.properties.fromNumber,
        toNumber: call.properties.toNumber,
        status: call.properties.status,
        recordingUrl: call.properties.recordingUrl,
        summary: call.properties.summary,
        direction: call.properties.direction,
        contactId: call.associations?.contacts?.[0]?.id || '',
        companyId: call.associations?.companies?.[0]?.id || '',
        dealId: call.associations?.deals?.[0]?.id || ''
      };

      return Call.findOneAndUpdate(
        { hubspotId: call.id },
        callData,
        { upsert: true, new: true }
      );
    });

    await Promise.all(callPromises);
    return calls.results;
  } catch (error) {
    console.error('Error syncing calls:', error);
    throw error;
  }
};

const syncHubSpotMeetings = async (userId, accessToken) => {
  try {
    const meetings = await hubspotClient.crm.objects.meetings.basicApi.getPage(
      undefined,
      undefined,
      ['timestamp', 'subject', 'participants', 'duration', 'recordingUrl', 'notes'],
      undefined,
      undefined,
      undefined,
      accessToken
    );

    // Convert and save meetings to MongoDB
    const meetingPromises = meetings.results.map(meeting => {
      const meetingData = {
        hubspotId: meeting.id,
        userId,
        timestamp: new Date(meeting.properties.timestamp),
        subject: meeting.properties.subject,
        participants: meeting.properties.participants ? meeting.properties.participants.split(',') : [],
        duration: parseInt(meeting.properties.duration) || 0,
        recordingUrl: meeting.properties.recordingUrl,
        notes: meeting.properties.notes,
        contactIds: meeting.associations?.contacts?.map(c => c.id) || [],
        companyIds: meeting.associations?.companies?.map(c => c.id) || [],
        dealIds: meeting.associations?.deals?.map(d => d.id) || []
      };

      return Meeting.findOneAndUpdate(
        { hubspotId: meeting.id },
        meetingData,
        { upsert: true, new: true }
      );
    });

    await Promise.all(meetingPromises);
    return meetings.results;
  } catch (error) {
    console.error('Error syncing meetings:', error);
    throw error;
  }
};

// Full sync function
const syncAllHubSpotData = async (userId, accessToken) => {
  try {
    await Promise.all([
      syncHubSpotCalls(userId, accessToken),
      syncHubSpotMeetings(userId, accessToken)
    ]);
    return { success: true, message: 'All data synced successfully' };
  } catch (error) {
    console.error('Error in full sync:', error);
    throw error;
  }
};

module.exports = {
  getAuthUrl,
  getAccessToken,
  syncHubSpotCalls,
  syncHubSpotMeetings,
  syncAllHubSpotData
}; 