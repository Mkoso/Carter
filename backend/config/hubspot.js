const hubspot = require('@hubspot/api-client');
require('dotenv').config();

const hubspotClient = new hubspot.Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN
});

const HUBSPOT_CONFIG = {
  clientId: process.env.HUBSPOT_CLIENT_ID,
  clientSecret: process.env.HUBSPOT_CLIENT_SECRET,
  redirectUri: process.env.HUBSPOT_REDIRECT_URI,
  scopes: [
    'crm.objects.contacts.read',
    'crm.objects.companies.read',
    'crm.objects.deals.read',
    'crm.objects.calls.read',
    'crm.objects.meetings.read'
  ]
};

module.exports = {
  hubspotClient,
  HUBSPOT_CONFIG
}; 