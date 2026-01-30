import React, { useState } from 'react';
import { GameState, Choice, Consequence } from './types';
import { storyNodes } from './storyData';
import WorldMap from './WorldMap';
import './index.css';

// Stato Iniziale del Gioco
const initialState: GameState = {
  player: { name: 'Tessitore', class: 'Weaver', hp: 100, inventory: [] },
  resources: { gold: 10, resonance: 0 },
  reputation: { empire: 0, dominion: 0, freeLands: 0 },
  flags: {},
  unlockedLocations: ['ruins_start', 'orynth'] // Luoghi iniziali visibili
};

type Screen = 'STORY' | 'MAP';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [screen, setScreen] = useState<Screen>('STORY');

  const currentNode = storyNodes[currentNodeId];

  // Gestione click su una scelta narrativa
  const handleChoice = (choice: Choice) => {
    // 1. Applica Conseguenze
    if (choice.consequences) {
      const newState = { ...gameState };
      
      choice.consequences.forEach((cons: Consequence) => {
        if (cons.type === 'MODIFY_RESOURCE') {
          // @ts-ignore
          newState.resources[cons.target] += (cons.value as number);
        }
        else if (cons.type === 'MODIFY_REPUTATION') {
           // @ts-ignore
          newState.reputation[cons.target] += (cons.value as number);
        }
        else if (cons.type === 'SET_FLAG') {
          newState.flags[cons.target] = (cons.value as boolean);
        }
        else if (cons.type === 'ADD_ITEM') {
            newState.player.inventory.push(cons.value as string);
        }
        else if (cons.type === 'UNLOCK_LOCATION') {
            if (!newState.unlockedLocations.includes(cons.value as string)) {
                newState.unlockedLocations.push(cons.value as string);
            }
        }
      });
      setGameState(newState);
    }

    // 2. Navigazione
    if (choice.nextNodeId === 'MAP') {
      setScreen('MAP');
    } else if (choice.nextNodeId) {
      setCurrentNodeId(choice.nextNodeId);
      // Se è un nodo normale, rimaniamo su STORY, non serve cambiare screen
    }
  };

  // Callback quando si sceglie un'azione dalla Mappa
  const handleMapAction = (storyNodeId: string) => {
    // Se il nodo esiste nel database
    if (storyNodes[storyNodeId]) {
        setCurrentNodeId(storyNodeId);
        setScreen('STORY');
    } else {
        console.error("Nodo storia non trovato:", storyNodeId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans p-4 flex flex-col items-center">
      
      {/* --- HUD (HEAD UP DISPLAY) --- */}
      <div className="w-full max-w-4xl bg-gray-900/90 backdrop-blur p-4 rounded-lg mb-6 flex flex-wrap justify-between items-center border border-gray-800 shadow-lg gap-4">
        
        {/* Statistiche Personaggio */}
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
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold">Oro</span>
                <span className="font-bold text-yellow-500">{gameState.resources.gold}</span>
            </div>
        </div>

        {/* Reputazione */}
        <div className="flex gap-3 text-sm">
            <div className="px-3 py-1 rounded bg-gray-800 border border-gray-600 text-gray-300">
                Impero: {gameState.reputation.empire}
            </div>
            <div className="px-3 py-1 rounded bg-purple-900/30 border border-purple-600/50 text-purple-300">
                Dominio: {gameState.reputation.dominion}
            </div>
        </div>
      </div>

      {/* --- AREA DI GIOCO PRINCIPALE --- */}
      <div className="w-full max-w-4xl transition-all duration-500 ease-in-out">
        
        {/* VISTA MAPPA */}
        {screen === 'MAP' && (
           <WorldMap 
             onSelectAction={handleMapAction} 
             unlockedLocations={gameState.unlockedLocations}
           />
        )}

        {/* VISTA STORIA */}
        {screen === 'STORY' && currentNode && (
          <div className="bg-black/80 border border-gray-700 p-8 rounded-xl shadow-2xl backdrop-blur-md relative overflow-hidden">
             
             {/* Elemento decorativo */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-transparent"></div>

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
                  <div className="absolute inset-0 w-1 bg-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative group-hover:text-purple-300 transition-colors font-semibold text-lg">
                    {choice.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ERRORE (Se nodo non trovato) */}
        {screen === 'STORY' && !currentNode && (
            <div className="text-center text-red-500 p-10 bg-gray-900 rounded">
                Errore Critico: Nodo narrativo "{currentNodeId}" non trovato.
                <br/>
                <button onClick={() => setScreen('MAP')} className="mt-4 underline">Torna alla Mappa</button>
            </div>
        )}
      </div>
    </div>
  );
}
