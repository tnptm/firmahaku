import { FirmaResult } from "./FirmaHaku"
import FirmaLink from "./FirmaLink";
import { useState, useEffect } from "react"
//import React from "react";

export default function FirmaPaginator({results, onClicking}:{results: FirmaResult[], onClicking: (firma: FirmaResult) => void}){
    const [page, setPage] = useState(0)
    const [itemsOnPage, setItemsOnPage] = useState(10)
    const [pageList, setPageList] = useState<Number[]>([])

    const [maxPage, setMaxPage] = useState<Number>(0)

    useEffect(
        ()=>{
            if (itemsOnPage>0){
                const maxPage = Math.floor(results.length / itemsOnPage)+1
                setMaxPage(maxPage)
            } 
            
        },[results]
    )

    useEffect(
        // create data for pages list
        ()=>{
            let listPageNumbers = []
            for (let i=0; i < parseInt(maxPage.toString()); i++){
                listPageNumbers.push(i)
            }
            setPageList(listPageNumbers)
        }, [maxPage]
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
                    <div className="mt-8 ">                  
                        {/*<input className="border p-2 rounded" type="text" value={page} onChange={e => setPage(Number(e.target.value))}/>*/}
                        <div className="rounded bg-slate-300 p-2 mb-4 mx-4 my-4 w-fit">{(page + 1).toString()}/{maxPage.toString()}</div>
                        <div>
                            {
                                pageList.length > 0 && pageList.map((item, index) => (
                                        <button 
                                        className="px-1 mx-0.5 rounded-sm bg-amber-200 cursor-pointer hover:bg-amber-400 border border-gray-500" 
                                        onClick={e => setPage(Number(item))}
                                        key={index}>
                                            {(Number(item) + 1).toString()}
                                        </button>
                                    )
                                )
                            }
                        </div>
                    </div>
                </>
                ) : (
                    <p className="text-gray-500">Ei hakutuloksia</p>
                )
        }
    </>   )         
}