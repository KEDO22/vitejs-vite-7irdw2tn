export interface GameState {
  player: {
    name: string;
    class: 'Weaver' | 'Soldier' | 'Mage';
    hp: number;
    inventory: string[];
  };
  resources: {
    gold: number;
    resonance: number;
  };
  reputation: {
    empire: number;
    dominion: number;
    freeLands: number;
  };
  flags: Record<string, boolean>;
  // Nuova proprietà per tracciare i luoghi scoperti
  unlockedLocations: string[]; 
}

export interface Consequence {
  type: 'MODIFY_RESOURCE' | 'ADD_ITEM' | 'SET_FLAG' | 'MODIFY_REPUTATION' | 'UNLOCK_LOCATION';
  target: string;
  value: number | string | boolean;
}

export interface Choice {
  id: string;
  text: string;
  nextNodeId: string | 'MAP'; // 'MAP' è una parola chiave speciale per aprire la mappa
  requiredFlag?: string;
  consequences?: Consequence[];
}

export interface StoryNode {
  id: string;
  title: string;
  text: string;
  backgroundImage?: string;
  choices: Choice[];
}

// --- TIPI PER LA MAPPA ---

export type LocationStatus = 'LOCKED' | 'UNLOCKED' | 'VISITED' | 'CURRENT';

export interface LocationAction {
  id: string;
  label: string; // Es: "Entra nel Mercato"
  storyNodeId: string; // ID del nodo storia da avviare
  reqFlag?: string;
}

export interface MapLocation {
  id: string;
  name: string;
  description: string;
  x: number; // Posizione percentuale (0-100)
  y: number; // Posizione percentuale (0-100)
  region: 'EMPIRE' | 'DOMINION' | 'FREELANDS' | 'SCAR';
  status: LocationStatus;
  actions: LocationAction[];
}
