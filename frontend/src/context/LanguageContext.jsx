import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, directDictionary } from "../data/translations";

const LanguageContext = createContext();

const STORAGE_KEY = "ayursutra_lang";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "hi" || saved === "en" ? saved : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    } catch {
      // Storage access blocked or unavailable
    }
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (lang === "en" || lang === "hi") {
      setLanguageState(lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "en" ? "hi" : "en"));
  }, []);

  const t = useCallback(
    (key, fallbackOrParams, params) => {
      let fallback = typeof fallbackOrParams === "string" ? fallbackOrParams : undefined;
      let interpolations =
        typeof fallbackOrParams === "object" && fallbackOrParams !== null
          ? fallbackOrParams
          : params || {};

      let resolved = undefined;

      // 1. Direct dictionary match
      if (directDictionary[key] && directDictionary[key][language]) {
        resolved = directDictionary[key][language];
      }

      // 2. Namespaced translation match
      if (resolved === undefined && translations[language] && translations[language][key]) {
        resolved = translations[language][key];
      }

      // 3. Fallback to English dictionary match
      if (resolved === undefined && language !== "en") {
        if (directDictionary[key] && directDictionary[key].en) {
          resolved = directDictionary[key].en;
        } else if (translations.en && translations.en[key]) {
          resolved = translations.en[key];
        }
      }

      // 4. Default fallback or key itself
      if (resolved === undefined) {
        resolved = fallback !== undefined ? fallback : key;
      }

      // Interpolate {param}
      if (typeof resolved === "string" && Object.keys(interpolations).length > 0) {
        return resolved.replace(/\{(\w+)\}/g, (match, paramName) => {
          return paramName in interpolations ? interpolations[paramName] : match;
        });
      }

      return resolved;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isHindi: language === "hi",
        isEnglish: language === "en",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguageContext must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
