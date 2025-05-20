//import Image from "next/image";
import FirmaHaku from "./components/FirmaHaku";
import { LanguageProvider } from './context/LanguageContext';
import { LanguageSelector } from "./components/utils/LanguageSelector";

export default function Home() {
    return (
        <LanguageProvider>
            <div className="flex flex-col items-center justify-between min-h-screen p-24">
                <header className="flex items-center justify-between w-full h-24 border-b">
                  <div className="flex items-center">
                      {/* language selector */}
                      <LanguageSelector />
                  </div>
                </header>
                <main>
                    <h1 className="text-4xl font-bold">Firmahaku</h1>
                    <p className="mt-4 text-lg">
                        Firmahakusi alkaa tästä
                    </p>
                  
                </main>
                <div>
                    <FirmaHaku />
                </div>
                <footer className="flex items-center justify-center w-full h-24 border-t">
                    <p className="text-sm text-gray-500">
                        &copy; 2025 Firmahaku. All rights reserved.
                    </p>
                </footer>
            </div>
        </LanguageProvider>
    );
}
