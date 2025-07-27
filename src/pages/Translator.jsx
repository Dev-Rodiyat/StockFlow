import React, { useEffect, useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { useSpeech } from '../contexts/SpeechRecognitionContext';
import { useTextToSpeech } from '../contexts/TextToSpeechContext';
import languages from '../utils/languages';
import { toast } from 'react-toastify';
import { FaRegCopy, FaShare } from 'react-icons/fa';

const Translator = () => {
    const { translateText } = useTranslation();
    const { startListening, listening } = useSpeech();
    const {
        speak,
        pause,
        resume,
        stop,
        voices,
        selectedVoice,
        setSelectedVoice
    } = useTextToSpeech();

    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('fr');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('translationHistory');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (!voices.length || !targetLang) return;
        const bestVoice =
            voices.find((v) => v.lang.toLowerCase().startsWith(targetLang.toLowerCase())) ||
            voices.find((v) => v.lang.toLowerCase().startsWith(targetLang.split('-')[0])) ||
            voices[0];

        setSelectedVoice(bestVoice);
    }, [targetLang, voices]);

    const handleTranslate = async () => {
        if (!text.trim()) return;
        setLoading(true);
        const result = await translateText(text, targetLang, sourceLang);
        if (result) {
            setTranslatedText(result);
            const newEntry = {
                id: Date.now(),
                original: text,
                translated: result,
                from: sourceLang,
                to: targetLang,
            };
            const updatedHistory = [newEntry, ...history];
            setHistory(updatedHistory);
            localStorage.setItem('translationHistory', JSON.stringify(updatedHistory));
        }
        setLoading(false);
    };

    const handleSpeechInput = () => {
        startListening((transcript) => setText(transcript));
    };

    const handleSwapLanguages = () => {
        if (sourceLang === targetLang) return;
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
    };

    return (
        <div className="mx-auto min-h-screen bg-white dark:bg-[#1a120b] pt-12 transition-all duration-300">
            <div className="max-w-2xl mx-auto px-6 py-8 mt-6 rounded-2xl shadow-xl bg-[#F5EFE6] text-[#3D2B1F] dark:bg-[#312215] dark:text-[#FDFBF9] transition-all duration-300">
                <h1 className="text-3xl font-bold mb-6 text-center">🌍 Language Translator</h1>

                <textarea
                    className="w-full p-4 rounded-xl bg-white dark:bg-[#2E1F14] border border-[#D2B48C] dark:border-[#5C4033] text-sm focus:outline-none focus:ring-2 focus:ring-[#A47551] transition"
                    rows={8}
                    placeholder="Type or use voice to translate..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="flex items-center justify-between gap-4 mt-4">
                    <select
                        className="flex-1 p-2 rounded-lg bg-white dark:bg-[#2E1F14] border border-[#D2B48C] dark:border-[#5C4033] text-sm"
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value)}
                    >
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleSwapLanguages}
                        className="text-2xl px-2 py-1 rounded-full shadow hover:scale-105 transition"
                        title="Swap languages"
                    >
                        🔄
                    </button>

                    <select
                        className="flex-1 p-2 rounded-lg bg-white dark:bg-[#2E1F14] border border-[#D2B48C] dark:border-[#5C4033] text-sm"
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                    >
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={handleTranslate}
                        disabled={loading}
                        className="flex-1 py-2 bg-[#8B5E3C] hover:bg-[#A47551] text-white rounded-lg font-semibold transition"
                    >
                        {loading ? 'Translating...' : 'Translate'}
                    </button>

                    <button
                        onClick={handleSpeechInput}
                        disabled={listening}
                        className={`flex-1 py-2 rounded-lg font-semibold transition ${listening
                            ? 'bg-gray-400 text-white'
                            : 'bg-[#5C4033] text-white hover:bg-[#7B5636]'
                            }`}
                    >
                        {listening ? 'Listening...' : '🎤 Speak'}
                    </button>
                </div>

                {translatedText && (
                    <div className="relative mt-6 bg-white dark:bg-[#2E1F14] p-4 rounded-xl border border-[#D2B48C] dark:border-[#5C4033]">
                        <div className="absolute top-3 right-4 flex gap-2">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(translatedText);
                                    toast.success('Copied to clipboard!');
                                }}
                                title="Copy"
                                className="text-gray-600 dark:text-gray-200 hover:text-green-500 text-xl"
                            >
                                <FaRegCopy />
                            </button>
                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator
                                            .share({
                                                title: 'Translation from HiTranslate',
                                                text: translatedText,
                                            })
                                            .catch((err) => console.error('Sharing failed:', err));
                                    } else {
                                        navigator.clipboard.writeText(translatedText);
                                        toast.success('Shared (copied to clipboard)');
                                    }
                                }}
                                title="Share"
                                className="text-gray-600 dark:text-gray-200 hover:text-purple-500 text-xl"
                            >
                                <FaShare/>
                            </button>
                        </div>

                        <h2 className="font-semibold text-lg mb-2">Translated:</h2>
                        <p className="text-sm mb-4 break-words">{translatedText}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                                onClick={() => speak(translatedText, targetLang)}
                            >
                                🔊 Listen
                            </button>
                            <button
                                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm"
                                onClick={pause}
                            >
                                ⏸ Pause
                            </button>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                                onClick={resume}
                            >
                                ▶️ Resume
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                                onClick={stop}
                            >
                                🛑 Stop
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Translator;
