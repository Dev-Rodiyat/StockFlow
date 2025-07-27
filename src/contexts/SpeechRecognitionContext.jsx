import React, { createContext, useContext, useState } from 'react';

const SpeechContext = createContext();

export const SpeechProvider = ({ children }) => {
  const [listening, setListening] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const startListening = (onResult) => {
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  return (
    <SpeechContext.Provider value={{ listening, startListening }}>
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => useContext(SpeechContext);
