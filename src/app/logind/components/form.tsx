"use client";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { login, loginWithGoogleComplete } from "../../lib"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/app/firebase/config"

export default function Form() {

    const [loading, setLoading] = useState(false)
    const [fejl, setFejl] = useState(false)
    const [showPass, setShowPass] = useState(false)

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

    async function loginGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;

                const userData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                }
                await loginWithGoogleComplete(userData)
            }).catch((err) => {
                console.error(err)
            });

        } catch(err) {
            console.error(err)
        }
    }

    return (
        <form className="logind__form" action={loginAction} onSubmit={() => handleLogin()}>
            <button className="google__logind__form__element__btn" type="button" onClick={() => loginGoogle()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="google__logind__form__element__btn__icon" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                </svg>
                Fortsæt med Google
            </button>
            <div className="login__cta__or__container">
                <div className="login__cta__or__divider"></div>
                <p className="login__cta__or__p">Eller</p>
                <div className="login__cta__or__divider"></div>
            </div>
            <div className="logind__form__element">
                <p className="logind__form__element__heading">Email</p>
                <input className="logind__form__element__input" type="email" required placeholder="eg. jenshansen@gmail.com" name="email" value={formValues.email} onChange={handleInputChange} />
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
                <p className="component__howitworks__p">{ state.error }</p>
            </div>}
            <div className="login__cta__container">
                <button className={loading ? "logind__form__element__btn logind__form__element__btn__disabled" : "logind__form__element__btn"} type="submit">
                    {loading && <div className="loader_inline"></div>}
                    Log ind med Email
                </button>
                <p className="logind__form__element__tagline">Har du ikke allerede en konto? <Link href="/opretkonto" className="logind__form__element__tagline__color">Opret konto</Link></p>
            </div>
        </form>
    );
}