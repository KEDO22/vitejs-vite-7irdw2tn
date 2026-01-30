import { StoryNode } from './types';

export const storyNodes: Record<string, StoryNode> = {
  // --- INTRODUZIONE ---
  'start': {
    id: 'start',
    title: 'Il Risveglio',
    text: "Apri gli occhi. Il freddo è la prima cosa che senti. Non è il freddo dell'inverno, ma il vuoto di chi ha dormito per secoli. Sei in una vasca di vetro infranto, circondato da macchinari di cristallo spenti. Sulla tua mano pulsa una luce debole: il Sigillo del Tessitore.",
    choices: [
      {
        id: 'c1',
        text: 'Esci dalle rovine e guarda il mondo',
        nextNodeId: 'intro_exit',
        consequences: [
          { type: 'MODIFY_RESOURCE', target: 'resonance', value: 10 }
        ]
      }
    ]
  },
  'intro_exit': {
    id: 'intro_exit',
    title: 'Un Mondo Spezzato',
    text: "Emergi alla luce del sole. Davanti a te si estendono le Terre Libere, una distesa di rocce e vegetazione selvaggia. In lontananza vedi il fumo di una città. Il mondo è vasto e tu sei libero.",
    choices: [
      {
        id: 'c_map',
        text: 'Apri la Mappa del Mondo',
        nextNodeId: 'MAP' // QUESTA SCELTA APRE LA MAPPA
      }
    ]
  },

  // --- NODI DI ORYNTH ---
  'market_intro': {
    id: 'market_intro',
    title: 'Il Mercato di Orynth',
    text: "Il caos è assordante. Mercanti urlano in lingue sconosciute, vendendo spezie, schiavi e reliquie tecnologiche. Qualcuno ti osserva.",
    choices: [
      {
        id: 'c_buy_food',
        text: 'Compra provviste (5 Oro)',
        nextNodeId: 'MAP', // Torna alla mappa dopo l'azione
        consequences: [{ type: 'MODIFY_RESOURCE', target: 'gold', value: -5 }]
      },
      {
        id: 'c_leave_market',
        text: 'Torna alla mappa',
        nextNodeId: 'MAP'
      }
    ]
  },
  'tavern_intro': {
    id: 'tavern_intro',
    title: 'Taverna "Il Drago Cieco"',
    text: "L'odore di birra stantia e sudore ti colpisce. Un bardo sta cantando una canzone sulla caduta dei Patriarchi.",
    choices: [
      {
        id: 'c_listen',
        text: 'Ascolta le voci',
        nextNodeId: 'MAP',
        consequences: [{ type: 'MODIFY_RESOURCE', target: 'resonance', value: 2 }]
      }
    ]
  },

  // --- NODI DELLE ROVINE ---
  'ruins_scavenge': {
    id: 'ruins_scavenge',
    title: 'Rovine di Cristallo',
    text: "Torni dove ti sei svegliato. C'è poco di utile, ma trovi un vecchio pugnale cerimoniale.",
    choices: [
      {
        id: 'c_take_dagger',
        text: 'Prendi il pugnale e vai',
        nextNodeId: 'MAP',
        consequences: [{ type: 'ADD_ITEM', target: 'inventory', value: 'Pugnale Antico' }]
      }
    ]
  }
};
