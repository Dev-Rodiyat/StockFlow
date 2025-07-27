import { createContext, useContext, useEffect, useState } from "react";

const TranslationHistoryContext = createContext();

export const useTranslationHistory = () => useContext(TranslationHistoryContext);

export const TranslationHistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("translationHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const addToHistory = (entry) => {
    const newEntry = { ...entry, id: Date.now() };
    const updated = [newEntry, ...history];
    setHistory(updated);
    localStorage.setItem("translationHistory", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("translationHistory");
  };

  return (
    <TranslationHistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </TranslationHistoryContext.Provider>
  );
};
