import React, { useState } from 'react';
import InputPanel from './components/InputPanel';
import DialogueCard from './components/DialogueCard';
import { generateDialogue } from './services/geminiService';
import { NPCDialogue } from './types';

const App: React.FC = () => {
  const [currentDialogue, setCurrentDialogue] = useState<NPCDialogue | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (setting: string, tone: string, context: string) => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateDialogue({ setting, tone, context });
      setCurrentDialogue(result);
    } catch (err) {
      setError("Failed to commune with the spirits. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-mystic-900 text-gray-200 font-sans selection:bg-amber-900 selection:text-white flex flex-col">
      {/* Header */}
      <header className="bg-mystic-900 border-b border-gray-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-md flex items-center justify-center shadow-lg shadow-amber-900/20 transform rotate-3">
                <span className="font-serif font-bold text-xl text-parchment-100">W</span>
             </div>
             <h1 className="text-xl font-serif font-bold tracking-wider text-parchment-100">Wayfarer's Words</h1>
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-widest hidden sm:block">
            NPC Dialogue Generator
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)] min-h-[600px]">
          
          {/* Left Panel - Controls */}
          <div className="lg:col-span-4 h-full">
            <InputPanel onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>

          {/* Right Panel - Output */}
          <div className="lg:col-span-8 h-full">
            {error && (
                <div className="bg-red-900/20 border border-red-700/50 text-red-200 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                    <span className="font-bold">Error:</span> {error}
                </div>
            )}
            <DialogueCard data={currentDialogue} isLoading={isGenerating} />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-800 py-4 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Wayfarer's Words. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;