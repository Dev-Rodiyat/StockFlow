import React, { createContext, useContext } from 'react';
import axios from 'axios';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const API_KEY = import.meta.env.VITE_TRANSLATOR_API_KEY;

  const translateText = async (text, to = 'fr', from = 'auto') => {
    try {
      const res = await axios.post(
        'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
        {
          from,
          to,
          text
        },
        {
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
            'Content-Type': 'application/json',
          }
        }
      );

      return res.data.trans;
    } catch (error) {
      console.error('Translation error:', error.message);
      throw error;
    }
  };

  return (
    <TranslationContext.Provider value={{ translateText }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
