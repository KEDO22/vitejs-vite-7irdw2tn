import type { MapLocation } from './types';

export const mapLocations: MapLocation[] = [
  {
    id: 'ruins_start',
    name: 'Rovine di Cristallo',
    description: 'Il luogo del tuo risveglio. Antiche strutture vibrano ancora di energia residua.',
    x: 45,
    y: 75,
    region: 'FREELANDS',
    status: 'VISITED',
    actions: [
      { id: 'act_explore_ruins', label: 'Cerca tra le macerie', storyNodeId: 'ruins_scavenge' }
    ]
  },
  {
    id: 'orynth',
    name: 'Orynth',
    description: 'La Città dei Mille Mercati. Crocevia neutrale delle Terre Libere dove tutto si compra.',
    x: 50,
    y: 60,
    region: 'FREELANDS',
    status: 'UNLOCKED', 
    actions: [
      { id: 'act_market', label: 'Vai al Mercato Nero', storyNodeId: 'market_intro' },
      { id: 'act_tavern', label: 'Taverna "Il Drago Cieco"', storyNodeId: 'tavern_intro' }
    ]
  },
  {
    id: 'bastion',
    name: "Bastione d'Acciaio",
    description: "Capitale dell'Impero Ferrum. Una fortezza impenetrabile di metallo e vapore.",
    x: 20,
    y: 40,
    region: 'EMPIRE',
    status: 'LOCKED',
    actions: [
      { id: 'act_gate', label: 'Avvicinati al Cancello', storyNodeId: 'bastion_gate' }
    ]
  },
  {
    id: 'spire',
    name: 'La Spire',
    description: 'Torre senza fine del Dominio. La magia qui è così densa che altera la gravità.',
    x: 80,
    y: 30,
    region: 'DOMINION',
    status: 'LOCKED',
    actions: [
      { id: 'act_spire_look', label: 'Osserva da lontano', storyNodeId: 'spire_look' }
    ]
  }
];
