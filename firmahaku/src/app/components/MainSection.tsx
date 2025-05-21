'use client'

import { useLanguage } from "../context/LanguageContext";
import { NPTrans } from "../lib/translations"
import { useState, useEffect } from 'react'


const trans = new NPTrans()

export default function MainSection(){
    const { language } = useLanguage();
    //const [cleaning, setCleaning] = useState(false)
    const [updtT, setUpdtT] = useState(0)
    const [currentCode, setCurrentCode] = useState('fi')

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

    return (
        <main>
            <h1 className="text-4xl font-bold">{`${trans.getTranslation("title_haku")}`}</h1>
            <p className="mt-4 text-lg">
                {`${trans.getTranslation("subtitle_haku")}`}
            </p>
            
        </main>

    )
}