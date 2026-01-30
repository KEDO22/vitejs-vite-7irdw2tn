export type ResourceKeys = 'gold' | 'resonance';
export type ReputationKeys = 'empire' | 'dominion' | 'freeLands';

export interface GameState {
  player: {
    name: string;
    class: 'Weaver' | 'Soldier' | 'Mage';
    hp: number;
    inventory: string[];
  };
  resources: Record<ResourceKeys, number>;
  reputation: Record<ReputationKeys, number>;
  flags: Record<string, boolean>;
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
  nextNodeId: string | 'MAP';
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
  label: string;
  storyNodeId: string;
  reqFlag?: string;
}

export interface MapLocation {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  region: 'EMPIRE' | 'DOMINION' | 'FREELANDS' | 'SCAR';
  status: LocationStatus;
  actions: LocationAction[];
}
