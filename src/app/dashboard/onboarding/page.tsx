"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react'
import { opretUser } from "../../lib"
import { useRouter } from "next/navigation";
import { getDanskeByer, getKategorier } from '../../assets/lister/lister';

import dotWave from '../../assets/dotwave.png';

import searchUndraw from '../../assets/Undraws/Search.png';
import freelancerUndraw from '../../assets/Undraws/Freelancer.png';
import teamUndraw from '../../assets/Undraws/Team.png';
import soloUndraw from '../../assets/Undraws/Solo.png';
import sideHustleUndraw from '../../assets/Undraws/Sidehustle.png';
import ejerUndraw from '../../assets/Undraws/Ejer.png';

export default function Onboarding() {
    const router = useRouter()

    const [currentBranche, setCurrentBranche] = useState(0)

    const [questions, setQuestions] = useState([
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

    const [chosenOption, setChosenOption] = useState("")
    const [questionQuery, setQuestionQuery] = useState("")
    const [queryList, setQueryList] = useState([])
    const [dropdownActive, setDropdownActive] = useState(false)

    useEffect(() => {
        if (questions[currentQuestion].type == "dropdown" && questions[currentQuestion].tag == "by") {
            if (questionQuery === "") {
                setQueryList(questions[currentQuestion].list);
            } else {
                var dupli = questions[currentQuestion].list;
                var newDupli = [];
                for (var y in dupli) {
                    if ((dupli[y].toLowerCase()).includes(questionQuery.toLowerCase()) || (dupli[y].toLowerCase()).includes(questionQuery.toLowerCase())) {
                        newDupli.push(dupli[y]);
                    }
                }
                setQueryList(newDupli);
            }
        } else if (questions[currentQuestion].type == "dropdown") {
            if (questionQuery === "") {
                setQueryList(questions[currentQuestion].list);
            } else {
                var dupli = questions[currentQuestion].list;
                var newDupli = [];
                for (var y in dupli) {
                    if ((dupli[y].navn.toLowerCase()).includes(questionQuery.toLowerCase()) || (dupli[y].navn.toLowerCase()).includes(questionQuery.toLowerCase().replaceAll("ø", "o"))) {
                        newDupli.push(dupli[y]);
                    }
                }
                setQueryList(newDupli);
            }
        }
    }, [questionQuery])

    useEffect(() => {
        if (currentQuestion == 5) {
            questions[5].list = getKategorier()[currentBranche].underkategorier || []
        }
        
        if (queryList.length <= 0 && questionQuery == "") {
            setQueryList(questions[currentQuestion].list);
        }
    }, [currentQuestion])

    useEffect(() => {
        for (const spg of questions) {
            document.getElementById("q" + spg.id).style.display = "none"
        }
        document.getElementById("q" + currentQuestion).style.display = "flex"
    }, [currentQuestion])

    useEffect(() => {
        var dropdowns = []
        for (var i in questions) {
            if (questions[i].type == "dropdown") {
                dropdowns.push(questions[i])
            }
        }

        for (var d in dropdowns) {
            if (document.getElementById(dropdowns[d].id + 'dropdown')) {
                document.getElementById(dropdowns[d].id + 'dropdown').addEventListener('focus', function(){
                    setDropdownActive(true)
                });
            }
        }
    }, [])

    useEffect(() => {
        if (questions[currentQuestion].type == "dropdown") {
            questions[currentQuestion].svar = chosenOption
            setQuestionQuery(chosenOption)
            setDropdownActive(false)
        }
    }, [chosenOption])

    function chooseCard(questionId, svarId) {
        if (questions[questionId].svar[svarId].chosen == false) {
            for (const spg of questions[questionId].svar) {
                spg.chosen = false
                document.getElementById("q" + questionId + "-" + "a" + spg.id)?.classList.remove("opretkonto__element__active")
            }

            questions[questionId].svar[svarId].chosen = true
            document.getElementById("q" + questionId + "-" + "a" + svarId)?.classList.add("opretkonto__element__active")
        }
    }

    function nextQuestion() {
        setCurrentQuestion(currentQuestion + 1)
        setQueryList([])
        setQuestionQuery("")
        setChosenOption("")

        if (currentQuestion + 1 == 5) {
            setCurrentBranche(getKategorier().findIndex((item) => item.navn == chosenOption))
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
                            {question.svar.map((answer) => {
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
                } else if (question.type == "dropdown" && question.tag == "by") {
                    return (<div key={"q" + question.id} id={"q" + question.id} className="question__container">
                        <h1 className="home__hero__h1">{question.navn}</h1>
                        <p className="home__hero__p">{question.beskrivelse}</p>
                        <div className="logind__form" style={{marginBottom: "50px"}}>
                            <div className="logind__form__element">
                                <p className="logind__form__element__heading">{question.tag}</p>
                                <div className="logind__form__multiple__container">
                                    <div className={dropdownActive ? "logind__form__element__dropdown logind__form__element__dropdown__active" : "logind__form__element__dropdown"}>
                                        <input className="logind__form__element__dropdown__input" autoComplete={"off"} id={question.id + "dropdown"} placeholder={"Vælg " + question.tag + "..."} value={questionQuery} onChange={(e) => setQuestionQuery(e.target.value)} />
                                        <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                        {dropdownActive && question.id == currentQuestion && <div className="logind__form__element__dropdown__container">
                                            {queryList.map((item) => {
                                                return (<button className="logind__form__element__dropdown__element" key={"by" + item} onClick={() => {setChosenOption(item); setDropdownActive(false)}}>
                                                    <p className="logind__form__element__dropdown__element__p">{item}</p>
                                                </button>);
                                            })}
                                        </div>}
                                    </div>
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
                } else if (question.type == "dropdown"){
                    return (<div key={"q" + question.id} id={"q" + question.id} className="question__container">
                        <h1 className="home__hero__h1">{question.navn}</h1>
                        <p className="home__hero__p">{question.beskrivelse}</p>
                        <div className="logind__form" style={{marginBottom: "50px"}}>
                            <div className="logind__form__element">
                                <p className="logind__form__element__heading">{question.tag}</p>
                                <div className="logind__form__multiple__container">
                                    <div className={dropdownActive ? "logind__form__element__dropdown logind__form__element__dropdown__active" : "logind__form__element__dropdown"}>
                                        <input className="logind__form__element__dropdown__input" autoComplete={"off"} id={question.id + "dropdown"} placeholder={"Vælg " + question.tag + "..."} value={questionQuery} onChange={(e) => setQuestionQuery(e.target.value)} />
                                        <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                        {dropdownActive && question.id == currentQuestion && <div className="logind__form__element__dropdown__container">
                                            {queryList.map((item) => {
                                                return (<button className="logind__form__element__dropdown__element" key={item.navn} onClick={() => {setChosenOption(item.navn); setDropdownActive(false)}}>
                                                    <p className="logind__form__element__dropdown__element__p">{item.navn}</p>
                                                </button>);
                                            })}
                                        </div>}
                                    </div>
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