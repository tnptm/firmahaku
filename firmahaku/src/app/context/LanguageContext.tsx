'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fi' | 'sv';

const LanguageContext = createContext<{
    language: Language;
    setLanguage: (lang: Language) => void;
}>({
    language: 'fi',
    setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('fi');

    useEffect(() => {
        const saved = localStorage.getItem('lang') as Language | null;
        if (saved) setLanguageState(saved);
    }, []);

    const setLanguage = (lang: Language) => {
        localStorage.setItem('lang', lang);
        setLanguageState(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);