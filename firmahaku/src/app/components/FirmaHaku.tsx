'use client';

import { useState } from "react"

export default function FirmaHaku() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        console.log("Hakusana:", searchTerm);
        
        if (searchTerm.trim().length > 2){
            setIsLoading(true);
            fetch(`api/search?q=${searchTerm}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setIsLoading(false)
                    console.log("Hakutulokset:", data);
                    setResults(data);
                })
                .catch((error) => {
                    setIsLoading(false)
                    console.error("Fetch error:", error);
                    alert("Error in fetcing data")
                });

        }
    }

    return (
        <>
            <div className="mt-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Etsi yrityksiä"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={handleSearch}
                >Hae
                </button>
                {isLoading & (
                    <span>
                        Ladataan tietoja...
                    </span>
                )}
            </div>
            <div id="result-container" className="mt-8">
                <h2 className="text-2xl font-semibold">Hakutulokset</h2>
                <div id="results" className="mt-4">
                    {
                        /* Hakutulokset näytetään täällä */
                        results.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {results.map((result: any, index) => (
                                    <li key={index} className="mb-2">
                                        <a href={`/firma/${result.id}`} className="text-blue-500 hover:underline">
                                            {`${result.name} (${result.yt})`}
                                        </a>
                                    </li>
                                ))}
                            </ul>   
                        ) : (
                            <p className="text-gray-500">Ei hakutuloksia</p>
                        )                 
                    } 
                </div>
            </div>    
        </>
    )
}
