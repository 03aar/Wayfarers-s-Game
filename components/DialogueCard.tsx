import React from 'react';
import { NPCDialogue } from '../types';
import { CopyIcon, DiceIcon } from './Icons';

interface DialogueCardProps {
  data: NPCDialogue | null;
  isLoading: boolean;
}

const DialogueCard: React.FC<DialogueCardProps> = ({ data, isLoading }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center text-gray-500 bg-mystic-800/50 rounded-xl border border-dashed border-gray-700">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-gray-700 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 border-4 border-amber-900/50 rounded-full animate-spin"></div>
        </div>
        <p className="font-serif text-xl mb-2 animate-pulse">Consulting the oracles...</p>
        <p className="text-sm">Weaving a tale of misfortune.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center text-gray-500 bg-mystic-800/50 rounded-xl border border-dashed border-gray-700">
        <DiceIcon className="w-16 h-16 mb-4 opacity-20" />
        <p className="font-serif text-xl mb-2">No Active Encounter</p>
        <p className="text-sm">Use the panel on the left to summon a lost traveler.</p>
      </div>
    );
  }

  return (
    <div className="relative bg-parchment-200 text-parchment-900 rounded-sm shadow-2xl overflow-hidden h-full flex flex-col max-h-[80vh] md:max-h-full">
        {/* Decorative Border Elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-parchment-800 rounded-tl-3xl z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-parchment-800 rounded-tr-3xl z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-parchment-800 rounded-bl-3xl z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-parchment-800 rounded-br-3xl z-10 pointer-events-none"></div>

        {/* Header */}
        <div className="bg-parchment-300 p-6 pt-8 border-b-2 border-parchment-800/20 relative">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-parchment-900 tracking-wide">{data.npcName}</h2>
                    <p className="text-parchment-800 font-bold italic mt-1">{data.archetype}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(`${data.npcName} (${data.archetype})\n"${data.shortBark}"\n\n${data.mainDialogue}`)}
                  className="text-parchment-800 hover:text-amber-900 hover:bg-parchment-400/50 p-2 rounded-full transition-colors"
                  title="Copy to clipboard"
                >
                    {copied ? <span className="text-xs font-bold">Copied!</span> : <CopyIcon className="w-5 h-5" />}
                </button>
            </div>
            <div className="mt-4 text-sm text-parchment-800/80 border-l-2 border-parchment-800 pl-3 italic">
                {data.visualDescription}
            </div>
        </div>

        {/* Content Scrollable Area */}
        <div className="overflow-y-auto p-8 space-y-8 custom-scrollbar flex-grow">
            
            {/* Section 1: Short Bark */}
            <div className="relative pl-6">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-900/30 rounded-full"></div>
                 <span className="absolute -left-1.5 -top-2 text-4xl font-serif text-amber-900/20 select-none">“</span>
                 <p className="font-serif text-xl italic text-parchment-900 leading-relaxed">
                    {data.shortBark}
                 </p>
                 <span className="text-xs uppercase tracking-widest text-parchment-800/60 font-bold mt-2 block">Initial Reaction (Bark)</span>
            </div>

            {/* Section 2: Main Dialogue */}
            <div className="bg-parchment-100 p-6 rounded-lg shadow-inner border border-parchment-800/10">
                 <h3 className="text-xs uppercase tracking-widest text-parchment-800/60 font-bold mb-3">The Plight</h3>
                 <p className="font-serif text-lg text-parchment-900 leading-relaxed whitespace-pre-wrap">
                    {data.mainDialogue}
                 </p>
            </div>

            {/* Section 3: Reaction to Help */}
            <div className="relative pl-6">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-900/30 rounded-full"></div>
                 <h3 className="text-xs uppercase tracking-widest text-parchment-800/60 font-bold mb-2">Response to Aid</h3>
                 <p className="font-serif text-lg italic text-parchment-900 leading-relaxed">
                    "{data.reactionToHelp}"
                 </p>
            </div>
        </div>
        
        <div className="bg-parchment-300 p-2 text-center text-xs text-parchment-800/50 font-serif tracking-widest border-t border-parchment-800/10">
            GENERATED CONTENT
        </div>
    </div>
  );
};

export default DialogueCard;