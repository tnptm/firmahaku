import { FirmaResult } from "./FirmaHaku"
import FirmaLink from "./FirmaLink";
import { useState, useEffect } from "react"
//import React from "react";

export default function FirmaPaginator({results, onClicking}:{results: FirmaResult[], onClicking: (firma: FirmaResult) => void}){
    const [page, setPage] = useState(0)
    const [itemsOnPage, setItemsOnPage] = useState(10)
    const [pageList, setPageList] = useState<Number[]>([])

    useEffect(
        ()=>{
            const maxPage = (results.length / itemsOnPage)
        }
    )

    function handleLinkClick(data: FirmaResult){
        onClicking(data)
    }
    return (
    <>
        {
            results.length > 0 ? (
                <>
                    <ul className="list-disc pl-5">
                        {
                            results.map((result: FirmaResult, index) => (
                                ((page) * itemsOnPage) <= index && ((page + 1) * itemsOnPage) > index && (
                                    <li key={index} className="mb-2">
                                        <FirmaLink linkdata={result} onClicking={handleLinkClick} />
                                    </li>
                                )
                            ))
                        }
                    </ul>
                    <div>
                        <input type="text" value={page} onChange={e => setPage(Number(e.target.value))}/>
                        <div>

                        </div>
                    </div>
                </>
                ) : (
                    <p className="text-gray-500">Ei hakutuloksia</p>
                )
        }
    </>   )         
}