"use client"
import { useState, useEffect } from 'react'
import { getUser, getPakker } from "../../lib"


import Sidebar from '../../components/sidebar';

type User = {
  freelanceInformation: {
      freelance__url: string;
      freelance__profile: {
        profile__branche: string;
        profile__type: string;
        profile__tags: {
          tag__id: string;
          tag_color: string;
          tag__name: string;
          tag__description: string;
        }[];
        profile__underkategori: string;
        profile__about: string;
      };
      freelance__reviews: {
        reviews__rating: number;
        reviews__5star: number;
        reviews__4star: number;
        reviews__3star: number;
        reviews__2star: number;
        reviews__1star: number;
        reviews__data: {
          review__id: number;
          review__overskrift: string;
          review__profileid: number;
          review__rating: number;
          review__text: string;
        }[];
      };
      freelance__overskrift: string;
      freelance__beskrivelse: string;
      freelance__erfaring: {
        erfaring__tid: string;
      };
      freelance__tags: string[]
  };
  userInformation: {
      user__email: string;
      user__name: string;
      user__location: string;
  };
};

export default function Oversigt() {

  const [user, setUser] = useState<User | any>(null)
  const [pageLoading, setPageLoading] = useState(true)

  async function getUserSession() {
    setPageLoading(true)
    const userData: any = {...await getUser()}
    setUser(userData.clientUserData)

    const pakkeArray = [...await getPakker(userData.clientUserData)]
    setPakker(pakkeArray)
    setPageLoading(false)
  }

  useEffect(() => {
      getUserSession()
  }, []);

  const [pakker, setPakker] = useState([])

  return (
    <>
      <div className="dashboard__container">
        <Sidebar />
        {pageLoading ? <div className="loading__container">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div> : <div className="dashboard__content">
            <div className="dashboard__content__header">
                <div className="dashboard__content__header__indhold">
                <p className="dashboard__content__heading">Priser & Pakkeløsninger</p>
                </div>
            </div>
            <ul className="priser__container">
                {pakker.map((pakke, pakkeIndex) => {
                    return (<li key={pakke.package__name + "-" + pakkeIndex} className="opretkonto__priser__element">
                        <div className="welcome__selection__container" style={{paddingTop: "0"}}>
                            <p className="logind__form__element__heading">Giv din pakke en overskrift<span className={pakke.antalTegn == pakke.maxTegn ? "logind__form__element__heading__error" : ""}>{"(" + pakke.antalTegn + "/" + pakke.maxTegn + " tegn)"}</span></p>
                            <div className="welcome__dropdown__element__dropdown__container" style={{marginTop: "10px"}}>
                                <input className="welcome__dropdown__element__dropdown__input" autoComplete={"off"} placeholder={"Skriv en overskrift..."} value={pakke.package__name} onChange={() => {
                                    const pakkerDupli = [...pakker]
                                    pakkerDupli[pakkeIndex].package__description = e.target.value
                                    setPakker(pakkerDupli)
                                }} />
                            </div>
                        </div>
                        <div className="opretkonto__priser__element__price">
                            <p className="opretkonto__priser__element__price__h1">DKK</p>
                            <input type="number" className="opretkonto__priser__element__price__input" value={pakke.package__price} placeholder={"00,00"} onChange={(e) => {
                                const pakkerDupli = [...pakker]
                                pakkerDupli[pakkeIndex].package__price = parseFloat(e.target.value)
                                setPakker(pakkerDupli)
                            }} />
                        </div>
                        <div className="welcome__selection__container">
                            <p className="logind__form__element__heading">Hvad inkluderer denne pakke?<span className={pakke.antalTegn == pakke.maxTegn ? "logind__form__element__heading__error" : ""}>{"(" + pakke.antalTegn + "/" + pakke.maxTegn + " tegn)"}</span></p>
                            <div className="welcome__dropdown__element__container">
                                <textarea className="welcome__dropdown__element__textarea" maxLength={pakke.maxTegn} autoComplete={"off"} value={pakke.package__description} placeholder={"Skriv en beskrivelse til pakken..."} onChange={(e) => {
                                    const pakkerDupli = [...pakker]
                                    pakkerDupli[pakkeIndex].package__description = e.target.value
                                    pakkerDupli[pakkeIndex].antalTegn = e.target.value.length
                                    setPakker(pakkerDupli)
                                }} />
                            </div>
                        </div>
                        <div className="welcome__selection__container">
                            <p className="logind__form__element__heading">Inkluderet</p>
                            <div className="welcome__dropdown__element__container">
                                <ul className="welcome__list__ul">
                                    {pakke.package__includes.map((pakkeInklude, pakkeInkludeIndex) => {
                                        return (<li key={pakkeInklude + "-" + pakkeInkludeIndex} className="welcome__list__li">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="welcome__list__li__svg">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                            </svg>
                                            <p className="welcome__list__li__p">{pakkeInklude}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                                                const pakkerDupli = [...pakker]
                                                pakkerDupli[pakkeIndex].inkluderet.splice(pakkeInkludeIndex, 1)
                                                setPakker(pakkerDupli)
                                            }} viewBox="0 0 24 24" className="welcome__list__li__svg__remove">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                            </svg>
                                        </li>)
                                    })}
                                    <li className="welcome__list__li welcome__list__li__add">
                                        <form className="welcome__dropdown__element__dropdown__container" onSubmit={(e) => {
                                                e.preventDefault()
                                                const pakkerDupli = [...pakker]
                                                const dataElement = document.getElementById("inkluderet-" + pakkeIndex + "-add")
                                                const dataValue = (dataElement as HTMLInputElement).value

                                                pakkerDupli[pakkeIndex].inkluderet.push(dataValue);
                                                (dataElement as HTMLInputElement).value = "";
                                                setPakker(pakkerDupli)
                                            }}>
                                            <input className="welcome__dropdown__element__dropdown__input" autoComplete={"off"} id={"inkluderet-" + pakkeIndex + "-add"} placeholder={"Tilføj punkt..."} />
                                            <button type="submit" className="welcome__list__li__add__btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                                </svg>
                                            </button>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>)
                })}
                <li className="opretkonto__priser__element opretkonto__priser__element__add" onClick={() => {
                    const pakkerDupli = [...pakker]
                    pakkerDupli.push({
                        package__description: "",
                        package__includes: [],
                        package__name: "",
                        package__price: 0
                    })
                    setPakker(pakkerDupli)
                }}>
                    <div className="chat__list__container__empty">
                        <svg xmlns="http://www.w3.org/2000/svg" className="chat__list__container__empty__icon" viewBox="0 0 24 24">
                            <path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm5-11c0,.276-.224.5-.5.5h-4v4c0,.276-.224.5-.5.5s-.5-.224-.5-.5v-4h-4c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h4v-4c0-.276.224-.5.5-.5s.5.224.5.5v4h4c.276,0,.5.224.5.5Z"/>
                        </svg>
                        <p className="chat__list__container__empty__h1">Tilføj Pakkeløsning</p>
                        <p className="chat__list__container__empty__p">Tilbyd endnu en pakke for besøgende</p>
                    </div>
                </li>
            </ul>
        </div>}
      </div>
    </>
  );
}
