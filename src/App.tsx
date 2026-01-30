import { useState } from 'react';
import type { GameState, Choice, Consequence, ResourceKeys, ReputationKeys } from './types';
import { storyNodes } from './storyData';
import WorldMap from './WorldMap';
import './index.css';

const initialState: GameState = {
  player: { name: 'Tessitore', class: 'Weaver', hp: 100, inventory: [] },
  resources: { gold: 10, resonance: 0 },
  reputation: { empire: 0, dominion: 0, freeLands: 0 },
  flags: {},
  unlockedLocations: ['ruins_start', 'orynth']
};

type Screen = 'STORY' | 'MAP';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [screen, setScreen] = useState<Screen>('STORY');

  const currentNode = storyNodes[currentNodeId];

  const handleChoice = (choice: Choice) => {
    if (choice.consequences) {
      const newState = { ...gameState };
      newState.resources = { ...gameState.resources };
      newState.reputation = { ...gameState.reputation };
      newState.flags = { ...gameState.flags };
      newState.player = { ...gameState.player, inventory: [...gameState.player.inventory] };
      newState.unlockedLocations = [...gameState.unlockedLocations];
      
      choice.consequences.forEach((cons: Consequence) => {
        switch (cons.type) {
          case 'MODIFY_RESOURCE':
            if (cons.target in newState.resources) {
                const key = cons.target as ResourceKeys;
                newState.resources[key] += (cons.value as number);
            }
            break; 
          case 'MODIFY_REPUTATION':
            if (cons.target in newState.reputation) {
                const key = cons.target as ReputationKeys;
                newState.reputation[key] += (cons.value as number);
            }
            break;
          case 'SET_FLAG':
            newState.flags[cons.target] = (cons.value as boolean);
            break;
          case 'ADD_ITEM':
            newState.player.inventory.push(cons.value as string);
            break;
          case 'UNLOCK_LOCATION':
            const locId = cons.value as string;
            if (!newState.unlockedLocations.includes(locId)) {
                newState.unlockedLocations.push(locId);
            }
            break;
        }
      });
      setGameState(newState);
    }

    if (choice.nextNodeId === 'MAP') {
      setScreen('MAP');
    } else if (choice.nextNodeId) {
      setCurrentNodeId(choice.nextNodeId);
    }
  };

  const handleMapAction = (storyNodeId: string) => {
    if (storyNodes[storyNodeId]) {
        setCurrentNodeId(storyNodeId);
        setScreen('STORY');
    } else {
        console.error("Nodo storia non trovato:", storyNodeId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gray-900/90 backdrop-blur p-4 rounded-lg mb-6 flex flex-wrap justify-between items-center border border-gray-800 shadow-lg gap-4">
        <div className="flex items-center gap-6">
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold">Nome</span>
                <span className="font-bold text-white">{gameState.player.name}</span>
            </div>
            <div className="h-8 w-px bg-gray-700"></div>
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold">Salute</span>
                <span className="font-bold text-red-400">{gameState.player.hp} HP</span>
            </div>
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold">Risonanza</span>
                <span className="font-bold text-blue-400">{gameState.resources.resonance}</span>
            </div>
        </div>
      </div>

      <div className="w-full max-w-4xl transition-all duration-500 ease-in-out">
        {screen === 'MAP' && (
           <WorldMap 
             onSelectAction={handleMapAction} 
             unlockedLocations={gameState.unlockedLocations}
           />
        )}
        {screen === 'STORY' && currentNode && (
          <div className="bg-black/80 border border-gray-700 p-8 rounded-xl shadow-2xl backdrop-blur-md relative overflow-hidden">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300 font-serif">
                {currentNode.title}
            </h1>
            <div className="text-lg md:text-xl leading-relaxed mb-10 text-gray-300 font-light">
              {currentNode.text}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {currentNode.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  className="group relative px-6 py-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-600 hover:border-purple-500 rounded-lg transition-all text-left shadow-lg overflow-hidden"
                >
                  <span className="relative group-hover:text-purple-300 transition-colors font-semibold text-lg">
                    {choice.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
