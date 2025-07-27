import React, { createContext, useContext, useEffect, useState } from 'react';

const TextToSpeechContext = createContext();

export const TextToSpeechProvider = ({ children }) => {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    // Load voices (some browsers load them async)
    useEffect(() => {
        const loadVoices = () => {
            const loadedVoices = window.speechSynthesis.getVoices();
            setVoices(loadedVoices);

            // Set default voice (e.g., English)
            const defaultVoice = loadedVoices.find(v => v.lang.startsWith('en')) || loadedVoices[0];
            setSelectedVoice(defaultVoice);
        };

        loadVoices();
        if (typeof window !== 'undefined') {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const speak = (text, lang = 'en') => {
        if (!window.speechSynthesis) {
            alert('Text-to-speech not supported.');
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;

        // Always try to select matching voice for the language
        const matchedVoice =
            voices.find(v => v.lang.toLowerCase().startsWith(lang.toLowerCase())) ||
            voices.find(v => v.lang.toLowerCase().startsWith(lang.split('-')[0])) ||
            voices[0]; // fallback

        if (matchedVoice) {
            utterance.voice = matchedVoice;
        }

        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    };

    const pause = () => window.speechSynthesis.pause();
    const resume = () => window.speechSynthesis.resume();
    const stop = () => window.speechSynthesis.cancel();

    return (
        <TextToSpeechContext.Provider
            value={{
                speak,
                pause,
                resume,
                stop,
                voices,
                selectedVoice,
                setSelectedVoice,
            }}
        >
            {children}
        </TextToSpeechContext.Provider>
    );
};

export const useTextToSpeech = () => useContext(TextToSpeechContext);
