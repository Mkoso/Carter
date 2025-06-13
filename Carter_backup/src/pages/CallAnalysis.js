import React, { useState } from 'react';
import {
  PhoneIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

// Sample data for calls
const calls = [
  {
    id: 1,
    customer: 'TechCorp Inc',
    date: '2024-03-15',
    salesRep: 'John Doe',
    duration: '45 min',
    transcription: `[00:00] John: Hi Sarah, this is John from Carter. Thanks for taking the time to speak with me today. How are you doing?

[00:05] Sarah: Hi John, I'm doing well, thanks. I've been looking forward to learning more about your solution.

[00:08] John: Great to hear that. Before we dive in, could you tell me a bit about TechCorp and what you're currently using for your sales process?

[00:15] Sarah: Sure. We're a mid-sized tech company with about 200 employees. Currently, we're using a basic CRM system, but we're struggling with call analytics and team performance tracking. Our sales team has grown to 25 people, and we need better insights.

[00:30] John: I understand. What specific challenges are you facing with your current setup?

[00:35] Sarah: Well, we can't track call quality effectively, and it's hard to identify coaching opportunities. Also, our managers spend too much time manually reviewing calls.

[00:45] John: Those are common challenges. Our AI-powered platform actually addresses these exact issues. We provide automated call analysis, sentiment tracking, and actionable insights for coaching. Would you like me to walk you through how it works?

[01:00] Sarah: Yes, that would be helpful. How does the AI analysis work in practice?

[01:05] John: Our system records and transcribes calls in real-time, then analyzes key metrics like talk ratio, sentiment, and identifies important topics. It also provides specific recommendations for improvement. Let me show you a demo...

[Conversation continues with product demonstration and specific use cases]

[44:30] Sarah: This looks exactly like what we need. What's the implementation process like?

[44:45] John: We can have you up and running within two weeks. We'll start with a pilot program for your top 5 sales reps, then roll out to the full team. Would you like to discuss next steps?`,
    talkRatio: '60/40',
    sentiment: 'Positive',
    keywords: ['implementation', 'coaching', 'analytics', 'CRM', 'pilot program'],
    recommendations: [
      'Consider discussing pricing earlier in the conversation',
      'Add more specific ROI examples for mid-sized companies',
      'Include case studies from similar tech companies'
    ]
  },
  {
    id: 2,
    customer: 'StartupX',
    date: '2024-03-14',
    salesRep: 'Sarah Miller',
    duration: '30 min',
    transcription: `[00:00] Sarah: Hi Michael, this is Sarah from Carter. Thanks for joining our call today.

[00:03] Michael: Hi Sarah, thanks for reaching out. I've heard good things about your platform.

[00:07] Sarah: That's great to hear. I understand you're a fast-growing startup. Could you tell me more about your current sales process?

[00:15] Michael: We're a team of 10 sales reps, growing quickly. We're using a combination of tools - some basic call recording software and a spreadsheet for tracking. It's becoming unmanageable.

[00:25] Sarah: I see. What's the biggest pain point you're experiencing with this setup?

[00:30] Michael: Honestly, we're flying blind. We don't know if our calls are effective, and our onboarding process for new reps isn't structured. We need something that can help us scale our sales process.

[00:45] Sarah: That's exactly where Carter can help. Our platform provides structured call analysis and automated coaching recommendations. Let me show you how it works...

[Conversation continues with platform demonstration]

[29:30] Michael: This looks promising. What's the pricing structure?

[29:45] Sarah: We offer flexible plans based on team size. For your current team of 10, it would be $X per user per month. Would you like me to send over the detailed pricing?`,
    talkRatio: '70/30',
    sentiment: 'Neutral',
    keywords: ['scaling', 'onboarding', 'pricing', 'team size', 'growth'],
    recommendations: [
      'Better qualification of budget constraints',
      'More specific next steps and timeline',
      'Follow up on onboarding process details'
    ]
  },
  {
    id: 3,
    customer: 'Global Solutions',
    date: '2024-03-13',
    salesRep: 'Mike Brown',
    duration: '35 min',
    transcription: `[00:00] Mike: Hi David, this is Mike from Carter. Thanks for making time for this call.

[00:03] David: Hi Mike, no problem. I've been curious about your solution since our last email exchange.

[00:07] Mike: Great. I understand you're looking to improve your sales team's performance. Could you tell me more about your current challenges?

[00:15] David: We have a global sales team of 50 people across different time zones. Our main challenge is maintaining consistent quality across all regions and ensuring our coaching is effective.

[00:25] Mike: That's a common challenge for global teams. How are you currently handling quality assurance and coaching?

[00:30] David: We have regional managers reviewing calls, but it's not scalable. We need a more systematic approach.

[00:40] Mike: I understand. Our platform actually specializes in global sales teams. We provide automated call analysis in multiple languages and region-specific insights. Let me show you...

[Conversation continues with platform features and global capabilities]

[34:30] David: This could be exactly what we need. What's the implementation timeline for a team our size?

[34:45] Mike: We can implement in phases, starting with your largest region. Typically, we can have the first phase live within three weeks. Would you like to discuss the implementation plan in detail?`,
    talkRatio: '65/35',
    sentiment: 'Positive',
    keywords: ['global team', 'scaling', 'coaching', 'implementation', 'regions'],
    recommendations: [
      'Include more specific examples of global team success stories',
      'Discuss language support capabilities in detail',
      'Address time zone management features'
    ]
  }
];

// Helper function to parse transcription string into an array of objects
const parseTranscription = (transcriptString) => {
  const utterances = [];
  const lines = transcriptString.split(/\n\n+/); // Split by double newlines for paragraphs

  lines.forEach(line => {
    const match = line.match(/\[(\d{2}:\d{2})\]\s*([^:]+):\s*(.*)/);
    if (match) {
      utterances.push({
        timestamp: `[${match[1]}]`,
        speaker: match[2].trim(),
        text: match[3].trim()
      });
    }
  });
  return utterances;
};

function CallAnalysis() {
  const [selectedCall, setSelectedCall] = useState(null);
  const [showFullTranscript, setShowFullTranscript] = useState(false);

  // Parse transcription when a call is selected
  const parsedTranscript = selectedCall ? parseTranscription(selectedCall.transcription) : [];
  const displayedTranscript = showFullTranscript ? parsedTranscript : parsedTranscript.slice(0, 5);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Call Analysis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calls List */}
        <div className="lg:col-span-1">
          <div className="bg-[#26272e] shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Recent Calls</h2>
            <div className="space-y-4">
              {calls.map((call) => (
                <button
                  key={call.id}
                  onClick={() => setSelectedCall(call)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    selectedCall?.id === call.id
                      ? 'border-blue-500 bg-blue-800 bg-opacity-30 text-white'
                      : 'border-gray-700 bg-[#1e1f25] hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white">{call.customer}</h3>
                      <p className="text-sm text-gray-400">{call.date}</p>
                    </div>
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-400">
                    <span>{call.salesRep}</span>
                    <span className="mx-2">•</span>
                    <span>{call.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Call Details */}
        <div className="lg:col-span-2">
          {selectedCall ? (
            <div className="space-y-6">
              {/* Call Overview */}
              <div className="bg-[#26272e] shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-white mb-4">Call Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#1e1f25] rounded-lg">
                    <div className="flex items-center">
                      <ChartBarIcon className="h-5 w-5 text-blue-400 mr-2" />
                      <span className="text-sm font-medium text-gray-400">Talk Ratio</span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold text-white">{selectedCall.talkRatio}</p>
                  </div>
                  <div className="p-4 bg-[#1e1f25] rounded-lg">
                    <div className="flex items-center">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-sm font-medium text-gray-400">Sentiment</span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold text-white">{selectedCall.sentiment}</p>
                  </div>
                  <div className="p-4 bg-[#1e1f25] rounded-lg">
                    <div className="flex items-center">
                      <LightBulbIcon className="h-5 w-5 text-yellow-400 mr-2" />
                      <span className="text-sm font-medium text-gray-400">Keywords</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedCall.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-700 text-yellow-100"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transcription */}
              <div className="bg-[#26272e] shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-white mb-4">Transcription</h2>
                <div className="bg-[#1e1f25] rounded-lg p-4">
                  <p className="text-sm text-gray-400">
                    {displayedTranscript.map((utterance, index) => (
                      <div key={index} className="mb-3 last:mb-0">
                        <p className="text-xs text-gray-500 font-semibold">{utterance.timestamp} <span className="text-white">{utterance.speaker}</span>:</p>
                        <p className="text-sm text-gray-300">{utterance.text}</p>
                      </div>
                    ))}
                  </p>
                  {parsedTranscript.length > 5 && (
                    <button
                      onClick={() => setShowFullTranscript(!showFullTranscript)}
                      className="mt-4 w-full text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      {showFullTranscript ? 'Collapse' : 'Show Full Transcript'}
                    </button>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-[#26272e] shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-white mb-4">AI Recommendations</h2>
                <div className="space-y-4">
                  {selectedCall.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <LightBulbIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <p className="ml-3 text-sm text-gray-300">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#26272e] shadow rounded-lg p-6">
              <div className="text-center">
                <PhoneIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-white">No call selected</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Select a call from the list to view its analysis
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CallAnalysis; 