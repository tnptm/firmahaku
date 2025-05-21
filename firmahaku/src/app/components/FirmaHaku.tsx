'use client';

import { useState, useEffect } from "react"

import FirmaData from "./FirmaData";
import FirmaPaginator from "./FirmaPaginator";
import LoadIndicator from "./utils/LoadIndicator";
import { useLanguage } from "../context/LanguageContext";
import { NPTrans } from "../lib/translations"
import NpTransC from "./NpTransC";
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
const trans = new NPTrans()
/*
function getTranslatedTextAfterDelay(key:string):Promise<string> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(trans.getTranslation(key))
        }, 500)
    })
}
*/
// Solve how this handleTranslation can return value inside the FirmaHaku react rendering
/*async function handleTranslation(key: string){
    const retval = getTranslatedTextAfterDelay(key).then((text) => {
        console.log("Translation:", text)
        return text})
    console.log("Retval:", retval)
    //return text    
}
*/


export default function FirmaHaku() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<FirmaResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [duration, setDuration] = useState(0);
    const [showResults, setShowResults] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState<FirmaResult | null>(null);
    const { language } = useLanguage();
    const [cleaning, setCleaning] = useState(false)
    const [updtT, setUpdtT] = useState(0)
    const [currentCode, setCurrentCode] = useState('fi')
    //const [startTime, setStartTime] = useState(0);
    //const [endTime, setEndTime] = useState(0);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    useEffect(()=>{
        // This code is needed for getting small update once after short delay of 
        // changing the language that translation functions will be triggered too in UI
        // UseEffect is triggered whne language is changed or updt counter is increased by one..
        if (currentCode != language){
            setTimeout(()=>setUpdtT(updtT + 1),200)

            //setUpdtT(updtT + 1) // makes this use effect be triggered again
            trans.setLanguage(language)
            setCurrentCode(language)
        }

        trans.setLanguage(language)
        
        console.log("Language changed to:" + language)
    },[language, updtT])


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
        setCleaning(false)
    }

 
    return (
        <>
            {/*<span>lang: {language}</span>*/}
            <div className="mt-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`${trans.getTranslation("haku_placeholder")}`}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={handleSearch}
                >
                    <NpTransC trkey={'haku'}/>
                </button>
                <span className="h-8 w-8 inline-block">
                    <LoadIndicator isLoading={isLoading} />
                </span>
                
            </div>
            <div className={`${showResults ? 'block' : 'hidden'}`}>
                <div id="result-container" className="mt-8">
                    <h2 className="text-2xl font-semibold">
                        <NpTransC trkey={"hakutulokset"}/>
                    </h2>
                    <div>
                        <small>
                            {
                                results.length > 0 &&  `${trans.getTranslation("tuloksia")}: ${results.length} ${trans.getTranslation("kpl")}, ${trans.getTranslation("haku_kesti")}: ${duration.toFixed(2)} s`
                            }
                        </small>
                    </div>
                    <div id="results" className="mt-4">
                        <FirmaPaginator results={results} onClicking={handleLinkClick}/>
                    </div>
                </div>
            </div>
            <div className={`${!showResults ? 'block' : 'hidden'}`}>
                {/* back to search results*/}
                <button className="mt-4 mb-4 px-2 py-1 text-gray-700 bg-green-300 hover:bg-green-400 rounded text-sm cursor-pointer"
                    onClick={() => {
                        setShowResults(true);
                        setSelectedCompany(null);
                        setCleaning(true)
                    }}>
                        {`<<  ${trans.getTranslation("takaisin_haku")}`}
                </button>
                
                <FirmaData firma={selectedCompany} clean={cleaning} />
            </div> 
        </>
    )
}
