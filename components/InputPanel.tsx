import React from 'react';
import { Setting, Tone } from '../types';
import { SparklesIcon, LoaderIcon } from './Icons';

interface InputPanelProps {
  onGenerate: (setting: string, tone: string, context: string) => void;
  isGenerating: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ onGenerate, isGenerating }) => {
  const [setting, setSetting] = React.useState<string>(Setting.Forest);
  const [tone, setTone] = React.useState<string>(Tone.Desperate);
  const [context, setContext] = React.useState<string>("");
  const [customSetting, setCustomSetting] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(customSetting || setting, tone, context);
  };

  return (
    <div className="bg-mystic-800 border border-gray-700 p-6 rounded-xl shadow-xl h-full flex flex-col">
      <div className="mb-6 border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-serif text-parchment-200 mb-1">Traveler's Parameters</h2>
        <p className="text-gray-400 text-sm">Define the conditions of the encounter.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-6">
        {/* Setting Selection */}
        <div>
          <label className="block text-parchment-300 text-sm font-bold mb-2 uppercase tracking-wider">
            Environment / Setting
          </label>
          <select
            value={setting}
            onChange={(e) => {
              setSetting(e.target.value);
              if (e.target.value !== 'Custom') setCustomSetting("");
            }}
            className="w-full bg-mystic-900 text-parchment-100 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors"
          >
            {Object.entries(Setting).map(([key, value]) => (
              <option key={key} value={value}>{value}</option>
            ))}
            <option value="Custom">Custom...</option>
          </select>
          
          {setting === 'Custom' && (
            <input
              type="text"
              placeholder="e.g. Floating Castle Ruins"
              value={customSetting}
              onChange={(e) => setCustomSetting(e.target.value)}
              className="mt-2 w-full bg-mystic-900 text-parchment-100 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          )}
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-parchment-300 text-sm font-bold mb-2 uppercase tracking-wider">
            Emotional Tone
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(Tone).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={`px-3 py-2 rounded-md text-sm transition-all duration-200 border ${
                  tone === t
                    ? 'bg-amber-900/40 border-amber-600 text-amber-200'
                    : 'bg-mystic-900 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Context */}
        <div>
          <label className="block text-parchment-300 text-sm font-bold mb-2 uppercase tracking-wider">
            Context Hint (Optional)
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., They lost a magical locket, or they are running from bounty hunters."
            className="w-full bg-mystic-900 text-parchment-100 border border-gray-600 rounded-lg px-4 py-3 h-24 focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
          />
        </div>

        <div className="mt-auto pt-4">
          <button
            type="submit"
            disabled={isGenerating}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-lg font-serif font-bold text-lg uppercase tracking-widest transition-all transform active:scale-95 ${
              isGenerating
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-parchment-100 shadow-lg shadow-amber-900/20'
            }`}
          >
            {isGenerating ? (
              <>
                <LoaderIcon className="w-5 h-5" />
                Conjuring...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Generate Encounter
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputPanel;