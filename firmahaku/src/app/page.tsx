//import Image from "next/image";
import FirmaHaku from "./components/FirmaHaku";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-24">
      <main>
        <h1 className="text-4xl font-bold">Firmahaku</h1>
        <p className="mt-4 text-lg">
          Firmahakusi alkaa tästä
        </p>
        <FirmaHaku />
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-sm text-gray-500">
          &copy; 2025 Firmahaku. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
