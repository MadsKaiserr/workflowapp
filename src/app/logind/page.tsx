"use client";
import Link from "next/link";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { login } from "../lib"

import dotWave from '../assets/dotwave.png';

export default function Logind() {

    const [loading, setLoading] = useState(false)
    const [fejl, setFejl] = useState(false)

    const [state, loginAction] = useActionState<any, FormData>(login, undefined);

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    // Håndtering af ændringer i inputfelterne
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    function handleLogin() {
        setLoading(true)
        setFejl(false)
    }

    useEffect(() => {
        if (state?.error) {
            setLoading(false)
            setFejl(true)
        }
    }, [state])

    return (
        <main className="logind__container">
            <div className="home__hero__indhold">
                <h1 className="home__hero__h1">Velkommen tilbage</h1>
                <p className="home__hero__p">Log ind på din profil nedenfor</p>
                <form className="logind__form" action={loginAction} onSubmit={() => handleLogin()}>
                    <div className="logind__form__element">
                        <p className="logind__form__element__heading">Email</p>
                        <input className="logind__form__element__input" type="email" required placeholder="" name="email" value={formValues.email} onChange={handleInputChange} />
                    </div>
                    <div className="logind__form__element">
                        <div className="logind__form__element__header">
                            <p className="logind__form__element__heading">Kodeord</p>
                        </div>
                        <div className="logind__form__multiple__container">
                            <input className="logind__form__element__input" type="password" id="password" name="password" value={formValues.password} onChange={handleInputChange} />
                        </div>
                    </div>
                    {state?.error && fejl && <div className="component__error__container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                            <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
                        </svg>
                        <p className="component__howitworks__p">{ state.error }</p>
                    </div>}
                    <div className="login__cta__container">
                        {loading && <button className="header__cta__btn__fill component__info__btn__fill login__cta__main" style={{padding: "10px"}} type="button">
                            <div className="loader"></div>
                        </button>} 
                        {!loading && <button className="logind__form__element__btn" type="submit">
                            Log ind med Email
                        </button>}
                        <button className="google__logind__form__element__btn" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="google__logind__form__element__btn__icon" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                            </svg>
                            Fortsæt med Google
                        </button>
                        <p className="logind__form__element__tagline">Har du ikke allerede en konto? <Link href="/opretkonto" className="logind__form__element__tagline__color">Opret konto</Link></p>
                    </div>
                </form>
                {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
            </div>
            <div className="logind__container__background">
                <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
            </div>
        </main>
    );
}