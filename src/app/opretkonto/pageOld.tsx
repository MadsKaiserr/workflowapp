"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react'
import { createUserWithEmailAndPassword, validatePassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "@/app/firebase/config"
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'

import dotWave from '../assets/dotwave.png';

export default function Opretkonto() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [kontoType, setKontoType] = useState("");
    const [fuldeNavn, setFuldeNavn] = useState("");
    const [email, setEmail] = useState("");
    const [kodeord, setKodeord] = useState("");

    const validateInputs = async () => {

        var errorMessage = ""
    
        if (!fuldeNavn || fuldeNavn.trim().length < 2) {
            errorMessage = "Navnet skal være mindst 2 tegn.";
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errorMessage = "Indtast en gyldig email-adresse.";
        }
    
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!kodeord || !passwordRegex.test(kodeord)) {
            errorMessage = "Kodeordet skal være mindst 6 tegn langt, indeholde et stort bogstav og et tal.";
        }
    
        return errorMessage as string;
    };

    const opretUserAuth = async () => {
        setLoading(true)
        setError("")

        const validationError = validateInputs();
        if (await validationError !== "") {
            setError(await validationError as string);
            setLoading(false);
            return;
        }

        try {
            //Opret bruger i authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, kodeord);
            userCredential

            //Skift displayname
            if (auth.currentUser) {
                updateProfile(auth.currentUser, {
                    displayName: fuldeNavn
                }).then(() => {
                    localStorage.setItem("auth", JSON.stringify(auth.currentUser))
                    router.push('/dashboard/onboarding')
                }).catch((fejl) => {
                    console.error(fejl)
                    setLoading(false)
                    setError(fejl)
                });
            }
        } catch(err) {
            console.error(err)
            //setError(err)
            setLoading(false)
        }
    }

    const handleGlemtKodeord = async () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setSuccess("Vi har sendt en email med instruktioner til at oprette et nyt kodeord")
        })
        .catch((err) => {
            setError(err);
            console.error(err)
        });
    }

    return (
        <main className="logind__container">
            <div className="home__hero__indhold">
                <h1 className="home__hero__h1">Lad os skabe - Sammen</h1>
                <p className="home__hero__p">Opret din profil på Workflow gratis i dag</p>
                <form className="logind__form" onSubmit={() => opretUserAuth()}>
                    <div className="logind__form__element">
                        <p className="logind__form__element__heading">Fulde navn</p>
                        <input className="logind__form__element__input" placeholder="" required value={fuldeNavn} onChange={(e) => setFuldeNavn(e.target.value)} />
                    </div>
                    <div className="logind__form__element">
                        <p className="logind__form__element__heading">Email</p>
                        <input className="logind__form__element__input" type="email" required placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="logind__form__element">
                        <div className="logind__form__element__header">
                            <p className="logind__form__element__heading">Kodeord</p>
                            <button className="logind__form__element__heading__glemt" type="button" onClick={() => handleGlemtKodeord()}>Glemt kodeord?</button>
                        </div>
                        <div className="logind__form__multiple__container">
                            <input className="logind__form__element__input" type={showPass ? "text" : "password"} id="password" name="password" value={kodeord} onChange={(e) => setKodeord(e.target.value)} />
                            {!showPass ? <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" style={{cursor: "pointer", fill: "rgba(var--(primaryoff))"}} viewBox="0 0 16 16" onClick={() => setShowPass(true)}>
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" style={{cursor: "pointer", fill: "rgba(var--(primaryoff))"}} viewBox="0 0 16 16" onClick={() => setShowPass(false)}>
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                            </svg>}
                        </div>
                    </div>
                    {error !== "" && <div className="component__error__container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                            <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
                        </svg>
                        <p className="component__howitworks__p">{ error }</p>
                    </div>}
                    {success !== "" && <div className="component__success__container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                        </svg>
                        <p className="component__howitworks__p">{ success }</p>
                    </div>}
                    <div className="login__cta__container">
                        {loading && <button className="header__cta__btn__fill component__info__btn__fill login__cta__main" style={{padding: "10px"}}>
                            <div className="loader"></div>
                        </button>}
                        {!loading && <button className="logind__form__element__btn" onClick={() => opretUserAuth()}>
                            Opret konto med Email
                        </button>}
                        <button className="google__logind__form__element__btn" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" className="google__logind__form__element__btn__icon" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                            </svg>
                            Fortsæt med Google
                        </button>
                        <p className="logind__form__element__tagline">Har du allerede en konto? <Link href="/opretkonto" className="logind__form__element__tagline__color">Log ind</Link></p>
                    </div>
                </form>
            </div>
            {/* {onboardingPage == "kontotype" && <div className="home__hero__indhold">
                <h1 className="home__hero__h1">Lad os lære dig at kende</h1>
                <p className="home__hero__p">Vi skræddersyr din oplevelse efter dine præferencer</p>
                <div className="opretkonto__container">
                    {kontoType == "klient" && <>
                        <div className="opretkonto__element opretkonto__element__active">
                            <div className="opretkonto__element__image__container">
                                <Image src={searchUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">For klienter</p>
                            <p className="opretkonto__element__heading">Jeg er en virksomhed, der leder efter en freelancer</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setKontoType("freelancer")}>
                        <div className="opretkonto__element__image__container">
                            <Image src={freelancerUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">For freelancere</p>
                            <p className="opretkonto__element__heading">Jeg er en freelancer, der leder efter arbejde</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                    </>}
                    {kontoType == "freelancer" && <>
                        <div className="opretkonto__element" onClick={() => setKontoType("klient")}>
                            <div className="opretkonto__element__image__container">
                                <Image src={searchUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">For klienter</p>
                            <p className="opretkonto__element__heading">Jeg er en virksomhed, der leder efter en freelancer</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element opretkonto__element__active">
                        <div className="opretkonto__element__image__container">
                            <Image src={freelancerUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">For freelancere</p>
                            <p className="opretkonto__element__heading">Jeg er en freelancer, der leder efter arbejde</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                    </>}
                    {kontoType != "freelancer" && kontoType != "klient" && <>
                        <div className="opretkonto__element" onClick={() => setKontoType("klient")}>
                            <div className="opretkonto__element__image__container">
                                <Image src={searchUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">For klienter</p>
                            <p className="opretkonto__element__heading">Jeg er en virksomhed, der leder efter en freelancer</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setKontoType("freelancer")}>
                            <div className="opretkonto__element__image__container">
                            <Image src={freelancerUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">For freelancere</p>
                            <p className="opretkonto__element__heading">Jeg er en freelancer, der leder efter arbejde</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                    </>}
                </div>
                <div className="login__cta__container">
                    <button className="header__cta__btn__fill component__info__btn__fill login__cta__main" onClick={() => handleType()}>
                        Næste
                        <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                            <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                        </svg>
                    </button>
                </div>
            </div>}
            {onboardingPage == "freelance__type" && <div className="home__hero__indhold">
                <h1 className="home__hero__h1">Hvilken type freelancer er du?</h1>
                <p className="home__hero__p">Lad os hjælpe dig med at komme igang</p>
                <div className="opretkonto__container">
                    {freelanceType == "Side hustle" && <>
                        <div className="opretkonto__element opretkonto__element__active">
                        <div className="opretkonto__element__image__container">
                                <Image src={sideHustleUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg gør det som</p>
                            <p className="opretkonto__element__heading">En side hustle</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Solo")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={soloUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Solo freelancer</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Medarbejder")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={teamUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Medarbejder i en virksomhed</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Ejer")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={ejerUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Ejer af bureau</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                    </>}
                    {freelanceType == "Solo" && <>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Side hustle")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={sideHustleUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg gør det som</p>
                            <p className="opretkonto__element__heading">En side hustle</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element opretkonto__element__active">
                        <div className="opretkonto__element__image__container">
                                <Image src={soloUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Solo freelancer</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Medarbejder")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={teamUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Medarbejder i en virksomhed</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Ejer")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={ejerUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Ejer af bureau</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                    </>}
                    {freelanceType == "Medarbejder" && <>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Side hustle")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={sideHustleUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg gør det som</p>
                            <p className="opretkonto__element__heading">En side hustle</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Solo")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={soloUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Solo freelancer</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element opretkonto__element__active">
                        <div className="opretkonto__element__image__container">
                                <Image src={teamUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Medarbejder i en virksomhed</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Ejer")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={ejerUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Ejer af bureau</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                    </>}
                    {freelanceType == "Ejer" && <>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Side hustle")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={sideHustleUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg gør det som</p>
                            <p className="opretkonto__element__heading">En side hustle</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Solo")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={soloUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Solo freelancer</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Medarbejder")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={teamUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Medarbejder i en virksomhed</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element opretkonto__element__active">
                        <div className="opretkonto__element__image__container">
                                <Image src={ejerUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Ejer af bureau</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                    </>}
                    {freelanceType == "" && <>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Side hustle")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={sideHustleUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg gør det som</p>
                            <p className="opretkonto__element__heading">En side hustle</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Solo")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={soloUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Solo freelancer</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Medarbejder")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={teamUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Medarbejder i en virksomhed</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                        <div className="opretkonto__element" onClick={() => setFreelanceType("Ejer")}>
                        <div className="opretkonto__element__image__container">
                                <Image src={ejerUndraw} alt="" height={170} className="opretkonto__element__svg" />
                            </div>
                            <p className="opretkonto__element__tagline">Jeg er</p>
                            <p className="opretkonto__element__heading">Ejer af bureau</p>
                            <div className="opretkonto__element__radio"></div>
                        </div>
                    </>}
                </div>
                <div className="login__cta__container">
                    <button className="header__cta__btn__fill component__info__btn__fill login__cta__main" onClick={() => handleFreelanceType()}>
                        Næste
                        <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                            <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                        </svg>
                    </button>
                </div>
            </div>}
            {onboardingPage == "freelance__erfaring" && <div className="home__hero__indhold">
                <h1 className="home__hero__h1">Hvor meget erfaring har du som freelancer?</h1>
                <p className="home__hero__p">Vis besøgende, hvor meget erfaring du har indenfor branchen</p>
                <div className="logind__form" style={{marginBottom: "50px"}}>
                    <div className="logind__form__element">
                        <p className="logind__form__element__heading">Erfaring</p>
                        <div className="logind__form__multiple__container">
                            <select className="logind__form__element__input" onChange={(e) => setFreelanceErfaring(e.target.value)}>
                                <option value="">Vælg erfaring...</option>
                                <option value="Nyopstartet">Nyopstartet</option>
                                <option value="3-10 måneder">Lidt erfaring (3-10 måneder)</option>
                                <option value="1-2 år">Mellemliggende erfaring (1-2 år)</option>
                                <option value=">3 år">Meget erfaring (Over 3 år)</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="login__cta__container">
                    <button className="header__cta__btn__fill component__info__btn__fill login__cta__main" onClick={() => handleErfaring()}>
                        Næste
                        <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                            <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                        </svg>
                    </button>
                </div>
            </div>}
            {onboardingPage == "freelance__lokation" && <div className="home__hero__indhold">
                <h1 className="home__hero__h1">Hvor holder du til?</h1>
                <p className="home__hero__p">Lad besøgende i dit nærområde finde dig nemmere</p>
                <div className="logind__form" style={{marginBottom: "50px"}}>
                    <div className="logind__form__element">
                        <p className="logind__form__element__heading">By</p>
                        <div className="logind__form__multiple__container">
                            <select className="logind__form__element__input" onChange={(e) => setLokation(e.target.value)}>
                                <option value="">Vælg by...</option>
                                {danskeByer.map((by) => {
                                    return (<option value={by} key={by}>{by}</option>);
                                })}
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="login__cta__container">
                    <button className="header__cta__btn__fill component__info__btn__fill login__cta__main" onClick={() => handleLokation()}>
                        Næste
                        <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                            <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                        </svg>
                    </button>
                </div>
            </div>}
            {onboardingPage == "freelance__branche" && <div className="home__hero__indhold">
                <h1 className="home__hero__h1">Næsten færdig! Hvilken branche er du i?</h1>
                <p className="home__hero__p">Branchen er med til at lade besøgende finde dine ydelser</p>
                <div className="logind__form" style={{marginBottom: "50px"}}>
                    <div className="logind__form__element">
                        <p className="logind__form__element__heading">Branche</p>
                        <div className="logind__form__multiple__container">
                            <select className="logind__form__element__input" onChange={(e) => setBranche(e.target.value)}>
                                <option value="">Vælg branche...</option>
                                <option value="Shopify Udvikler">Shopify Udvikler</option>
                                <option value="Wordpress Udvikler">Wordpress Udvikler</option>
                                <option value="Webflow Udvikler">Webflow Udvikler</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="login__cta__container">
                    {loading && <button className="header__cta__btn__fill component__info__btn__fill login__cta__main">
                        <div className="loader"></div>
                    </button>}
                    {!loading && <button className="header__cta__btn__fill component__info__btn__fill login__cta__main" onClick={() => opretUserDocument("freelancer")}>
                        Opret freelance profil
                        <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                            <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                        </svg>
                    </button>}
                </div>
            </div>} */}
            <div className="logind__container__background">
                <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
            </div>
        </main>
    );
}