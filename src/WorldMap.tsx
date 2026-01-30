import { useState } from 'react';
import type { MapLocation } from './types';
import { mapLocations } from './mapData';

interface Props {
  onSelectAction: (nodeId: string) => void;
  unlockedLocations: string[];
}

export default function WorldMap({ onSelectAction, unlockedLocations }: Props) {
  const [selectedLoc, setSelectedLoc] = useState<MapLocation | null>(null);

  // Helper per colori in base alla fazione
  const getRegionStyle = (region: string) => {
    switch(region) {
      case 'EMPIRE': return 'bg-gray-400 border-gray-600 shadow-gray-500/50';
      case 'DOMINION': return 'bg-purple-500 border-purple-300 shadow-purple-500/50';
      case 'FREELANDS': return 'bg-amber-600 border-amber-400 shadow-amber-500/50';
      default: return 'bg-white';
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-slate-900 overflow-hidden rounded-xl border-2 border-slate-700 shadow-2xl">
      
      {/* SFONDO (Placeholder texture) */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{ 
            backgroundImage: `url('https://www.transparenttextures.com/patterns/black-scales.png')`,
            backgroundSize: 'auto'
        }}
      ></div>
      
      {/* TITOLO MAPPA */}
      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-white text-xl font-bold bg-black/60 px-4 py-2 rounded backdrop-blur-sm border border-gray-700">
          Mappa di Aethelgard
        </h2>
      </div>

      {/* RENDERIZZAZIONE DEI PUNTI (NODI) */}
      {mapLocations.map((loc) => {
        const isUnlocked = unlockedLocations.includes(loc.id) || loc.status === 'UNLOCKED';
        
        return (
          <button
            key={loc.id}
            onClick={() => isUnlocked && setSelectedLoc(loc)}
            disabled={!isUnlocked}
            className={`
              absolute w-8 h-8 rounded-full transform -translate-x-1/2 -translate-y-1/2 
              border-2 transition-all duration-300 z-10 flex items-center justify-center
              ${isUnlocked 
                ? `${getRegionStyle(loc.region)} hover:scale-125 cursor-pointer hover:shadow-[0_0_20px_currentColor]` 
                : 'bg-gray-800 border-gray-700 opacity-50 cursor-not-allowed grayscale'
              }
            `}
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          >
            {/* Indicatore "Tu sei qui" potrebbe essere aggiunto qui in futuro */}
            {isUnlocked && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            
            {/* Tooltip Hover */}
            <span className="absolute top-10 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20 border border-gray-600">
              {loc.name}
            </span>
          </button>
        );
      })}

      {/* POPUP DETTAGLI LUOGO */}
      {selectedLoc && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-800 rounded-lg border border-slate-600 max-w-md w-full shadow-2xl relative overflow-hidden">
            
            {/* Header del Popup */}
            <div className={`h-2 w-full ${getRegionStyle(selectedLoc.region).split(' ')[0]}`}></div>
            
            <button 
              onClick={() => setSelectedLoc(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/20 hover:bg-black/40 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-1">{selectedLoc.name}</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{selectedLoc.region}</p>
              <p className="text-gray-300 mb-8 italic text-sm leading-relaxed border-l-2 border-gray-600 pl-3">
                "{selectedLoc.description}"
              </p>

              {/* Lista Azioni */}
              <div className="space-y-3">
                <p className="text-xs text-gray-500 uppercase font-bold">Luoghi d'interesse:</p>
                {selectedLoc.actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => {
                        onSelectAction(action.storyNodeId);
                        setSelectedLoc(null);
                    }}
                    className="w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 text-gray-100 rounded border border-slate-600 hover:border-purple-400 transition-all flex justify-between items-center group"
                  >
                    <span className="font-medium">{action.label}</span>
                    <span className="text-gray-500 group-hover:text-purple-300 transform group-hover:translate-x-1 transition-all">➜</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
