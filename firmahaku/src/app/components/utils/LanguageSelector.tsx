'use client';

import { useLanguage } from '../../context/LanguageContext';

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value as any)}>
      <option value="en">English</option>
      <option value="fi">Suomi</option>
      <option value="sv">Svenska</option>
    </select>
  );
};