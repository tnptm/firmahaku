
interface LangText {
    lang: string;
    text: string;
}

interface Trans {
    key: string;
    translations: LangText[];
}

type NPTransType = {
    trData: Trans[];
}

const npTrans: Trans[] = [
    {
        key: "takaisin_haku",
        translations: [
            {lang: "en", text: "Back to search results"},
            {lang: "sv", text: "Tillbaka till sökresultat"},
            {lang: "fi", text: "Takaisin hakutuloksiin"},
        ]
    },
    {
        key: "title_haku",
        translations: [
            {lang: "en", text: "Finnish Company Search"},
            {lang: "sv", text: "Finsk Företagsökning"},
            {lang: "fi", text: "Firmahaku"},
        ]
    },
    {
        key: "subtitle_haku",
        translations: [

            {lang:"en", text: "Your company information starts here"},
            {lang:"sv", text: "Din företagsinformation börjar här"},
            {lang:"fi", text: "Firmahakusi alkaa täältä"},
        ]
    },
    {
        key: "haku",
        translations: [
            {lang:"en", text:"Search"},
            {lang:"sv", text:"Sök"},
            {lang:"fi", text:"Haku"},
            
        ]
    },
    {
        key: "haku_placeholder",
        translations: [
            {lang:"en", text:"Search for companies"},
            {lang:"sv", text:"sök efter företag"},
            {lang:"fi", text:"Hae yrityksiä"},
            
        ]
    },
    {
        key: "lisatietoja",
        translations: [
            {lang:"en", text:"More information"},
            {lang:"sv", text:"Mera"},
            {lang:"fi", text:"Lisätietoja"},
            
        ]
    },
        {
        key: "hakutulokset",
        translations: [
            {lang:"en", text:"Search results"},
            {lang:"sv", text:"Sökresultat"},
            {lang:"fi", text:"Hakutulokset"},
            
        ]
    },
    {
        key: "tuloksia",
        translations: [
            {lang:"en", text:"Results"},
            {lang:"sv", text:"Sökresultat"},
            {lang:"fi", text:"Tuloksia"},
            
        ]
    },
    {
        key: "kpl",
        translations: [
            {lang:"en", text:"pcs"},
            {lang:"sv", text:"st"},
            {lang:"fi", text:"kpl"},
            
        ]
    },
    {
        key: "haku_kesti",
        translations: [
            {lang:"en", text:"search took"},
            {lang:"sv", text:"sökningen tog"},
            {lang:"fi", text:"haku kesti"},
            
        ]
    },
]


export class NPTrans {
    trData: Trans[]
    language:string
    defaultLanguage: string

    constructor() {
        this.trData = npTrans;
        this.language = "fi";
        this.defaultLanguage = "fi";
        //this.initTranslations();
    }
    /*initTranslations() {
        npTrans.forEach(item => {
            this.translations[item.key] = {};
            item.translations.forEach(translation => {
                const lang = Object.keys(translation)[0];
                this.translations[item.key][lang] = translation[lang];
            });
        });
    }*/

    setLanguage(lang: string) {
        this.language = lang;
    }

    getTranslation(key: string): string {


        if (key?.length > 0) {
            const item = this.trData.find(item => item.key === key);
            if (!item) return "No translations"
            const translation = item.translations.find(trans => trans.lang === this.language);
            if (translation) return translation.text;
            const defaultTranslation = item.translations.find(trans => trans.lang === this.defaultLanguage);
            if (defaultTranslation) return defaultTranslation.text;
            return "No translation"
        } else {
            return "No Translation, fix";
        }
    }
    
    /*sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getPromiseDelayedTranslation(key: string){
        let v="nan"
        setTimeout(()=>{
            v = this.getTranslation(key)
            console.log("delayed trans",v)
            //return v
        },500)
        let counter = 0
        while (counter < 10){
            await this.sleep(100);
            if (v != "nan"){
                console.log("v changed to", v)
                return v
                //break
            }
            counter += 1
        }
    }
    getDelayedTranslation(key: string){
        const result = this.getPromiseDelayedTranslation(key)
        return result
    }*/
}
        //let text: String = ""
    /*    function delay(ms: Number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        function generateText(){
            
            if (key?.length > 0) {
                const item = this.trData.find(item => item.key === key);
                if (!item) {
                    text = "No translations";
                } else {
                    const translation = item.translations.find(trans => trans.lang === this.language);
                    if (translation) {
                        text = translation.text;
                    } else {
                        const defaultTranslation = item.translations.find(trans => trans.lang === this.defaultLanguage);
                        if (defaultTranslation) {text = defaultTranslation.text;}
                        else text = "No translations"                                
                    }
                }
                return text
            } else {
                return "No Translation, fix";
            }
            
        }
        async function getData() {
            console.log("Waiting...");
            await delay(500); // wait for 2 seconds
            return generateText()
        }
        
        let textGot: String = getData().then(result => {
            console.log(result); // Output after 2 seconds: Data received!
            return result
        }
    }*/