"use client"
import Image from "next/image";
import { useEffect, useState } from 'react'
import { opretUser } from "../../lib"
import { getDanskeByer, getKategorier } from '../../assets/lister/lister';

import dotWave from '../../assets/dotwave.png';

import searchUndraw from '../../assets/Undraws/Search.png';
import freelancerUndraw from '../../assets/Undraws/Freelancer.png';
import teamUndraw from '../../assets/Undraws/Team.png';
import soloUndraw from '../../assets/Undraws/Solo.png';
import sideHustleUndraw from '../../assets/Undraws/Sidehustle.png';
import ejerUndraw from '../../assets/Undraws/Ejer.png';

export default function Onboarding() {

    const [currentBranche, setCurrentBranche] = useState(0)

    const [questions] = useState([
        {
            id: 0,
            type: "card",
            navn: "Lad os lære dig at kende",
            beskrivelse: "Vi skræddersyr din oplevelse efter dine præferencer",
            knapText: "Næste",
            svar: [
                {
                    id: 0,
                    overskrift: "Jeg er en virksomhed, der leder efter en freelancer",
                    code: "klient",
                    byline: "For klienter",
                    svg: searchUndraw,
                    chosen: false
                },
                {
                    id: 1,
                    overskrift: "Jeg er en freelancer, der leder efter arbejde",
                    code: "freelancer",
                    byline: "For freelancere",
                    svg: freelancerUndraw,
                    chosen: false
                }
            ]
        },
        {
            id: 1,
            type: "card",
            navn: "Hvilken type freelancer er du?",
            beskrivelse: "Lad os hjælpe dig med at komme igang",
            knapText: "Næste",
            svar: [
                {
                    id: 0,
                    overskrift: "En side hustle",
                    byline: "Jeg gør det som",
                    svg: sideHustleUndraw,
                    chosen: false
                },
                {
                    id: 1,
                    overskrift: "Solo freelancer",
                    byline: "Jeg er",
                    svg: soloUndraw,
                    chosen: false
                },
                {
                    id: 2,
                    overskrift: "Medarbejder i en virksomhed",
                    byline: "Jeg er",
                    svg: teamUndraw,
                    chosen: false
                },
                {
                    id: 3,
                    overskrift: "Ejer af bureau",
                    byline: "Jeg er",
                    svg: ejerUndraw,
                    chosen: false
                }
            ]
        },
        {
            id: 2,
            type: "card",
            navn: "Hvor meget erfaring har du som freelancer?",
            beskrivelse: "Vis besøgende, hvor meget erfaring du har indenfor branchen",
            knapText: "Næste",
            svar: [
                {
                    id: 0,
                    overskrift: "Jeg er lige begyndt",
                    byline: "Ingen erfaring",
                    svg: sideHustleUndraw,
                    chosen: false
                },
                {
                    id: 1,
                    overskrift: "Jeg har et par projekter",
                    byline: "Lidt erfaring",
                    svg: ejerUndraw,
                    chosen: false
                },
                {
                    id: 2,
                    overskrift: "Jeg har været i gang i 1-2 år",
                    byline: "Medium erfaring",
                    svg: teamUndraw,
                    chosen: false
                },
                {
                    id: 3,
                    overskrift: "Jeg er ekspert med mere end 2 års erfaring",
                    byline: "Meget erfaring",
                    svg: soloUndraw,
                    chosen: false
                }
            ]
        },
        {
            id: 3,
            type: "dropdown",
            tag: "by",
            navn: "Hvor holder du til?",
            beskrivelse: "Lad besøgende i dit nærområde finde dig nemmere",
            knapText: "Næste",
            svar: "",
            list: getDanskeByer()
        },
        {
            id: 4,
            type: "dropdown",
            tag: "branche",
            navn: "Næsten færdig! Hvilken branche er du i?",
            beskrivelse: "Branchen er med til at lade besøgende finde dine ydelser",
            knapText: "Næste",
            svar: "",
            list: getKategorier()
        },
        {
            id: 5,
            type: "dropdown",
            tag: "underkategori",
            navn: "Hvilke underkategorier vil du blive vist under?",
            beskrivelse: "Lad potentielle kunder finde dig hurtigere",
            knapText: "Færdig",
            svar: "",
            list: getKategorier()[currentBranche].underkategorier
        }
    ])

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (currentQuestion == 5) {
            questions[5].list = getKategorier()[currentBranche].underkategorier || []
        }
    }, [currentQuestion])

    useEffect(() => {
        for (const spg of questions) {
            document.getElementById("q" + spg.id)!.style.display = "none"
        }
        document.getElementById("q" + currentQuestion)!.style.display = "flex"
    }, [currentQuestion])

    function chooseCard(questionId: number, svarId: number) {
        const question = questions[questionId];
        const svar = question.svar[svarId];

        if (typeof svar === 'object' && 'chosen' in svar && !svar.chosen) {
            for (const spg of question.svar) {
                if (typeof spg === 'object' && 'chosen' in spg) {
                    spg.chosen = false;
                    document.getElementById("q" + questionId + "-" + "a" + spg.id)?.classList.remove("opretkonto__element__active");
                }
            }

            svar.chosen = true;
            document.getElementById("q" + questionId + "-" + "a" + svarId)?.classList.add("opretkonto__element__active");
        }
    }

    function nextQuestion() {
        setCurrentQuestion(currentQuestion + 1)

        if (currentQuestion + 1 == 5) {
            setCurrentBranche(getKategorier().findIndex((item) => item.navn == questions[currentQuestion].svar))
        }
    }

    async function handleOnboardingDone() {
        setLoading(true)
        await opretUser(questions)
    }

    return (
        <main className="logind__container">
            {questions.map((question) => {
                if (question.type == "card") {
                    return (<div key={"q" + question.id} id={"q" + question.id} className="question__container">
                        <h1 className="home__hero__h1">{question.navn}</h1>
                        <p className="home__hero__p">{question.beskrivelse}</p>
                        <ul className="opretkonto__container">
                            {Array.isArray(question.svar) && question.svar.map((answer) => {
                                return (<li key={"a" + answer.id} id={"q" + question.id + "-" + "a" + answer.id} className="opretkonto__element" onClick={() => chooseCard(question.id, answer.id)}>
                                    <div className="opretkonto__element__image__container">
                                        <Image src={answer.svg} alt="" height={170} className="opretkonto__element__svg" />
                                    </div>
                                    <p className="opretkonto__element__tagline">{answer.byline}</p>
                                    <p className="opretkonto__element__heading">{answer.overskrift}</p>
                                    <div className="opretkonto__element__radio"></div>
                                </li>);
                            })}
                        </ul>
                        <div className="login__cta__container">
                            <button className="header__cta__btn__fill component__info__btn__fill login__cta__main" onClick={() => nextQuestion()}>
                                {question.knapText}
                                <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                                    <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>);
                } else if (question.type == "dropdown") {
                    return (<div key={"q" + question.id} id={"q" + question.id} className="question__container">
                        <h1 className="home__hero__h1">{question.navn}</h1>
                        <p className="home__hero__p">{question.beskrivelse}</p>
                        <div className="logind__form" style={{marginBottom: "50px"}}>
                            <div className="logind__form__element">
                                <div className="logind__form__element__header">
                                    <p className="logind__form__element__heading">{question.tag}</p>
                                </div>
                                <div className="logind__form__multiple__container">
                                    <select className="logind__form__element__input" id="user.freelanceInformation.freelance__erfaring.erfaring__tid" onChange={(e) => questions[question.id].svar = e.target.value}>
                                        <option value="">Vælg {question.tag}...</option>
                                        {question.list!.map((item) => {
                                            return (<option key={item.navn} value={item.navn}>{item.navn}</option>);
                                        })}
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="login__cta__container">
                            {!loading ? <>
                                <button className="header__cta__btn__fill component__info__btn__fill login__cta__main" onClick={() => question.knapText == "Næste" ? nextQuestion() : handleOnboardingDone()}>
                                    {question.knapText}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                                        <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                                    </svg>
                                </button>
                            </> : <button className="header__cta__btn__fill component__info__btn__fill login__cta__main" style={{padding: "10px"}} onClick={() => question.knapText == "Næste" ? nextQuestion() : handleOnboardingDone()}>
                                <div className="loader"></div>
                            </button>}
                        </div>
                    </div>);
                }
            })}
            <div className="logind__container__background">
                <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
            </div>
        </main>
    );
}