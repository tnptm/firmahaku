'use client';

import { useLanguage } from '../../context/LanguageContext';
//import { useState } from 'react';
/*
interface LanguageType {
  langCode: string;
  langNum: number;
}

const languagesAvailable: LanguageType[] = [
    { langCode: 'en', langNum: 3 },
    { langCode: 'fi', langNum: 1 },
    { langCode: 'sv', langNum: 2 },
    ];
*/
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