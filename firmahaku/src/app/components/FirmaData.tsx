import { FirmaResult } from "./FirmaHaku"
import LoadIndicator from "./utils/LoadIndicator"
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { DescriptionJson, 
        NameEntry, 
        Address, 
        CompanyForm,
        RegisteredEntry, 
        PostOffice, 
        BusinessLine, 
        BusinessId, 
        LocalizedDescription, 
        ValueSource } from "../types/FirmaDataExtended";
import OpenCloseArrow from "./utils/OpenCloseArrow";
import NpTransC from "./NpTransC";

const sampleData = [
  {
    "id": 420371,
    "desc_json": {
      "euId": {
        "value": "FIFPRO.3466646-8",
        "source": "1"
      },
      "names": [
        {
          "name": "Anttoni Patana Oy",
          "type": "1",
          "source": "1",
          "endDate": null,
          "version": 1,
          "registrationDate": "2024-08-08"
        }
      ],
      "status": "2",
      "endDate": null,
      "website": null,
      "addresses": [
        {
          "co": "c/o Anttoni Patana",
          "type": 2,
          "source": "0",
          "street": "Mechelininkatu",
          "country": null,
          "entrance": "B",
          "postCode": "00100",
          "postOffices": [
            {
              "city": "HELSINGFORS",
              "active": true,
              "postCode": "00100",
              "languageCode": "2",
              "municipalityCode": "091"
            },
            {
              "city": "HELSINKI",
              "active": true,
              "postCode": "00100",
              "languageCode": "1",
              "municipalityCode": "091"
            }
          ],
          "postOfficeBox": "",
          "buildingNumber": "18",
          "apartmentNumber": "52",
          "freeAddressLine": null,
          "registrationDate": "2024-08-05",
          "apartmentIdSuffix": ""
        }
      ],
      "businessId": {
        "value": "3466646-8",
        "source": "3",
        "registrationDate": "2024-08-05"
      },
      "companyForms": [
        {
          "type": "16",
          "source": "1",
          "endDate": null,
          "version": 1,
          "descriptions": [
            {
              "description": "Aktiebolag",
              "languageCode": "2"
            },
            {
              "description": "Limited company",
              "languageCode": "3"
            },
            {
              "description": "Osakeyhtiö",
              "languageCode": "1"
            }
          ],
          "registrationDate": "2024-08-08"
        }
      ],
      "lastModified": "2024-11-21 01:49:24",
      "mainBusinessLine": {
        "type": "70220",
        "source": "2",
        "typeCodeSet": "TOIMI3",
        "descriptions": [
          {
            "description": "Business and other management consultancy activities",
            "languageCode": "3"
          },
          {
            "description": "Konsultverksamhet avseende företags organisation",
            "languageCode": "2"
          },
          {
            "description": "Muu liikkeenjohdon konsultointi",
            "languageCode": "1"
          }
        ],
        "registrationDate": "2024-08-05"
      },
      "registrationDate": "2024-08-08",
      "companySituations": [],
      "registeredEntries": [
        {
          "type": "0",
          "endDate": "2024-08-07",
          "register": "1",
          "authority": "2",
          "descriptions": [
            {
              "description": "Oregistrerad",
              "languageCode": "2"
            },
            {
              "description": "Rekisteröimätön",
              "languageCode": "1"
            },
            {
              "description": "Unregistered",
              "languageCode": "3"
            }
          ],
          "registrationDate": "2024-08-05"
        },
        {
          "type": "1",
          "endDate": null,
          "register": "1",
          "authority": "2",
          "descriptions": [
            {
              "description": "Registered",
              "languageCode": "3"
            },
            {
              "description": "Registrerad",
              "languageCode": "2"
            },
            {
              "description": "Rekisterissä",
              "languageCode": "1"
            }
          ],
          "registrationDate": "2024-08-08"
        },
        {
          "type": "1",
          "endDate": null,
          "register": "4",
          "authority": "1",
          "descriptions": [
            {
              "description": "Registered",
              "languageCode": "3"
            },
            {
              "description": "Registrerad",
              "languageCode": "2"
            },
            {
              "description": "Rekisterissä",
              "languageCode": "1"
            }
          ],
          "registrationDate": "2024-08-08"
        },
        {
          "type": "55",
          "endDate": null,
          "register": "5",
          "authority": "1",
          "descriptions": [
            {
              "description": "Registered",
              "languageCode": "3"
            },
            {
              "description": "Registrerad",
              "languageCode": "2"
            },
            {
              "description": "Rekisterissä",
              "languageCode": "1"
            }
          ],
          "registrationDate": "2024-09-23"
        },
        {
          "type": "80",
          "endDate": null,
          "register": "6",
          "authority": "1",
          "descriptions": [
            {
              "description": "Liiketoiminnasta arvonlisäverovelvollinen",
              "languageCode": "1"
            },
            {
              "description": "Momsskyldig för rörelseverksamhet",
              "languageCode": "2"
            },
            {
              "description": "VAT-liable for business activity",
              "languageCode": "3"
            }
          ],
          "registrationDate": "2024-08-12"
        }
      ],
      "tradeRegisterStatus": "1"
    }
  }
]

// make interface of sampleData

type FirmaDataShortened = {
    id: number;
    yt: string;
    name: string;
    type: string;
    registrationDate: string;
    address: string;
    phone: string;
    email: string;
    website: string;
}

interface LanguageType {
  langCode: string;
  langNum: number;
}

const languagesAvailable: LanguageType[] = [
    { langCode: 'en', langNum: 3 },
    { langCode: 'fi', langNum: 1 },
    { langCode: 'sv', langNum: 2 },
    ];




export default function FirmaData({ firma, clean }: { firma: FirmaResult | null, clean: boolean }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [firmaDetailsAny, setFirmaDetailsAny] = useState<any | null>(null);
    const [showData, setShowData] = useState<boolean>(false);
    const { language } = useLanguage();
    
    useEffect(()=>{
        clean && (
            setFirmaDetailsAny(null),
            setShowData(false)
        )
    }, [clean])

    function handleMore() {
        const status: boolean = isLoading;
        setIsLoading(!status);
        setShowData(!showData);
        /*if (!showData) {
            setFirmaDetailsAny(null);
        } else {*/
        //setIsLoading
            fetch(`api/company?id=${firma?.id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setFirmaDetailsAny(data[0]);
                    //parseFirmaDetails(data);
                    setIsLoading(false);
                    console.log("Hakutulokset:", data[0]);
                })
                .catch((error) => {
                    setIsLoading(false)
                    console.error("Fetch error:", error);
                });
        //}
    }



    return (
        <>
            <div className="bg-sky-100 p-4 rounded-lg shadow-md w-full text-gray-600">
                <h2 className="text-2xl font-semibold">{`${firma?.name}`}</h2>
                <p>Y-tunnus: {firma?.yt}</p>
                <p>Rekisteröity: {firma?.registrationDate}</p>
                
                
                
                    <div>
                        <div>
                          <span className="text-xl font-semibold"><NpTransC trkey={"lisatietoja"}/></span>
                          <button className="hover:bg-blue-200 font-semibold text-sm mx-1 p-1 relative top-1 rounded cursor-pointer"
                              onClick={handleMore}
                          >
                              <OpenCloseArrow isOpen={!showData}/>
                          </button>
                          <LoadIndicator isLoading={isLoading}/>
                        </div>
                        {/*<p>Yritysmuoto: {firmaDetailsAny?.desc_json?.companyForms[0]?.descriptions[0]?.description}</p>
                        <p>Y-tunnus: {firmaDetailsAny?.desc_json?.businessId?.value}</p>
                        <p>Liiketoimintamuoto: {firmaDetailsAny?.desc_json?.mainBusinessLine?.descriptions[0]?.description}</p>
                        <p>Osoite: {firmaDetailsAny?.desc_json?.addresses[0]?.street} {firmaDetailsAny?.desc_json?.addresses[0]?.buildingNumber} {firmaDetailsAny?.desc_json?.addresses[0]?.postCode}</p>
                        >*/}
                        {
                          firmaDetailsAny && showData && (
                          <>
                            <div>
                                <span className="font-semibold">Nimet: </span>
                                <ul>
                                {
                                    firmaDetailsAny.desc_json.names.map((n,index) => (
                                      <li key={index} className="ml-8"> 
                                            {`${n.name} (${n?.registrationDate})`}
                                      
                                      </li> 
                                    ))
                                }
                                </ul>
                            </div>
                            <p>
                                <span className="font-semibold">Katuosoite: </span>
                                {
                                    firmaDetailsAny.desc_json.addresses.map( item => 
                                        `${item?.street} ${item?.buildingNumber} ${item?.apartmentIdSuffix && item?.apartmentIdSuffix + ' ' + item?.apartmentNumber }, ${item?.postCode} ${item.postOffices.find(i => i.languageCode == 1).city}`
                                    ).join(', ')
                                }
                            </p>
                            <p>
                                <span className="font-semibold">Toimiala: </span>
                                {
                                    ` ${firmaDetailsAny.desc_json.mainBusinessLine.descriptions.find(d => d.languageCode == 1).description} (${firmaDetailsAny.desc_json.mainBusinessLine.type}) `

                                    
                                }
                            </p>
                            <p><span className="font-semibold">Yritysmuoto: </span>{
                                    
                                    ` ${firmaDetailsAny?.desc_json?.companyForms[0].descriptions.find(c => c.languageCode == 1).description}`
                                }
                            </p>
                            <div>
                                <span className="font-semibold">Historia: </span>
                                    <ul>
                                    {
                                    firmaDetailsAny?.desc_json?.registeredEntries.map((e,index) => (
                                        <li key={index} className="ml-8">{
                                            `${e.type}: ${e.descriptions.find(l => l.languageCode == 1).description} (${e.registrationDate})`
                                        }
                                        </li>
                                    ))
                                }</ul>
                            </div>
                          </>
                          )
                        }
                        {/*<p>Puhelin: {firmaDetailsAny?.desc_json?.addresses}</p>
                        <p>Sähköposti: {firmaDetailsAny?.desc_json?.email}</p>*/}
                    </div>
                    
               
                {/*<div className=" bg-gray-100 p-4 rounded-lg">
                    {firmaDetailsAny && showData && (<code>
                        <pre className="text-xs">{JSON.stringify(firmaDetailsAny, null, 2)}</pre>
                    </code>)}
                </div>*/}
            </div>
            <div className="h-52"></div>
        </>
    )
}