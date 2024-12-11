"use client"
import Image from "next/image";
import { useEffect, useState } from 'react'
import { getUser, uploadPortfolioImage, handleOnboardingPortfolioUpdate } from "../../../lib"

import dotWave from '../../../assets/dotwave.png';

import searchOnboarding from '../../../assets/Onboarding/Search.png';

type User = {
    userInformation: {
        user__email: string;
        user__name: string;
        user__location: string;
    };
};

export default function Priser() {

    const [user, setUser] = useState<User | any>(null)

    async function getUserSession() {
        const userData: any = {...await getUser()}
        setUser(userData.clientUserData)
    }
    
    useEffect(() => {
        getUserSession()
    }, []);

/*     const [loading, setLoading] = useState(false) */
    const [error] = useState("")

    const [createCase, setCreateCase] = useState(false)
    const [pakker, setPakker] = useState([])

    async function handleDone() {
        await handleOnboardingPortfolioUpdate(cases, user)
    }

    return (
        <main className="welcome__container">
            <div className="welcome__content">
                <div className="question__container" style={{display: "block"}}>
                    <h1 className="question__h1">Tilføj pakkeløsninger til din service</h1>
                    <p className="question__p">Opsæt dine prispakker, som du tilbyder</p>



                    {createCase ? <form className="onboarding__portfolio__container" onSubmit={(e) => {
                        e.preventDefault()
                        const pakkerDupli = [...pakker]
                        const overskriftElement = document.getElementById("createpakke__overskrift")
                        const overskriftValue = (overskriftElement as HTMLInputElement).value
                        const prisElement = document.getElementById("createpakke__pris")
                        const prisValue = (prisElement as HTMLInputElement).value
                        const beskrivelseElement = document.getElementById("createpakke__beskrivelse")
                        const beskrivelseValue = (beskrivelseElement as HTMLInputElement).value

                        const data = {
                            navn: overskriftValue,
                            price: prisValue,
                            beskrivelse: beskrivelseValue,
                            antalTegn: 0,
                            maxTegn: 128,
                            inkluderet: []
                        }

                        pakkerDupli.push(data);
                        (overskriftElement as HTMLInputElement).value = "";
                        (prisElement as HTMLInputElement).value = "";
                        (beskrivelseElement as HTMLInputElement).value = "";
                        setPakker(pakkerDupli)
                        setCreateCase(false)
                    }}>
                        <div className="welcome__back__container" onClick={() => setCreateCase(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                                <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                            </svg>
                            <p className="welcome__back__h1">Gå tilbage</p>
                        </div>
                        <div className="opretkonto__priser__element">
                            <input className="opretkonto__priser__element__h1" id={"createpakke__overskrift"} placeholder={"Giv din pakkeløsning en overskrift"} />
                            <div className="opretkonto__priser__element__price">
                                <p className="opretkonto__priser__element__price__h1">DKK</p>
                                <input type="number" className="opretkonto__priser__element__price__input" placeholder={"00,00"} id={"createpakke__pris"} />
                            </div>
                            <div className="welcome__selection__container">
                                <p className="logind__form__element__heading">Hvad inkluderer denne pakke?</p>
                                <div className="welcome__dropdown__element__container">
                                    <textarea className="welcome__dropdown__element__textarea" autoComplete={"off"} placeholder={"Skriv en beskrivelse til pakken..."} id={"createpakke__beskrivelse"} />
                                </div>
                            </div>
                           {/*  <div className="welcome__selection__container">
                                <p className="logind__form__element__heading">Inkluderet</p>
                                <div className="welcome__dropdown__element__container">
                                    <ul className="welcome__list__ul">
                                        {pakke.inkluderet.map((pakkeInklude, pakkeInkludeIndex) => {
                                            return (<li key={pakkeInklude + "-" + pakkeInkludeIndex} className="welcome__list__li">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="welcome__list__li__svg">
                                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                                </svg>
                                                <p className="welcome__list__li__p">{pakkeInklude}</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                                                    const questionsDupli = [...questions]
                                                    questionsDupli[question.id].sections[sectionIndex].pakker[pakkeIndex].inkluderet.splice(pakkeInkludeIndex, 1)
                                                    setQuestions(questionsDupli)
                                                }} viewBox="0 0 24 24" className="welcome__list__li__svg__remove">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                                </svg>
                                            </li>)
                                        })}
                                        <li className="welcome__list__li welcome__list__li__add">
                                            <form className="welcome__dropdown__element__dropdown__container" onSubmit={(e) => {
                                                    e.preventDefault()
                                                    const questionsDupli = [...questions]
                                                    const dataElement = document.getElementById("inkluderet-" + sectionIndex + "-add")
                                                    const dataValue = (dataElement as HTMLInputElement).value

                                                    questionsDupli[question.id].sections[sectionIndex].pakker[pakkeIndex].inkluderet.push(dataValue);
                                                    (dataElement as HTMLInputElement).value = "";
                                                    setQuestions(questionsDupli)
                                                }}>
                                                <input className="welcome__dropdown__element__dropdown__input" autoComplete={"off"} placeholder={"Tilføj punkt..."} />
                                                <button type="submit" className="welcome__list__li__add__btn">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                                    </svg>
                                                </button>
                                            </form>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                        <div className="question__cta__container">
                            <button className="question__cta__btn__fill" type="submit">
                                Opret Pakkeløsning
                                <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                                    <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                                </svg>
                            </button>
                            <button className="question__cta__btn__transparent" onClick={() => setCreateCase(false)}>
                                Gå tilbage
                            </button>
                        </div>
                    </form> : <div className="onboarding__portfolio__container">
                        <ul className="onboarding__portfolio__wrapper">
                            {pakker.map((myCase, myCaseIndex) => {
                                 return (<li key={"case-" + myCaseIndex} className="onboarding__portfolio__element">
                                    <div className="onboarding__portfolio__element__info">
                                        <p className="onboarding__portfolio__element__info__h1">{myCase.navn}</p>
                                        <p className="onboarding__portfolio__element__info__p">{myCase.price} &#183; {myCase.beskrivelse}</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="onboarding__portfolio__element__icon" viewBox="0 0 24 24" onClick={() => {
                                        /* const questionsDupli = [...questions]
                                        questionsDupli[question.id].sections[sectionIndex].pakker[pakkeIndex].inkluderet.splice(pakkeInkludeIndex, 1)
                                        setQuestions(questionsDupli) */
                                    }}>
                                        <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/>
                                    </svg>
                                </li>)
                            })}
                            <li className="onboarding__portfolio__element onboarding__portfolio__element__add" onClick={() => setCreateCase(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="onboarding__portfolio__element__add__icon" viewBox="0 0 24 24">
                                    <path d="M23,19H21V17a1,1,0,0,0-2,0v2H17a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V21h2a1,1,0,0,0,0-2Z"/><path d="M21,6H18A6,6,0,0,0,6,6H3A3,3,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5h9a1,1,0,0,0,0-2H5a3,3,0,0,1-3-3V9A1,1,0,0,1,3,8H6v2a1,1,0,0,0,2,0V8h8v2a1,1,0,0,0,2,0V8h3a1,1,0,0,1,1,1v5a1,1,0,0,0,2,0V9A3,3,0,0,0,21,6ZM8,6a4,4,0,0,1,8,0Z"/>
                                </svg>
                                <p className="onboarding__portfolio__element__add__h1">Tilføj ny Pakkeløsning</p>
                            </li>
                        </ul>
                    </div>}
                    {error !== "" && <div className="component__error__container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                            <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
                        </svg>
                        <p className="component__howitworks__p">{error}</p>
                    </div>}
                    {!createCase && <div className="question__cta__container">
                        <button className="question__cta__btn__fill" onClick={() => handleDone()}>
                            Færdig
                            <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                                <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                            </svg>
                        </button>
                        <button className="question__cta__btn__transparent">
                            Spring over
                        </button>
                    </div>}
                </div>
                <div className="logind__container__background">
                    <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
                </div>
            </div>
            <div className="welcome__media__container">
                <div className="welcome__media__quote__container">
                    <p className="welcome__media__quote__p">Workflow er en nordisk platform, som forbinder og matcher virksomheder med freelancere.</p>
                    <div className="welcome__media__quote__author__container">
                        <div className="welcome__media__quote__author">
                            <div className="welcome__media__quote__author__line"></div>
                            <p className="welcome__media__quote__author__h1">Mads Kaiser</p>
                        </div>
                        <p className="welcome__media__quote__author__p">Founder & CEO, Workflow</p>
                    </div>
                </div>
                <div className="welcome__media__image__container">
                    <Image src={searchOnboarding} className="welcome__media__image__file" alt="" />
                </div>
                <div className="workflow__lines__container">
                    <div className="workflow__lines__secondary"></div>
                    <div className="workflow__lines__primary"></div>
                    <div className="workflow__lines__tertiary"></div>
                </div>
            </div>
        </main>
    );
}