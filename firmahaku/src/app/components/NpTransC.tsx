'use client'

import { useLanguage } from "../context/LanguageContext";
import { NPTrans } from "../lib/translations"
import { useState, useEffect } from 'react'


const trans = new NPTrans()

export default function NpTransC({trkey}:{trkey: string}){
    const { language } = useLanguage();
    //const [cleaning, setCleaning] = useState(false)
    const [updtT, setUpdtT] = useState(0)
    const [currentCode, setCurrentCode] = useState('fi')
    const [trCode, setTrCode] =  useState<string>('')

    useEffect(()=>{
        // This code is needed for getting small update once after short delay of 
        // changing the language that translation functions will be triggered too in UI
        // UseEffect is triggered whne language is changed or updt counter is increased by one..
        if (currentCode != language){
            setTimeout(()=>setUpdtT(updtT + 1), 200)

            //setUpdtT(updtT + 1) // makes this use effect be triggered again
            trans.setLanguage(language)
            setCurrentCode(language)
        }

        trans.setLanguage(language)
        
        //console.log("Language changed to:" + language)
    },[language, updtT])

    useEffect(()=>setTrCode(trkey), [trkey])

    return (
        <>
            {
                `${trans.getTranslation(trkey)}`
            }
        </>
    )
}