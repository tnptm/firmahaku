import { FirmaResult } from "./FirmaHaku"
import LoadIndicator from "./utils/LoadIndicator"
import { useState } from "react";

interface FirmaDataExtended {
    id: number;
    yt: string;
    name: string;
    type: string;
    registrationDate: string;
    address: string;
    phone: string;
    email: string;
}

export default function FirmaData({ firma }: { firma: FirmaResult | null }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [firmaDetails, setFirmaDetails] = useState<any | null>(null);
    const [showData, setShowData] = useState<boolean>(false);
   

    

    function handleMore() {
        const status: boolean = isLoading;
        setIsLoading(!status);
        setShowData(!showData);
        //setIsLoading
        fetch(`api/company?id=${firma?.id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setFirmaDetails(data);
                    setIsLoading(false);
                    console.log("Hakutulokset:", data);
                })
                .catch((error) => {
                    setIsLoading(false)
                    console.error("Fetch error:", error);
                });
    }



    return (
        <>
            <div className="bg-sky-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">{`${firma?.name}`}</h2>
                <p>Y-tunnus: {firma?.yt}</p>
                <p>Rekisteröity: {firma?.registrationDate}</p>
                <button className=" hover:bg-gray-200 font-semibold"
                    onClick={handleMore}
                >
                    Lisää...
                </button>
                <LoadIndicator isLoading={isLoading}/>
                {firmaDetails && showData && (
                    <div>
                        <h3 className="text-xl font-semibold">Lisätiedot</h3>
                        <p>Osoite: {firmaDetails.website.url}</p>
                        <p>Puhelin: {firmaDetails.addresses}</p>
                        <p>Sähköposti: {firmaDetails.email}</p>
                    </div>
                    )
                }
                <div className=" bg-gray-100 p-4 rounded-lg">
                    {firmaDetails && showData && (<code>
                        <pre className="text-xs">{JSON.stringify(firmaDetails, null, 2)}</pre>
                    </code>)}
                </div>
            </div>
        </>
    )
}