import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import {
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const playbooks = [
  {
    id: 1,
    title: 'Initial Discovery Call',
    category: 'Sales',
    steps: [
      {
        id: 1,
        title: 'Introduction',
        description: 'Introduce yourself and your company',
        duration: '5 min',
        completed: true,
      },
      {
        id: 2,
        title: 'Pain Points',
        description: 'Identify customer pain points and challenges',
        duration: '10 min',
        completed: false,
      },
      {
        id: 3,
        title: 'Solution Overview',
        description: 'Present relevant solutions to identified problems',
        duration: '15 min',
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Product Demo',
    category: 'Product',
    steps: [
      {
        id: 1,
        title: 'Setup',
        description: 'Prepare demo environment and test connection',
        duration: '5 min',
        completed: true,
      },
      {
        id: 2,
        title: 'Core Features',
        description: 'Demonstrate main product features',
        duration: '20 min',
        completed: false,
      },
      {
        id: 3,
        title: 'Q&A',
        description: 'Answer questions and address concerns',
        duration: '10 min',
        completed: false,
      },
    ],
  },
];

function PlaybookCard({ playbook, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#26272e] rounded-lg shadow p-4">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <DocumentTextIcon className="h-8 w-8 text-blue-400" />
            <div>
              <h3 className="text-lg font-medium text-white">{playbook.title}</h3>
              <p className="text-sm text-gray-400">{playbook.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(playbook)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(playbook.id)}
              className="p-2 text-gray-400 hover:text-red-400"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-400 hover:text-white"
            >
              {isExpanded ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {playbook.steps.map((step) => (
              <div
                key={step.id}
                className="flex items-start space-x-3 p-3 bg-[#1e1f25] rounded-lg"
              >
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-400" />
                  ) : (
                    <ClockIcon className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{step.title}</p>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-700 text-blue-100">
                    {step.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Playbook() {
  const [activeTab, setActiveTab] = useState('Booking');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleEdit = (playbook) => {
    // Handle edit playbook
    console.log('Edit playbook:', playbook);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleDelete = (playbookId) => {
    // Handle delete playbook
    console.log('Delete playbook:', playbookId);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const playbookContent = {
    Booking: {
      aiContent: `AI-generoitu sisältö: Booking-vaiheessa on kriittistä keskittyä asiakkaan tarpeiden ymmärtämiseen ja arvon esittämiseen. Käytä avoimia kysymyksiä, jotka kannustavat asiakasta puhumaan omista haasteistaan ja tavoitteistaan. Varmista, että tarjoat selkeän syyn tapaamiselle ja että se on asiakkaalle hyödyllinen. Automatisoidut sähköpostisekvenssit voivat tehostaa tätä vaihetta, mutta muista personointi.`,
      bestPractices: [
        "Tunnista ihanteellinen asiakasprofiili (ICP).",
        "Käytä personoituja avauslauseita sähköposteissa ja puheluissa.",
        "Tarjoa konkreettinen arvoa asiakkaalle jo ensimmäisessä kontaktissa.",
        "Varmista, että tapaamisen ajankohta sopii molemmille ja että agenda on selkeä.",
        "Käytä CRM-järjestelmää tehokkaasti seurantaan ja huomautuksiin.",
      ],
      editableNotes: `Tiimiltä kerätyt toimivat esimerkit:
- "Tapaaminen saatiin järjestettyä, kun mainitsin, miten Carter on auttanut X-yritystä ratkaisemaan vastaavan ongelman."
- "Käytin tätä sähköpostimallia ja sain 3 vastausta 10:stä lähetetystä viestistä."`,
      manualEdit: `Muokkaa ja lisää omia muistiinpanoja tähän...`,
    },
    Meetings: {
      aiContent: `AI-generoitu sisältö: Onnistunut tapaaminen edellyttää huolellista valmistautumista, aktiivista kuuntelua ja kykyä mukautua asiakkaan tarpeisiin. Keskity asiakkaan haasteisiin ja esitä ratkaisusi niiden pohjalta. Muista, että asiakas ostaa ratkaisun, ei tuotetta. Käytä esittelymateriaaleja visuaaliseen tukeen ja varmista, että puhelu on vuorovaikutteinen.`,
      bestPractices: [
        "Valmistaudu perusteellisesti tutkimalla asiakasta ja heidän toimialaansa.",
        "Aseta selkeä tavoite tapaamiselle ja kommunikoi se asiakkaalle alussa.",
        "Käytä avoimia kysymyksiä ymmärtääksesi syvällisesti asiakkaan tarpeita.",
        "Esitä ratkaisuja asiakkaan haasteiden kautta.",
        "Yhteenveto tärkeimmistä havainnoista ja sovituista seuraavista askelista.",
      ],
      editableNotes: `Tiimiltä kerätyt toimivat esimerkit:
- "Asiakas oli huolissaan X-ongelmasta, ja esimerkkicase Y vakuutti heidät ratkaisustamme."
- "Tapaamisen jälkeen lähetin välittömästi yhteenvedon ja sovin jatkotapaamisen, mikä nopeutti prosessia."`,
      manualEdit: `Muokkaa ja lisää omia muistiinpanoja tähän...`,
    },
    Objections: {
      aiContent: `AI-generoitu sisältö: Vastalauseet ovat luonnollinen osa myyntiprosessia. Ne ovat usein merkki kiinnostuksesta. Tärkeintä on kuunnella, ymmärtää ja vastata vastalauseeseen rauhallisesti ja perustellusti. Älä koskaan kiistä asiakkaan mielipidettä, vaan pyri löytämään yhteinen sävel ja tarjoamaan ratkaisu, joka vastaa asiakkaan huoliin. Kouluttaudu yleisimpiin vastalauseisiin ja niiden käsittelyyn.`,
      bestPractices: [
        "Kuuntele aktiivisesti ja osoita empatiaa.",
        "Älä keskeytä asiakasta.",
        "Selvennä vastalauseen todellinen syy.",
        "Tarjoa konkreettisia ja todistettuja ratkaisuja.",
        "Vahvista, että vastalause on käsitelty tyydyttävästi.",
      ],
      editableNotes: `Tiimiltä kerätyt toimivat esimerkit:
- "Kun asiakas sanoi, että ratkaisumme on liian kallis, vastasin esittelemällä ROI-laskelman, joka osoitti säästöt."
- "Käytin FAB-menetelmää (Features, Advantages, Benefits) käsitelläkseni kilpailijan paremmuutta koskevan vastalauseen."`,
      manualEdit: `Muokkaa ja lisää omia muistiinpanoja tähän...`,
    },
    'Follow-up': {
      aiContent: `AI-generoitu sisältö: Tehokas seuranta on avain kauppojen klousaamiseen. Seurannan tulee olla systemaattista, mutta ei ahdistelevaa. Tarjoa aina lisäarvoa jokaisessa kontaktissa ja muista asiakkaan tarpeet. Automatisoidut seurantasähköpostit ja -muistutukset voivat auttaa, mutta henkilökohtainen puhelu tai viesti erottuu massasta.`,
      bestPractices: [
        "Lähetä yhteenveto ja seuraavat askeleet heti tapaamisen jälkeen.",
        "Tarjoa lisäresursseja tai tietoa, joka vastaa asiakkaan tarpeisiin.",
        "Vältä yleisiä 'vain tarkistan' -sähköposteja.",
        "Personoi jokainen seuranta, viitaten aiempiin keskusteluihin.",
        "Aseta selkeät seuranta-aikataulut ja pidä niistä kiinni.",
      ],
      editableNotes: `Tiimiltä kerätyt toimivat esimerkit:
- "Lähetin tapauskertomuksen X-yrityksestä, ja se sai asiakkaan vastaamaan välittömästi."
- "Soitin kolmen päivän kuluttua kysyäkseni, oliko esityksessä jotain epäselvää, ja se avasi keskustelun uudelleen."`,
      manualEdit: `Muokkaa ja lisää omia muistiinpanoja tähän...`,
    },
    Closing: {
      aiContent: `AI-generoitu sisältö: Klousaus on myyntiprosessin huipentuma. Tässä vaiheessa on tärkeää olla selkeä, itsevarmuus ja käsitellä viimeisetkin epäröinnit. Varmista, että olet vastannut kaikkiin kysymyksiin ja asiakas ymmärtää täysin arvon, jonka he saavat. Älä pelkää pyytää kauppaa suoraan. Luo selkeä tiekartta kaupan viimeistelyyn.`,
      bestPractices: [
        "Varmista, että kaikki vastalauseet on käsitelty.",
        "Yhteenveto arvolupauksesta ja hyödyistä.",
        "Käytä klousaustekniikoita (esim. vaihtoehtoinen klousaus, trial klousaus).",
        "Ole valmis vastaamaan viime hetken kysymyksiin.",
        "Tee prosessista mahdollisimman helppo asiakkaalle.",
      ],
      editableNotes: `Tiimiltä kerätyt toimivat esimerkit:
- "Kysyin suoraan, 'Näettekö tämän ratkaisun teille sopivana?', ja sain positiivisen vastauksen."
- "Tarjosin 10% alennuksen, jos sopimus allekirjoitetaan tällä viikolla, ja se vauhditti päätöstä."`,
      manualEdit: `Muokkaa ja lisää omia muistiinpanoja tähän...`,
    },
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Team Sales Playbook</h1>

      <Tabs defaultValue="Booking" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-[#1e1f25]">
          {Object.keys(playbookContent).map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'bg-blue-800 bg-opacity-30 text-blue-300'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(playbookContent).map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card className="bg-[#26272e] rounded-xl shadow-sm">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-white">{tab} Playbook</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* AI-Generated Content */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">AI-ehdottama kappale</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{playbookContent[tab].aiContent}</p>
                </div>

                {/* Best Practices */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Best Practices</h3>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    {playbookContent[tab].bestPractices.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>
                </div>

                {/* Editable Notes */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Editable Notes</h3>
                  <Textarea
                    defaultValue={playbookContent[tab].editableNotes}
                    placeholder="Kirjoita omat havainnot/esimerkit tähän..."
                    className="bg-[#1e1f25] text-white border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Manual Edit */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Manual Edit</h3>
                  <Textarea
                    defaultValue={playbookContent[tab].manualEdit}
                    placeholder="Muokkaa ja lisää sisältöä manuaalisesti..."
                    rows="6"
                    className="bg-[#1e1f25] text-white border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-gray-700 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-900 border-l-4 border-green-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-100">Playbook updated successfully</p>
            </div>
          </div>
        </div>
      )}

      {/* Playbook Categories */}
      <div className="bg-[#26272e] shadow rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-white">Sales Playbooks</h2>
            <p className="mt-1 text-sm text-gray-400">
              Manage your sales playbooks and templates
            </p>
          </div>
          <div className="space-y-4">
            {playbooks.map((playbook) => (
              <PlaybookCard
                key={playbook.id}
                playbook={playbook}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#26272e] shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-[#1e1f25] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Import Playbook
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-[#1e1f25] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Export Playbook
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-[#1e1f25] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Share Playbook
          </button>
        </div>
      </div>
    </div>
  );
}

export default Playbook; 