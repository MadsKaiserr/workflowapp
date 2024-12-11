"use client"
import Image from "next/image";
import { useEffect, useState } from 'react'
import { getSession, opretUser, uploadProfilePicture } from "../../lib"
import { getDanskeByer, getKategorier } from '../../assets/lister/lister';

import dotWave from '../../assets/dotwave.png';

import searchUndraw from '../../assets/Undraws/Search.png';
import freelancerUndraw from '../../assets/Undraws/Freelancer.png';
import teamUndraw from '../../assets/Undraws/Team.png';
import soloUndraw from '../../assets/Undraws/Solo.png';
import sideHustleUndraw from '../../assets/Undraws/Sidehustle.png';
import ejerUndraw from '../../assets/Undraws/Ejer.png';

import searchOnboarding from '../../assets/Workflow/kategori.jpg';
import freelancerOnboarding from '../../assets/Workflow/Freelancer.jpg';

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

export default function Onboarding() {

    const [user, setUser] = useState<User | any>(null)

    async function getUserSession() {
        const userData: any = {...await getSession()}
        setUser(userData.userAuth.providerData)
    }

    useEffect(() => {
        getUserSession()
    }, []);

    const [currentBranche, setCurrentBranche] = useState(0)

    const [questions, setQuestions] = useState([
        {
            navn: "Godt at møde dig",
            beskrivelse: "Lad os lære dig lidt bedre at kende, så vi kan skræddersy din oplevelse",
            knapText: "Næste spørgsmål",
            skipable: false,
            quote: {
                quotation: "Workflow er en nordisk platform, som forbinder og matcher virksomheder med freelancere.",
                author: {
                    name: "Mads Kaiser",
                    stilling: "Founder & CEO, Workflow"
                },
                image: searchOnboarding
            },
            sections: [
                {
                    type: "card-column",
                    navn: "Kontotype",
                    overskrift: "Hvad beskriver dig bedst?",
                    svar: [
                        {
                            overskrift: "Jeg er på udkig efter en freelancer",
                            code: "klient",
                            byline: "For klienter",
                            svg: searchUndraw,
                            chosen: false
                        },
                        {
                            overskrift: "Jeg er en freelancer, der leder efter arbejde",
                            code: "freelancer",
                            byline: "For freelancere",
                            svg: freelancerUndraw,
                            chosen: false
                        }
                    ]
                }
            ]
        },
        {
            navn: "Hvilken type freelancer er du?",
            beskrivelse: "Dette hjælper os med at skræddersy din oplevelse hos Workflow",
            knapText: "Næste spørgsmål",
            skipable: true,
            quote: {
                quotation: "Tilmeld dig mere end 6000+ freelancere Danmark over.",
                author: {
                    name: "Mads Kaiser",
                    stilling: "Founder & CEO, Workflow"
                },
                image: freelancerOnboarding
            },
            sections: [
                {
                    type: "card-column",
                    navn: "Type freelancer",
                    overskrift: "Hvilken type freelancer er du?",
                    svar: [
                        {
                            overskrift: "Side hustle",
                            byline: "Det er min",
                            svg: sideHustleUndraw,
                            chosen: false
                        },
                        {
                            overskrift: "Solo freelancer",
                            byline: "Jeg er",
                            svg: soloUndraw,
                            chosen: false
                        },
                        {
                            overskrift: "Medarbejder i en virksomhed",
                            byline: "Jeg er",
                            svg: teamUndraw,
                            chosen: false
                        },
                        {
                            overskrift: "Ejer af bureau",
                            byline: "Jeg er",
                            svg: ejerUndraw,
                            chosen: false
                        }
                    ]
                }
            ]
        },
        {
            navn: "Lad os lære dig bedre at kende",
            beskrivelse: "Du er 35% mere tilbøjelig til at sælge, hvis du virker troværdig",
            knapText: "Næste spørgsmål",
            skipable: true,
            quote: {
                quotation: "Workflow er en nordisk platform, som forbinder og matcher virksomheder med freelancere.",
                author: {
                    name: "Mads Kaiser",
                    stilling: "Founder & CEO, Workflow"
                },
                image: searchOnboarding
            },
            sections: [
                {
                    type: "selection",
                    navn: "Servicebeskrivelse",
                    overskrift: "Hvad beskriver bedst dine kompetencer?",
                    secondaryoverskrift: "Vælg op til 5",
                    svar: [
                        {
                            overskrift: "Programmering",
                            chosen: false
                        },
                        {
                            overskrift: "Grafik & Design",
                            chosen: false
                        },
                        {
                            overskrift: "Hurtig Levering",
                            chosen: false
                        },
                        {
                            overskrift: "Vedligeholdelse",
                            chosen: false
                        },
                        {
                            overskrift: "Højt prisleje",
                            chosen: false
                        },
                        {
                            overskrift: "Lavt prisleje",
                            chosen: false
                        }
                    ]
                },
                {
                    type: "dropdown",
                    navn: "hovedkategori",
                    overskrift: "Hvilken kategori ligger dine ydelser i?",
                    secondaryoverskrift: "",
                    selected: "",
                    list: getKategorier(),
                    searchedList: [...getKategorier()]
                },
                {
                    type: "dropdown",
                    navn: "underkategori",
                    overskrift: "Hvad arbejder du specifikt med?",
                    secondaryoverskrift: "",
                    selected: "",
                    list: [],
                    searchedList: []
                }
            ]
        },
        {
            navn: "Fortæl besøgende hvem du er",
            beskrivelse: "Lad besøgende lære dig at kende, inden i indgår et samarbejde",
            knapText: "Næste spørgsmål",
            skipable: true,
            quote: {
                quotation: "Workflow er en nordisk platform, som forbinder og matcher virksomheder med freelancere.",
                author: {
                    name: "Mads Kaiser",
                    stilling: "Founder & CEO, Workflow"
                },
                image: searchOnboarding
            },
            sections: [
                {
                    type: "profilepicture",
                    navn: "profilbillede",
                    overskrift: "Upload dit profilbillede",
                    url: "",
                    filnavn: ""
                },
                {
                    type: "dropdown",
                    navn: "by",
                    overskrift: "Hvilken by bor du i?",
                    secondaryoverskrift: "Offentligt",
                    selected: "",
                    list: getDanskeByer(),
                    searchedList: [...getDanskeByer()]
                }
            ]
        },
        {
            type: "card-ned",
            navn: "Hvor meget erfaring har du som freelancer?",
            beskrivelse: "Vis besøgende, hvor meget erfaring du har indenfor branchen",
            knapText: "Færdig",
            skipable: true,
            quote: {
                quotation: "Workflow er en nordisk platform, som forbinder og matcher virksomheder med freelancere.",
                author: {
                    name: "Mads Kaiser",
                    stilling: "Founder & CEO, Workflow"
                },
                image: searchOnboarding
            },
            sections: [
                {
                    type: "card-column",
                    navn: "Erfaring",
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
                }
            ]
        }
    ])

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const questionsDupli = [...questions]
        questionsDupli[2].sections[2].list = getKategorier()[currentBranche].underkategorier || []
        questionsDupli[2].sections[2].searchedList = [...getKategorier()[currentBranche].underkategorier] || []
        setQuestions(questionsDupli)
    }, [currentBranche])

    useEffect(() => {
        for (const i in questions) {
            document.getElementById("q" + i)!.style.display = "none"
        }
        document.getElementById("q" + currentQuestion)!.style.display = "flex"
    }, [currentQuestion])

    function chooseCard(sectionType: string, questionId: number, sectionId: number, svarId: number) {
        const question = questions[questionId];
        const svar = question.sections[sectionId].svar[svarId];

        if (!svar.chosen) {
            if (sectionType != "selection") {
                question.sections[0].svar.forEach((allSvar: any, allSvarIndex: number) => {
                    allSvar.chosen = false
                    document.getElementById("q" + questionId + "-" + "s" + sectionId + "-" + "a" + allSvarIndex)?.classList.remove("opretkonto__element__active")
                })
                svar.chosen = true
                document.getElementById("q" + questionId + "-" + "s" + sectionId + "-" + "a" + svarId)?.classList.add("opretkonto__element__active");
            } else {
                let chosencount = 0
                question.sections[0].svar.forEach((allSvar: any) => {
                    if (allSvar.chosen) {
                        chosencount = chosencount + 1
                    }
                })

                if (chosencount < 5) {
                    svar.chosen = true
                    document.getElementById("q" + questionId + "-" + "s" + sectionId + "-" + "a" + svarId)?.classList.add("welcome__selection__tag__element__active");
                }
            }
        } else if (svar.chosen && sectionType == "selection") {
            svar.chosen = false
            if (sectionType == "selection") {
                document.getElementById("q" + questionId + "-" + "s" + sectionId + "-" + "a" + svarId)?.classList.remove("welcome__selection__tag__element__active");
            } else {
                document.getElementById("q" + questionId + "-" + "s" + sectionId + "-" + "a" + svarId)?.classList.remove("opretkonto__element__active");
            }
        }
    }

    function nextQuestion() {
        setError("")
        if (currentQuestion == 0 && questions[0].sections[0].svar[0].chosen) {
            handleOnboardingDone()
        } else {
            const inputValidationError = {
                status: false,
                message: ""
            }

            questions[currentQuestion].sections.forEach((section) => {
                if (section.type == "card-row" || section.type == "card-column" || section.type == "selection") {
                    if (section.svar.findIndex((sectionChosen) => sectionChosen.chosen == true) < 0) {
                        inputValidationError.status = true
                        inputValidationError.message = "Venligst vælg en af ovenstående svarmuligheder for at fortsætte"
                    }
                } else if (section.type == "input" || section.type == "textarea") {
                    if (section.text == "") {
                        inputValidationError.status = true
                        inputValidationError.message = "Venligst udfyld alle felter for at fortsætte"
                    }
                } else if (section.type == "dropdown") {
                    if (section.selected == "") {
                        inputValidationError.status = true
                        inputValidationError.message = "Venligst vælg mindst én af svarmuligheder for at fortsætte"
                    }
                } else if (section.type == "price") {
                    if (section.pakker[0].price <= 0) {
                        inputValidationError.status = true
                        inputValidationError.message = "Venligst angiv en pris, som er større end 0 kr."
                    }
                }
            })

            if (!inputValidationError.status) {
                if (questions[currentQuestion + 1]) {
                    setCurrentQuestion(currentQuestion + 1)
                } else {
                    handleOnboardingDone()
                }
            } else {
                setError(inputValidationError.message)
            }
        }
    }

    function skipQuestion() {
        if (questions[currentQuestion + 1]) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            handleOnboardingDone()
        }
    }

    async function handleOnboardingDone() {
        setLoading(true)
        if (typeof questions[0].sections[0].svar[0] === 'object' && 'chosen' in questions[0].sections[0].svar[0] && questions[0].sections[0].svar[0].chosen) {
            await opretUser(questions, "klient", "")
        } else {
            await opretUser(questions, "freelancer", currentImageHandler)
        }
    }

    const [currentImageHandler, setCurrentImageHandler] = useState("")
    const [uploading, setUploading] = useState(false)
    const handleFileChange = async (event) => {
        setUploading(true)
        let userId = ""
        if (user.userInformation) {
            userId = user.userInformation.user__id
        } else {
            userId = user.uid
        }
        const uploadedImageUrl = await uploadProfilePicture(event.target.files[0], userId)
        if (uploadedImageUrl) {
            setCurrentImageHandler(uploadedImageUrl)
        }
        setUploading(false)
    }

    return (
        <main className="welcome__container">
            <div className="welcome__content">
                {questions.map((question, questionId) => {
                    return (<div key={"q" + questionId} id={"q" + questionId} className="question__container">
                        <h1 className="question__h1">{question.navn}{user && (questionId == 0 || questionId == 2) && ", " + user.displayName}</h1>
                        {questionId === 1 ? <p className="question__p">Andre bruger i gennemsnit <span className="question__p__bold">kun 7 minutter</span> på at oprette en profil</p> : <p className="question__p">{question.beskrivelse}</p>}
                        {questionId >= 1 && <div className="welcome__status__container welcome__small__section">
                            <div className={questionId >= 1 ? "welcome__status__element welcome__status__element__active" : "welcome__status__element"}></div>
                            <div className={questionId >= 2 ? "welcome__status__element welcome__status__element__active" : "welcome__status__element"}></div>
                            <div className={questionId >= 3 ? "welcome__status__element welcome__status__element__active" : "welcome__status__element"}></div>
                            <div className={questionId >= 4 ? "welcome__status__element welcome__status__element__active" : "welcome__status__element"}></div>
                            <div className={questionId >= 5 ? "welcome__status__element welcome__status__element__active" : "welcome__status__element"}></div>
                        </div>}
                        <ul className="welcome__form__container">
                            {question.sections?.map((section, sectionIndex) => {
                                if (section.type == "card-column") {
                                    return (<ul key={questionId + "-" + section.type + "-" + sectionIndex} className="opretkonto__container welcome__ned__container">
                                        {Array.isArray(section.svar) && section.svar.map((answer, answerIndex) => {
                                            return (<li key={"a" + answerIndex} id={"q" + questionId + "-" + "s" + sectionIndex + "-" + "a" + answerIndex} className="opretkonto__element" onClick={() => chooseCard(section.type, questionId, sectionIndex, answerIndex)}>
                                                <div className="opretkonto__element__image__container">
                                                    <Image src={answer.svg} alt="" width={100} className="opretkonto__element__svg" />
                                                </div>
                                                <div>
                                                    <p className="opretkonto__element__tagline">{answer.byline}</p>
                                                    <p className="opretkonto__element__heading">{answer.overskrift}</p>
                                                </div>
                                                <div className="opretkonto__element__radio"></div>
                                            </li>);
                                        })}
                                    </ul>)
                                } else if (section.type == "selection") {
                                    return (<div className="welcome__selection__container" key={questionId + "-" + section.type + "-" + sectionIndex}>
                                        <p className="logind__form__element__heading">{section.overskrift}<span>{section.secondaryoverskrift && "(" + section.secondaryoverskrift + ")"}</span></p>
                                        <ul className="welcome__selection__tag__container">
                                            {section.svar.map((tag, tagIndex) => {
                                                return <div key={questionId + "-" + sectionIndex + "-tag" + tagIndex} id={"q" + questionId + "-" + "s" + sectionIndex + "-" + "a" + tagIndex} className="welcome__selection__tag__element" onClick={() => chooseCard(section.type, questionId, sectionIndex, tagIndex)}>{tag.overskrift}</div>
                                            })}
                                        </ul>
                                    </div>)
                                } else if (section.type == "dropdown") {
                                    return (<div className="welcome__selection__container" key={questionId + "-" + section.type + "-" + sectionIndex}>
                                        <p className="logind__form__element__heading">{section.overskrift}<span>{section.secondaryoverskrift && "(" + section.secondaryoverskrift + ")"}</span></p>
                                        <div className="welcome__dropdown__element__container">
                                            <div className="welcome__dropdown__element__dropdown__container">
                                                <input className="welcome__dropdown__element__dropdown__input" onFocus={() => {
                                                    document.getElementById("wrapper" + questionId + "dropdown-" + sectionIndex)?.classList.add("welcome__dropdown__element__dropdown__wrapper__active")
                                                }} autoComplete={"off"} id={questionId + "dropdown-" + sectionIndex} placeholder={"Vælg " + section.navn} onChange={(e) => {
                                                    const searchedDupli = []
                                                    
                                                    questions[questionId].sections[sectionIndex].list.forEach((listItem) => {
                                                        if (listItem.navn.toLowerCase().includes(e.target.value.toLowerCase()) || listItem.navn.toLowerCase().replaceAll("o", "ø").includes(e.target.value.toLowerCase())) {
                                                            searchedDupli.push(listItem)
                                                        }
                                                    })
                                                    const questionsDupli = [...questions]
                                                    questionsDupli[questionId].sections[sectionIndex].searchedList = searchedDupli
                                                    setQuestions(questionsDupli)
                                                }} />
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                                <div className="welcome__dropdown__element__dropdown__wrapper" id={"wrapper" + questionId + "dropdown-" + sectionIndex}>
                                                    {section.searchedList.map((item) => {
                                                        return (<button className="welcome__dropdown__element__dropdown__wrapper__element" key={section.navn + item.navn} onClick={() => {
                                                            const questionsDupli = [...questions]
                                                            questionsDupli[questionId].sections[sectionIndex].selected = item.navn

                                                            if (section.navn == "hovedkategori") {
                                                                setCurrentBranche(getKategorier().findIndex((itemFind) => itemFind.navn == item.navn))
                                                            }

                                                            document.getElementById(questionId + "dropdown-" + sectionIndex).value = item.navn
                                                            document.getElementById("wrapper" + questionId + "dropdown-" + sectionIndex)?.classList.remove("welcome__dropdown__element__dropdown__wrapper__active")
                                                            setQuestions(questionsDupli)
                                                        }}>
                                                            <p className="welcome__dropdown__element__dropdown__wrapper__element__p">{item.navn}</p>
                                                        </button>);
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                } else if (section.type == "input") {
                                    return (<div className="welcome__selection__container" key={questionId + "-" + section.type + "-" + sectionIndex}>
                                        <p className="logind__form__element__heading">{section.overskrift}<span className={section.antalTegn == section.maxTegn ? "logind__form__element__heading__error" : ""}>{"(" + section.antalTegn + "/" + section.maxTegn + " tegn)"}</span></p>
                                        <div className="welcome__dropdown__element__container">
                                            <div className="welcome__dropdown__element__dropdown__container">
                                                <input className="welcome__dropdown__element__dropdown__input" autoComplete={"off"} id={questionId + "dropdown-" + sectionIndex} placeholder={section.placeholder} onChange={(e) => {
                                                    const questionsDupli = [...questions]
                                                    questionsDupli[questionId].sections[sectionIndex].text = e.target.value
                                                    setQuestions(questionsDupli)
                                                }} />
                                            </div>
                                        </div>
                                    </div>)
                                } else if (section.type == "profilepicture") {
                                    return (<div className="welcome__selection__container" key={questionId + "-" + section.type + "-" + sectionIndex}>
                                        <p className="logind__form__element__heading">{section.overskrift}</p>
                                        <div className="welcome__picture__container">
                                            {currentImageHandler != "" ? <div className="welcome__picture__image">
                                                <img src={currentImageHandler} className="welcome__picture__image__file" />
                                                <>
                                                    {uploading ? <div className="loading__profile">
                                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                                    </div> : <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="welcome__picture__image__icon" viewBox="0 0 24 24">
                                                            <path d="M19,4h-.508L16.308,1.168A3.023,3.023,0,0,0,13.932,0H10.068A3.023,3.023,0,0,0,7.692,1.168L5.508,4H5A5.006,5.006,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9A5.006,5.006,0,0,0,19,4ZM9.276,2.39A1.006,1.006,0,0,1,10.068,2h3.864a1.008,1.008,0,0,1,.792.39L15.966,4H8.034ZM22,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9A3,3,0,0,1,5,6H19a3,3,0,0,1,3,3Z"/><path d="M12,8a6,6,0,1,0,6,6A6.006,6.006,0,0,0,12,8Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,12,18Z"/>
                                                        </svg>
                                                        <label htmlFor="file-upload" className="welcome__picture__image__input"></label>
                                                        <input id="file-upload" type="file" onChange={handleFileChange} />
                                                    </>}
                                                </>
                                            </div> : <div className="welcome__picture__image">
                                                <>
                                                    {uploading ? <div className="loading__profile">
                                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                                    </div> : <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="welcome__picture__image__icon" viewBox="0 0 24 24">
                                                            <path d="M19,4h-.508L16.308,1.168A3.023,3.023,0,0,0,13.932,0H10.068A3.023,3.023,0,0,0,7.692,1.168L5.508,4H5A5.006,5.006,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9A5.006,5.006,0,0,0,19,4ZM9.276,2.39A1.006,1.006,0,0,1,10.068,2h3.864a1.008,1.008,0,0,1,.792.39L15.966,4H8.034ZM22,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9A3,3,0,0,1,5,6H19a3,3,0,0,1,3,3Z"/><path d="M12,8a6,6,0,1,0,6,6A6.006,6.006,0,0,0,12,8Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,12,18Z"/>
                                                        </svg>
                                                        <label htmlFor="file-upload" className="welcome__picture__image__input"></label>
                                                        <input id="file-upload" type="file" onChange={handleFileChange} />
                                                    </>}
                                                </>
                                            </div>}
                                        </div>
                                    </div>)
                                } else if (section.type == "textarea") {
                                    return (<div className="welcome__selection__container" key={questionId + "-" + section.type + "-" + sectionIndex}>
                                        <p className="logind__form__element__heading">{section.overskrift}<span className={section.antalTegn == section.maxTegn ? "logind__form__element__heading__error" : ""}>{"(" + section.antalTegn + "/" + section.maxTegn + " tegn)"}</span></p>
                                        <div className="welcome__dropdown__element__container">
                                            <textarea className="welcome__dropdown__element__textarea" maxLength={section.maxTegn} autoComplete={"off"} id={questionId + "dropdown-" + sectionIndex} placeholder={section.placeholder} onChange={(e) => {
                                                const questionsDupli = [...questions]
                                                questionsDupli[questionId].sections[sectionIndex].text = e.target.value
                                                questionsDupli[questionId].sections[sectionIndex].antalTegn = e.target.value.length
                                                setQuestions(questionsDupli)
                                            }} />
                                        </div>
                                    </div>)
                                } else if (section.type == "price") {
                                    return (<ul key={questionId + "-" + section.type + "-" + sectionIndex} className="opretkonto__priser__container">
                                        {section.pakker.map((pakke, pakkeIndex) => {
                                            return (<li key={pakke.navn + "-" + pakkeIndex} className="opretkonto__priser__element">
                                                <p className="opretkonto__priser__element__h1">{pakke.navn}</p>
                                                <div className="opretkonto__priser__element__price">
                                                    <p className="opretkonto__priser__element__price__h1">DKK</p>
                                                    <input type="number" className="opretkonto__priser__element__price__input" placeholder={"00,00"} onChange={(e) => {
                                                            const questionsDupli = [...questions]
                                                            questionsDupli[questionId].sections[sectionIndex].pakker[pakkeIndex].price = parseFloat(e.target.value)
                                                            setQuestions(questionsDupli)
                                                        }} />
                                                </div>
                                                <div className="welcome__selection__container">
                                                    <p className="logind__form__element__heading">Hvad inkluderer denne pakke?<span className={pakke.antalTegn == pakke.maxTegn ? "logind__form__element__heading__error" : ""}>{"(" + pakke.antalTegn + "/" + pakke.maxTegn + " tegn)"}</span></p>
                                                    <div className="welcome__dropdown__element__container">
                                                        <textarea className="welcome__dropdown__element__textarea" maxLength={pakke.maxTegn} autoComplete={"off"} id={questionId + "dropdown-" + sectionIndex} placeholder={"Skriv en beskrivelse til pakken..."} onChange={(e) => {
                                                            const questionsDupli = [...questions]
                                                            questionsDupli[questionId].sections[sectionIndex].pakker[pakkeIndex].beskrivelse = e.target.value
                                                            questionsDupli[questionId].sections[sectionIndex].pakker[pakkeIndex].antalTegn = e.target.value.length
                                                            setQuestions(questionsDupli)
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="welcome__selection__container">
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
                                                                        questionsDupli[questionId].sections[sectionIndex].pakker[pakkeIndex].inkluderet.splice(pakkeInkludeIndex, 1)
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

                                                                        questionsDupli[questionId].sections[sectionIndex].pakker[pakkeIndex].inkluderet.push(dataValue);
                                                                        (dataElement as HTMLInputElement).value = "";
                                                                        setQuestions(questionsDupli)
                                                                    }}>
                                                                    <input className="welcome__dropdown__element__dropdown__input" autoComplete={"off"} id={"inkluderet-" + sectionIndex + "-add"} placeholder={"Tilføj punkt..."} />
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
                                        {/* <li className="opretkonto__priser__element opretkonto__priser__element__add">
                                            <p className="opretkonto__priser__element__h1">Tilføj Pakkeløsning</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="opretkonto__priser__element__add__icon" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                                            </svg>
                                        </li> */}
                                    </ul>)
                                }
                            })}
                        </ul>
                        {error !== "" && <div className="component__error__container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                                <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
                            </svg>
                            <p className="component__howitworks__p">{error}</p>
                        </div>}
                        <div className="question__cta__container">
                            <button className={loading ? "question__cta__btn__fill logind__form__element__btn__disabled" : "question__cta__btn__fill"} onClick={() => nextQuestion()}>
                                {loading && <div className="loader_inline"></div>}
                                {question.knapText}
                                <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                                    <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                                </svg>
                            </button>
                            {question.skipable && <button className="question__cta__btn__transparent" onClick={() => skipQuestion()}>
                                Spring over
                            </button>}
                        </div>
                    </div>)
                })}
                <div className="logind__container__background">
                    <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
                </div>
            </div>
            <div className="welcome__media__container">
                <div className="welcome__media__quote__container">
                    <p className="welcome__media__quote__p">{questions[currentQuestion].quote?.quotation}</p>
                    <div className="welcome__media__quote__author__container">
                        <div className="welcome__media__quote__author">
                            <div className="welcome__media__quote__author__line"></div>
                            <p className="welcome__media__quote__author__h1">{questions[currentQuestion].quote?.author.name}</p>
                        </div>
                        <p className="welcome__media__quote__author__p">{questions[currentQuestion].quote?.author.stilling}</p>
                    </div>
                </div>
                <div className="welcome__media__image__container">
                    <Image src={questions[currentQuestion].quote?.image} className="welcome__media__image__file" alt="" />
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