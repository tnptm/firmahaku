'use client';

import { useState } from "react"
import FirmaLink from "./FirmaLink";
import FirmaData from "./FirmaData";
import LoadIndicator from "./utils/LoadIndicator";
import { useLanguage } from "../context/LanguageContext";
// Search performace timer
class MyTimer {
    startTime: number;
    endTime: number;

    constructor() {
        this.startTime = 0;
        this.endTime = 0;
    }

    start() {
        this.startTime = Date.now();
    }

    stop() {
        this.endTime = Date.now();
    }
    getDuration(){
        if (this.startTime && this.endTime && this.startTime < this.endTime) {
            return (this.endTime - this.startTime)/1000;
        } else {
            return 0;
        }
    }
}

export interface FirmaResult {
    id: number;
    yt: string;
    name: string;
    type: string;
    registrationDate: string;
}

/*type FirmaLinkProps = {
    linkdata: FirmaResult;
    onClicking: (firmaId: number) => void;
}*/

export default function FirmaHaku() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<FirmaResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [duration, setDuration] = useState(0);
    const [showResults, setShowResults] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState<FirmaResult | null>(null);
    const { language } = useLanguage();
    //const [startTime, setStartTime] = useState(0);
    //const [endTime, setEndTime] = useState(0);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    /* timer ei toimi statessa
    function endFetchTimer() {
        let end = Date.now();
        //setEndTime(end);
        const duration = end - startTime;
        setDuration(duration);
        console.log("Fetch kesti:", ((end - startTime)/1000).toFixed(4), "s");
    }
    function resetFetchTimer() {
        setStartTime(0);
        //setEndTime(0);
    }*/

    const handleSearch = () => {
        setShowResults(true);
        console.log("Hakusana:", searchTerm);
        const myTimer = new MyTimer();
        if (searchTerm.trim().length > 2){
            setIsLoading(true);
            myTimer.start();
            fetch(`api/search?q=${searchTerm}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    myTimer.stop();
                    setDuration(myTimer.getDuration());
                    setIsLoading(false)
                    console.log("Hakutulokset:", data);
                    setResults(data);
                })
                .catch((error) => {
                    //resetFetchTimer()
                    myTimer.stop();
                    setIsLoading(false)
                    console.error("Fetch error:", error);
                    alert("Error in fetcing data")
                });

        }
    }

    function handleLinkClick(firma: FirmaResult) {

        console.log("Link clicked:", firma.id);
        setShowResults(false);
        setSelectedCompany(firma);
    }

    return (
        <>
            <span>lang: {language}</span>
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
                <span className="h-8 w-8 inline-block">
                    <LoadIndicator isLoading={isLoading} />
                </span>
                
            </div>
            <div className={`${showResults ? 'block' : 'hidden'}`}>
                <div id="result-container" className="mt-8">
                    <h2 className="text-2xl font-semibold">Hakutulokset</h2>
                    <div>
                        <small>
                            {
                                results.length > 0 &&  `Tuloksia: ${results.length} kpl, haku kesti: ${duration.toFixed(2)} s`
                            }
                        </small>
                    </div>
                    <div id="results" className="mt-4">
                        {
                            /* Hakutulokset näytetään täällä */
                            results.length > 0 ? (
                                <ul className="list-disc pl-5">
                                    {results.map((result: FirmaResult, index) => (
                                        <li key={index} className="mb-2">
                                            <FirmaLink linkdata={result} onClicking={handleLinkClick} />
                                        </li>
                                    ))}
                                </ul>   
                            ) : (
                                <p className="text-gray-500">Ei hakutuloksia</p>
                            )                 
                        } 
                    </div>
                </div>
            </div>
            <div className={`${!showResults ? 'block' : 'hidden'}`}>
                {/* back to search results*/}
                <button className="mt-4 mb-4 px-2 py-1 text-black bg-white hover:bg-blue-100"
                    onClick={() => {
                        setShowResults(true);
                        setSelectedCompany(null);

                    }}>
                        Takaisin tuloksiin
                </button>
                
                <FirmaData firma={selectedCompany} />
            </div> 
        </>
    )
}
