import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  LightBulbIcon,
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

// Sample data for the trends chart
const trendData = [
  { date: 'Jan', meetings: 35, conversion: 65 },
  { date: 'Feb', meetings: 38, conversion: 68 },
  { date: 'Mar', meetings: 40, conversion: 70 },
  { date: 'Apr', meetings: 38, conversion: 68 },
  { date: 'May', meetings: 42, conversion: 72 },
  { date: 'Jun', meetings: 45, conversion: 75 },
];

// New data for Meeting Summary Insights
const meetingSummary = {
  aiSummary: `This week, 12 meetings were held. 67% led to follow-up actions. High-performing meetings often included clear next steps, concrete ROI discussion, and decision-maker presence.`,
  insights: [
    "Clear next steps increased deal conversion by +18%",
    "Mentioning ROI resulted in higher engagement",
    "Meetings < 30 min had lower success rate",
  ],
};

// New data for Recent Meetings (Transcript Overview)
const recentMeetingsTranscripts = [
  {
    id: 1,
    date: "2024-06-03",
    rep: "Alex Nieminen",
    customer: "DataLogic Oy",
    duration: "42 min",
    transcript: [
      { time: "[00:00]", speaker: "Alex", text: "Hei, hienoa että ehditte tapaamiseen." },
      { time: "[00:05]", speaker: "Maria", text: "Kiitos kutsusta – meitä kiinnostaa kuulla mitä teidän ratkaisu tekee." },
      { time: "[00:10]", speaker: "Alex", text: "Me autamme myyntitiimejä tunnistamaan mikä toimii, ja missä pitää kehittyä..." },
      { time: "[00:20]", speaker: "Maria", text: "Kuulostaa hyvältä, mutta miten se integroituu meidän nykyisiin järjestelmiimme?" },
      { time: "[00:25]", speaker: "Alex", text: "Meillä on valmiit integraatiot useimpiin CRM- ja markkinointiautomaatiojärjestelmiin, ja tarvittaessa voimme rakentaa kustomoituja liittymiä." },
      { time: "[00:35]", speaker: "Maria", text: "Entä tietoturva? Käsittelette arkaluontoista myyntidataa." },
      { time: "[00:40]", speaker: "Alex", text: "Kyllä, tietoturva on meille prioriteetti. Kaikki data salataan, ja noudatamme tiukkoja GDPR-standardeja." },
    ],
    talkRatio: '60/40',
    sentiment: 'Positive',
    keywords: ['integraatiot', 'tietoturva', 'CRM', 'automaatio'],
    recommendations: [
      'Esitä integraatioesimerkkejä konkreettisemmin alussa.',
      'Vahvista tietoturva-asiat aikaisemmin keskustelussa.',
      'Käytä enemmän asiakkaan toimialakohtaisia esimerkkejä.',
    ]
  },
  {
    id: 2,
    date: "2024-06-02",
    rep: "Miia Virtanen",
    customer: "Alfa Consulting",
    duration: "30 min",
    transcript: [
      { time: "[00:00]", speaker: "Miia", text: "Hyvää päivää! Toivottavasti löysitte perille." },
      { time: "[00:03]", speaker: "Petri", text: "Kyllä, kiitos. Olemme kiinnostuneita teidän koulutuspalveluistanne." },
      { time: "[00:08]", speaker: "Miia", text: "Erinomaista. Meidän koulutuksemme räätälöidään aina asiakkaan tarpeiden mukaan..." },
      { time: "[00:15]", speaker: "Petri", text: "Millaisia tuloksia muut asiakkaanne ovat saavuttaneet teidän koulutuksilla?" },
      { time: "[00:20]", speaker: "Miia", text: "Esimerkiksi eräs asiakkaamme nosti myyntikonversiota 15% kolmessa kuukaudessa." },
    ],
    talkRatio: '70/30',
    sentiment: 'Neutral',
    keywords: ['koulutus', 'tulokset', 'konversio', 'räätälöinti'],
    recommendations: [
      'Kysy tarkemmin asiakkaan nykyisistä koulutushaasteista.',
      'Tarjoa case-esimerkkejä heti, kun asiakas kysyy tuloksista.',
      'Selvennä koulutuksen ROI:ta entisestään.',
    ]
  },
  {
    id: 3,
    date: "2024-06-01",
    rep: "Joonas Laine",
    customer: "Nordic Innovations",
    duration: "55 min",
    transcript: [
      { time: "[00:00]", speaker: "Joonas", text: "Tervetuloa, toivottavasti matka meni hyvin." },
      { time: "[00:04]", speaker: "Elina", text: "Kiitos, kaikki sujui. Olen kuullut hyvää teidän tekoälyratkaisuistanne." },
      { time: "[00:09]", speaker: "Joonas", text: "Hienoa! Meidän AI-työkalumme auttavat optimoimaan myyntiprosesseja..." },
      { time: "[00:20]", speaker: "Elina", text: "Miten teidän ratkaisunne eroaa kilpailijoista?" },
      { time: "[00:25]", speaker: "Joonas", text: "Meidän AI:mme on kehitetty erityisesti myyntidatan analysointiin, ja se tarjoaa syvempää asiakasymmärrystä kuin monet yleiset AI-työkalut." },
      { time: "[00:40]", speaker: "Elina", text: "Kuinka nopeasti voimme nähdä tuloksia?" },
      { time: "[00:45]", speaker: "Joonas", text: "Yleensä ensimmäiset tulokset näkyvät jo muutamassa viikossa, ja täysi hyöty saavutetaan 2-3 kuukauden kuluessa." },
    ],
    talkRatio: '50/50',
    sentiment: 'Positive',
    keywords: ['tekoäly', 'optimointi', 'kilpailija-analyysi', 'tulokset'],
    recommendations: [
      'Keskity enemmän asiakkaan liiketoiminnallisiin hyötyihin.',
      'Tarjoa konkreettisia esimerkkejä AI:n käytöstä asiakkaan omassa kontekstissa.',
      'Lyhennä johdantoa ja siirry nopeammin ytimeen.',
    ]
  }
];

// Sample data for upcoming meetings
const upcomingMeetings = [
  {
    id: 1,
    title: 'Product Demo',
    person: 'John Smith',
    company: 'Acme Corp',
    date: '2024-03-21',
    time: '2:00 PM',
    duration: '60 min',
    location: 'Zoom',
    status: 'scheduled',
    description: 'Full product demonstration and Q&A session.',
  },
  {
    id: 2,
    title: 'Contract Review',
    person: 'Sarah Johnson',
    company: 'TechStart',
    date: '2024-03-22',
    time: '10:30 AM',
    duration: '45 min',
    location: 'Google Meet',
    status: 'scheduled',
    description: 'Review and discuss contract terms and conditions.',
  },
  {
    id: 3,
    title: 'Implementation Planning',
    person: 'Mike Brown',
    company: 'Global Inc',
    date: '2024-03-20',
    time: '1:00 PM',
    duration: '90 min',
    location: 'Microsoft Teams',
    status: 'completed',
    description: 'Detailed planning session for implementation phase.',
  },
];

// Sample data for past meetings
const pastMeetings = [
  {
    id: 4,
    company: 'Future Tech',
    date: '2024-03-15',
    time: '09:00',
    type: 'Demo',
    attendees: ['Alex Turner', 'Emma Davis'],
    status: 'Completed',
    notes: 'Product demonstration completed, follow-up scheduled',
    outcome: 'Positive - Interested in enterprise plan'
  },
  {
    id: 5,
    company: 'Smart Solutions',
    date: '2024-03-14',
    time: '15:00',
    type: 'Follow-up',
    attendees: ['Chris Martin'],
    status: 'Completed',
    notes: 'Contract discussion and pricing negotiation',
    outcome: 'Neutral - Requested more information'
  },
  {
    id: 6,
    company: 'Digital Dynamics',
    date: '2024-03-13',
    time: '11:30',
    type: 'Initial',
    attendees: ['Rachel Green', 'Tom Anderson'],
    status: 'Completed',
    notes: 'Initial consultation and needs assessment',
    outcome: 'Positive - Moving to demo phase'
  }
];

// Sample data for all team meetings
const allTeamMeetings = [
  {
    id: 1,
    company: 'TechCorp Inc.',
    date: '2024-03-20',
    time: '10:00',
    type: 'Demo',
    attendees: ['John Smith', 'Sarah Johnson'],
    status: 'Confirmed',
    notes: 'Product demonstration and pricing discussion',
    rep: 'S. Patel'
  },
  {
    id: 2,
    company: 'Global Solutions Ltd.',
    date: '2024-03-21',
    time: '14:30',
    type: 'Follow-up',
    attendees: ['Mike Brown'],
    status: 'Confirmed',
    notes: 'Contract negotiation',
    rep: 'L. Martin'
  },
  {
    id: 3,
    company: 'Innovate Co.',
    date: '2024-03-22',
    time: '11:00',
    type: 'Initial',
    attendees: ['Lisa Chen', 'David Wilson'],
    status: 'Pending',
    notes: 'Introduction and needs assessment',
    rep: 'J. Harris'
  },
  {
    id: 4,
    company: 'Future Tech',
    date: '2024-03-15',
    time: '09:00',
    type: 'Demo',
    attendees: ['Alex Turner', 'Emma Davis'],
    status: 'Completed',
    notes: 'Product demonstration completed, follow-up scheduled',
    outcome: 'Positive - Interested in enterprise plan',
    rep: 'A. Turner',
    transcript: [
      { speaker: 'A. Turner', text: "Good morning! Thank you for joining us today. I understand you're looking to streamline your customer service operations?" },
      { speaker: 'Emma Davis', text: "Yes, exactly. We're currently handling about 5000 customer inquiries monthly, and it's becoming quite challenging." },
      { speaker: 'A. Turner', text: "I see. Our AI-powered solution could help you automate up to 70% of these inquiries. Let me show you how it works." },
      { speaker: 'Emma Davis', text: "That sounds promising. How does it handle complex customer issues?" },
      { speaker: 'A. Turner', text: "Great question! Our system uses advanced NLP to understand context and can escalate to human agents when needed." }
    ],
    analysis: {
      strengths: [
        'Excellent product knowledge demonstrated',
        'Good handling of technical questions',
        'Clear value proposition presentation'
      ],
      areasForImprovement: [
        'Could have asked more probing questions about current pain points',
        'Should have provided more specific ROI examples',
        'Could have better addressed security concerns'
      ]
    }
  },
  {
    id: 5,
    company: 'Smart Solutions',
    date: '2024-03-14',
    time: '15:00',
    type: 'Follow-up',
    attendees: ['Chris Martin'],
    status: 'Completed',
    notes: 'Contract discussion and pricing negotiation',
    outcome: 'Neutral - Requested more information',
    rep: 'K. Lee',
    transcript: [
      { speaker: 'K. Lee', text: "Hi Chris, thanks for taking the time. I've prepared some pricing options based on our previous discussion." },
      { speaker: 'Chris Martin', text: "Thanks. I've reviewed the proposal, but I have some concerns about the implementation timeline." },
      { speaker: 'K. Lee', text: "I understand. We can definitely adjust the timeline to better suit your needs." },
      { speaker: 'Chris Martin', text: "What about the integration with our existing systems?" },
      { speaker: 'K. Lee', text: "We have a dedicated team that handles all integrations. They'll work closely with your IT department." }
    ],
    analysis: {
      strengths: [
        'Good preparation with pricing options',
        'Flexible approach to timeline concerns',
        'Clear communication about support process'
      ],
      areasForImprovement: [
        'Should have addressed integration concerns proactively',
        'Could have provided more detailed implementation plan',
        'Missed opportunity to discuss long-term partnership benefits'
      ]
    }
  },
  {
    id: 6,
    company: 'Digital Dynamics',
    date: '2024-03-13',
    time: '11:30',
    type: 'Initial',
    attendees: ['Rachel Green', 'Tom Anderson'],
    status: 'Completed',
    notes: 'Initial consultation and needs assessment',
    outcome: 'Positive - Moving to demo phase',
    rep: 'S. Patel',
    transcript: [
      { speaker: 'S. Patel', text: "Welcome! I understand you're looking to improve your digital marketing analytics?" },
      { speaker: 'Rachel Green', text: "Yes, we're struggling to get actionable insights from our current tools." },
      { speaker: 'S. Patel', text: "Could you tell me more about your current setup and specific challenges?" },
      { speaker: 'Tom Anderson', text: "We're using multiple platforms, but the data is scattered and hard to interpret." },
      { speaker: 'S. Patel', text: "Our platform can consolidate all your data sources and provide real-time insights." }
    ],
    analysis: {
      strengths: [
        'Excellent discovery questions',
        'Good active listening',
        'Clear explanation of solution benefits'
      ],
      areasForImprovement: [
        'Could have asked more about specific metrics they track',
        'Should have provided more concrete examples',
        'Could have better addressed data privacy concerns'
      ]
    }
  }
];

// Meeting List Item Component
const MeetingListItem = ({ time, title, company, type, status }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-3">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          type === 'Discovery' ? 'bg-blue-100' :
          type === 'Demo' ? 'bg-green-100' :
          type === 'Follow-up' ? 'bg-yellow-100' :
          'bg-red-100'
        }`}>
          <span className={`font-medium ${
            type === 'Discovery' ? 'text-blue-600' :
            type === 'Demo' ? 'text-green-600' :
            type === 'Follow-up' ? 'text-yellow-600' :
            'text-red-600'
          }`}>{type.charAt(0)}</span>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{company}</p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-500">{time}</span>
      <span className={`px-2 py-1 text-xs rounded-full ${
        status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
        status === 'Completed' ? 'bg-green-100 text-green-800' : 
        'bg-yellow-100 text-yellow-800'
      }`}>
        {status}
      </span>
    </div>
  </div>
);

// Meeting History Modal Component
const MeetingHistoryModal = ({ meetings, onClose }) => {
  if (!meetings) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Meeting History</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{meeting.company}</h4>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {meeting.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      {meeting.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <UserIcon className="h-4 w-4 mr-2" />
                      {meeting.attendees.join(', ')}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  meeting.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {meeting.status}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-600">{meeting.notes}</p>
                {meeting.outcome && (
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Outcome:</span> {meeting.outcome}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// All Team Meetings Modal Component
const AllTeamMeetingsModal = ({ meetings, onClose }) => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  if (!meetings) return null;

  const handleMeetingClick = (meeting) => {
    if (meeting.status === 'Completed') {
      setSelectedMeeting(meeting);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900">All Team Meetings</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div 
              key={meeting.id} 
              className={`border rounded-lg p-4 hover:bg-gray-50 ${meeting.status === 'Completed' ? 'cursor-pointer' : ''}`}
              onClick={() => handleMeetingClick(meeting)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-semibold text-gray-900">{meeting.company}</h4>
                    <span className="text-sm text-gray-500">({meeting.rep})</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {meeting.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      {meeting.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <UserIcon className="h-4 w-4 mr-2" />
                      {meeting.attendees.join(', ')}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  meeting.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  meeting.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {meeting.status}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-600">{meeting.notes}</p>
                {meeting.outcome && (
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Outcome:</span> {meeting.outcome}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Meeting Transcript Modal */}
        {selectedMeeting && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Meeting Analysis</h3>
                <button onClick={() => setSelectedMeeting(null)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Meeting Details */}
                <div className="border-b pb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{selectedMeeting.company}</h4>
                  <p className="text-sm text-gray-500">{selectedMeeting.date} at {selectedMeeting.time}</p>
                  <p className="text-sm text-gray-500">Attendees: {selectedMeeting.attendees.join(', ')}</p>
                </div>

                {/* Transcript */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Transcript</h4>
                  <div className="space-y-4">
                    {selectedMeeting.transcript.map((line, index) => (
                      <div key={index} className="flex space-x-4">
                        <span className="font-medium text-gray-900 min-w-[100px]">{line.speaker}:</span>
                        <p className="text-gray-600">{line.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Strengths</h4>
                    <ul className="space-y-2">
                      {selectedMeeting.analysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-gray-600">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas for Improvement */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Areas for Improvement</h4>
                    <ul className="space-y-2">
                      {selectedMeeting.analysis.areasForImprovement.map((area, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-500 mr-2">!</span>
                          <span className="text-gray-600">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Metric Card Component with click handler
const MetricCard = ({ title, value, subtitle, className = '', onClick }) => (
  <div 
    className={`bg-white rounded-lg shadow p-6 ${className} ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
    onClick={onClick}
  >
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
    {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
  </div>
);

// Upcoming Meetings List Component
const UpcomingMeetingsList = () => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const handleMeetingClick = (meeting) => {
    setSelectedMeeting(meeting);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h2>
      <div className="space-y-4">
        {upcomingMeetings.map((meeting) => (
          <div 
            key={meeting.id} 
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleMeetingClick(meeting)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{meeting.title}</h4>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {meeting.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {meeting.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UserIcon className="h-4 w-4 mr-2" />
                    {meeting.person}
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                meeting.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {meeting.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-3">{meeting.description}</p>
          </div>
        ))}
      </div>

      {/* Meeting History Modal */}
      {selectedMeeting && (
        <MeetingHistoryModal 
          meetings={pastMeetings} 
          onClose={() => setSelectedMeeting(null)} 
        />
      )}
    </div>
  );
};

function MeetingDetails({ meeting, onClose }) {
  if (!meeting) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <UserCircleIcon className="h-16 w-16 text-gray-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{meeting.title}</h3>
              <p className="text-sm text-gray-500">
                with {meeting.person} from {meeting.company}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="text-lg font-medium">{meeting.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="text-lg font-medium">{meeting.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="text-lg font-medium">{meeting.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  meeting.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {meeting.status}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-5 w-5 text-gray-400" />
            <p className="text-gray-600">{meeting.location}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600">{meeting.description}</p>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Edit
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meetings() {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showFullTranscript, setShowFullTranscript] = useState(false);

  const toggleTranscript = () => {
    setShowFullTranscript(prevState => !prevState);
  };

  const displayedTranscript = selectedMeeting
    ? (showFullTranscript ? selectedMeeting.transcript : selectedMeeting.transcript.slice(0, 5))
    : [];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Team Meeting Analysis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Meetings List */}
        <div className="lg:col-span-1">
          <div className="bg-[#26272e] shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Recent Meetings</h2>
            <div className="space-y-4">
              {recentMeetingsTranscripts.map((meeting) => (
                <button
                  key={meeting.id}
                  onClick={() => {
                    setSelectedMeeting(meeting);
                    setShowFullTranscript(false); // Reset transcript view on new selection
                  }}
                  className={`w-full text-left p-4 rounded-lg border ${
                    selectedMeeting?.id === meeting.id
                      ? 'border-blue-500 bg-blue-800 bg-opacity-30 text-white'
                      : 'border-gray-700 bg-[#1e1f25] hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-medium text-white">{meeting.customer}</h3>
                    <p className="text-xs text-gray-400">{meeting.date} • {meeting.rep} • {meeting.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Meeting Details */}
        <div className="lg:col-span-2">
          {selectedMeeting ? (
            <div className="space-y-6">
              {/* Meeting Overview */}
              <Card className="bg-[#26272e] shadow rounded-lg p-6">
                <CardHeader className="p-0 pb-4 mb-4 border-b border-gray-700">
                  <CardTitle className="text-xl font-semibold text-white">Meeting Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#1e1f25] rounded-lg">
                    <div className="flex items-center">
                      <ChartBarIcon className="h-5 w-5 text-blue-400 mr-2" />
                      <span className="text-sm font-medium text-gray-400">Talk Ratio</span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold text-white">{selectedMeeting.talkRatio}</p>
                  </div>
                  <div className="p-4 bg-[#1e1f25] rounded-lg">
                    <div className="flex items-center">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-sm font-medium text-gray-400">Sentiment</span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold text-white">{selectedMeeting.sentiment}</p>
                  </div>
                  <div className="p-4 bg-[#1e1f25] rounded-lg">
                    <div className="flex items-center">
                      <LightBulbIcon className="h-5 w-5 text-yellow-400 mr-2" />
                      <span className="text-sm font-medium text-gray-400">Keywords</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedMeeting.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-700 text-yellow-100"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transcription */}
              <Card className="bg-[#26272e] shadow rounded-lg p-6">
                <CardHeader className="p-0 pb-4 mb-4 border-b border-gray-700">
                  <CardTitle className="text-xl font-semibold text-white">Transcription</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2 text-sm text-gray-800">
                    {displayedTranscript.map((utterance, index) => (
                      <div key={index} className="flex space-x-2">
                        <span className="text-gray-500 font-medium w-14 flex-shrink-0">{utterance.time}</span>
                        <span className="font-semibold flex-shrink-0 w-16 text-white">{utterance.speaker}:</span>
                        <p className="flex-grow text-gray-300">{utterance.text}</p>
                      </div>
                    ))}
                    {selectedMeeting.transcript.length > 5 && (
                      <button
                        onClick={toggleTranscript}
                        className="mt-2 w-full text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        {showFullTranscript ? 'Collapse' : 'Show Full Transcript'}
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="bg-[#26272e] shadow rounded-lg p-6">
                <CardHeader className="p-0 pb-4 mb-4 border-b border-gray-700">
                  <CardTitle className="text-xl font-semibold text-white">AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {selectedMeeting.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <LightBulbIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <p className="ml-3 text-sm text-gray-300">{recommendation}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-[#26272e] shadow rounded-lg p-6">
              <div className="text-center py-10">
                <PhoneIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-white">Select a Meeting</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Choose a meeting from the list to view its detailed analysis.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Meetings; 