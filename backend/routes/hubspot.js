const express = require('express');
const router = express.Router();
const hubspotService = require('../services/hubspot');
const cron = require('node-cron');

// Initialize OAuth flow
router.get('/auth/initiate', (req, res) => {
  const authUrl = hubspotService.getAuthUrl();
  res.redirect(authUrl);
});

// Handle OAuth callback
router.get('/auth/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const { userId } = req.user; // Assuming you have user authentication middleware

    const tokenResponse = await hubspotService.getAccessToken(code);
    
    // Store the access token securely (e.g., in database)
    // await storeAccessToken(userId, tokenResponse.access_token);

    // Initial sync
    await hubspotService.syncAllHubSpotData(userId, tokenResponse.access_token);

    res.json({ success: true, message: 'HubSpot integration successful' });
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'Failed to complete HubSpot integration' });
  }
});

// Manual sync endpoints
router.post('/sync/calls', async (req, res) => {
  try {
    const { userId } = req.user;
    const { accessToken } = req.body;

    const calls = await hubspotService.syncHubSpotCalls(userId, accessToken);
    res.json({ success: true, data: calls });
  } catch (error) {
    console.error('Sync calls error:', error);
    res.status(500).json({ error: 'Failed to sync calls' });
  }
});

router.post('/sync/meetings', async (req, res) => {
  try {
    const { userId } = req.user;
    const { accessToken } = req.body;

    const meetings = await hubspotService.syncHubSpotMeetings(userId, accessToken);
    res.json({ success: true, data: meetings });
  } catch (error) {
    console.error('Sync meetings error:', error);
    res.status(500).json({ error: 'Failed to sync meetings' });
  }
});

router.post('/sync/deals', async (req, res) => {
  try {
    const { userId } = req.user;
    const { accessToken } = req.body;

    const deals = await hubspotService.syncHubSpotDeals(userId, accessToken);
    res.json({ success: true, data: deals });
  } catch (error) {
    console.error('Sync deals error:', error);
    res.status(500).json({ error: 'Failed to sync deals' });
  }
});

// Schedule automatic sync every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  try {
    // Get all users with HubSpot integration
    // const users = await getUsersWithHubSpotIntegration();
    
    // for (const user of users) {
    //   await hubspotService.syncAllHubSpotData(user.id, user.hubspotAccessToken);
    // }
    
    console.log('Scheduled HubSpot sync completed');
  } catch (error) {
    console.error('Scheduled sync error:', error);
  }
});

module.exports = router; 