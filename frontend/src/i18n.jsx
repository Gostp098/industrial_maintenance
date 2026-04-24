import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import fr from './locales/fr.json';
import en from './locales/en.json';

const translations = { fr, en };

const I18nContext = createContext(null);

/**
 * Resolves dotted keys like "home.heroTitle" inside a JSON dictionary.
 * If the key isn't found, returns the key itself — helpful during development
 * because missing translations become visible in the UI instead of rendering as
 * blank strings.
 */
function resolvePath(obj, path) {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return path;
    }
  }
  return current;
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
    return stored === 'en' || stored === 'fr' ? stored : 'fr';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const dict = translations[lang] || translations.fr;
    return {
      lang,
      setLang,
      toggle: () => setLang((prev) => (prev === 'fr' ? 'en' : 'fr')),
      t: (key) => resolvePath(dict, key),
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
