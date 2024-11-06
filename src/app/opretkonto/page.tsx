"use client"
import Link from "next/link";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, validatePassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { signup } from "../lib"

import dotWave from '../assets/dotwave.png';

export default function Opretkonto() {
    const [state, signupAction] = useActionState<any, FormData>(signup, undefined);

    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [fejl, setFejl] = useState(false)
    const [success, setSuccess] = useState("");

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    function handleSignup() {
        setLoading(true)
        setFejl(false)
    }

    useEffect(() => {
        if (state?.error) {
            setLoading(false)
            setFejl(true)
        }
    }, [state])

    /* const opretUserAuth = async () => {
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
    } */

    return (
        <main className="logind__container">
            <div className="home__hero__indhold">
                <h1 className="home__hero__h1">Lad os skabe - Sammen</h1>
                <p className="home__hero__p">Opret din profil på Workflow <span>gratis</span> i dag</p>
                <form className="logind__form" action={signupAction} onSubmit={() => handleSignup()}>
                    <div className="logind__form__element">
                        <p className="logind__form__element__heading">Fulde navn</p>
                        <input className="logind__form__element__input" placeholder="" required name="name" value={formValues.name} onChange={handleInputChange} />
                    </div>
                    <div className="logind__form__element">
                        <p className="logind__form__element__heading">Email</p>
                        <input className="logind__form__element__input" type="email" required placeholder="" name="email" value={formValues.email} onChange={handleInputChange} />
                    </div>
                    <div className="logind__form__element">
                        <div className="logind__form__element__header">
                            <p className="logind__form__element__heading">Kodeord</p>
                            <button className="logind__form__element__heading__glemt" type="button">Glemt kodeord?</button>
                        </div>
                        <div className="logind__form__multiple__container">
                            <input className="logind__form__element__input" type={showPass ? "text" : "password"} id="password" name="password" value={formValues.password} onChange={handleInputChange} />
                            {!showPass ? <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" style={{cursor: "pointer", fill: "rgba(var--(primaryoff))"}} viewBox="0 0 16 16" onClick={() => setShowPass(true)}>
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" style={{cursor: "pointer", fill: "rgba(var--(primaryoff))"}} viewBox="0 0 16 16" onClick={() => setShowPass(false)}>
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                            </svg>}
                        </div>
                    </div>
                    {state?.error && fejl && <div className="component__error__container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                            <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
                        </svg>
                        <p className="component__howitworks__p">{ state?.error }</p>
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
                        {!loading && <button className="logind__form__element__btn" type="submit">
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
            <div className="logind__container__background">
                <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
            </div>
        </main>
    );
}