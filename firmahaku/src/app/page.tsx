//import Image from "next/image";
import FirmaHaku from "./components/FirmaHaku";
import { LanguageProvider } from './context/LanguageContext';
import { LanguageSelector } from "./components/utils/LanguageSelector";

import MainSection from "./components/MainSection";

export default function Home() {
    return (
        <LanguageProvider>
            <div className="mx-auto items-center min-h-screen sm:p-0 md:p-24 w-2xl">
                <header className="flex items-center justify-between w-full h-24 border-b">
                  <div className="flex items-center">
                      {/* language selector */}
                      <LanguageSelector />
                  </div>
                </header>
                <MainSection />
                <div>
                    <FirmaHaku />
                </div>
                <footer className="flex items-center justify-center w-full h-24 border-t">
                    <p className="text-sm text-gray-500">
                        &copy; 2025 Firmahaku. All rights reserved. Data source: PRH.fi
                    </p>
                </footer>
            </div>
        </LanguageProvider>
    );
}
