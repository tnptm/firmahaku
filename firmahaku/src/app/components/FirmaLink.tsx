'use client'

import { FirmaResult } from "./FirmaHaku"

type FirmaLinkProps = {
    linkdata: FirmaResult;
    onClicking: (firma: FirmaResult) => void;
}
//         console.log("Fetch time: " + duration);

export default function FirmaLink({linkdata, onClicking}: FirmaLinkProps){

    return (
        <>
            <a href="#" onClick={e =>{
                e.preventDefault;
                onClicking(linkdata);
                }} className="text-blue-500 hover:underline">
                   {`${linkdata.name} (${linkdata.yt})`}
            </a>

        </>
    )
}