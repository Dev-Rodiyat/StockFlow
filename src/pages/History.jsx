import React, { useState } from 'react';
import { useTranslationHistory } from '../contexts/TranslationHistoryContext';
import { useTextToSpeech } from '../contexts/TextToSpeechContext';
import { getFlagUrl } from '../utils/getFlagUrl';
import { motion } from 'framer-motion';

const History = () => {
  const { history, clearHistory } = useTranslationHistory();
  const { speak, pause, resume, stop } = useTextToSpeech();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(
    (entry) =>
      entry.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.translated.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translation_history.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
   <div className="min-h-screen bg-white dark:bg-[#1a120b] pt-12 transition-colors">
  <div className="max-w-3xl mx-auto p-6 space-y-6 rounded-xl shadow-md transition-colors">
    <h1 className="text-3xl font-bold text-amber-700 dark:text-white">🕒 Translation History</h1>

    <div className="flex flex-col sm:flex-row gap-3 items-center">
      <input
        type="text"
        placeholder="Search by text..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 dark:border-[#312215] rounded-md bg-white dark:bg-[#312215] text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-neutral-400"
      />
      <button
        onClick={handleDownload}
        className="min-w-[140px] bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-md transition"
      >
        ⬇️ Download
      </button>
    </div>

    {filteredHistory.length === 0 ? (
      <p className="text-gray-500 dark:text-neutral-300">No matching history found.</p>
    ) : (
      <>
        <div className="space-y-4 overflow-y-auto pr-2">
          {filteredHistory.map((entry) => (
            <div
              key={entry.id}
              className="bg-amber-50 dark:bg-[#312215] border border-amber-200 dark:border-[#312215] rounded-lg p-4 space-y-3 shadow-sm"
            >
              <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                {getFlagUrl(entry.from) && (
                  <img src={getFlagUrl(entry.from)} alt={entry.from} className="w-5 h-4 rounded-sm" />
                )}
                <strong>From ({entry.from})</strong>: {entry.original}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                {getFlagUrl(entry.to) && (
                  <img src={getFlagUrl(entry.to)} alt={entry.to} className="w-5 h-4 rounded-sm" />
                )}
                <strong>To ({entry.to})</strong>: {entry.translated}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => speak(entry.translated, entry.to)}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md"
                >
                  🔊 Play
                </button>
                <button
                  onClick={pause}
                  className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md"
                >
                  ⏸ Pause
                </button>
                <button
                  onClick={resume}
                  className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md"
                >
                  ▶ Resume
                </button>
                <button
                  onClick={stop}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md"
                >
                  ⏹ Stop
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={clearHistory}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md"
        >
          🗑 Clear All History
        </button>
      </>
    )}
  </div>
</div>

  );
};

export default History;
