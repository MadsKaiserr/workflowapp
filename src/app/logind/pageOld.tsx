'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebase/config"
import { getDoc, doc } from "firebase/firestore";

import dotWave from '../assets/dotwave.png';

export default function Logind() {
    const router = useRouter()
    const provider = new GoogleAuthProvider();
    auth.languageCode = 'da';

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    const [email, setEmail] = useState("");
    const [kodeord, setKodeord] = useState("");

    function handleLogin() {
        setError("")
        setLoading(true)

        signInWithEmailAndPassword(auth, email, kodeord)
        .then((userCredential) => {
            setLoading(false)
            console.log(userCredential)

            const getUserInformation = async () => {
                const docSnap = await getDoc(doc(db, "users", email));

                if (docSnap.exists()) {
                    console.log("Brugeren blev fundet:", docSnap.data());
                    if (docSnap.data().accountInformation.account__type == "freelancer") {
                        router.push("/dashboard")
                    } else {
                        router.push("/freelance-kategorier")
                    }
                } else {
                    console.log("Brugeren blev ikke fundet...");
                }
            }
            getUserInformation()
        })
        .catch((err) => {
            setLoading(false)
            if (err.code == "auth/invalid-email") {
                setError("Den indtastede email er ikke valid")
            } else if (err.code == "auth/invalid-credential") {
                setError("Email og kodeord matcher ikke")
            } else if (err.code == "auth/user-disabled") {
                setError("Din bruger er blevet midlertidig utilgængelig")
            } else {
                setError("Der skete en teknisk fejl...")
            }
            console.error(err)
        });
    }

    function handleGoogleLogin() {
        signInWithPopup(auth, provider)
        .then((result) => {
            //signInWithRedirect(auth, provider);
            console.log("Logget ind", result)
            console.log("Credential", GoogleAuthProvider.credentialFromResult(result))
        }).catch((err) => {
            console.error(err)
            setError("Der skete en fejl med " + err.customData.email + ". Ved brug af " + GoogleAuthProvider.credentialFromError(err))
        });
    }

    return (
        <>
        <div className="logind__container">
            <div className="home__hero__indhold">
                <h1 className="home__hero__h1">Log ind</h1>
                <p className="home__hero__p">Velkommen tilbage til Workflow.</p>
                <form className="logind__form" onSubmit={() => handleLogin()}>
                    <div className="logind__form__element">
                        <p className="logind__form__element__heading">Email</p>
                        <input className="logind__form__element__input" required placeholder="" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="logind__form__element">
                        <div className="logind__form__element__header">
                            <p className="logind__form__element__heading">Kodeord</p>
                            <p className="logind__form__element__heading__glemt">Glemt kodeord?</p>
                        </div>
                        <input className="logind__form__element__input" required type="password" onChange={(e) => setKodeord(e.target.value)} />
                    </div>
                    {error !== "" && <div className="component__error__container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                            <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
                        </svg>
                        <p className="component__howitworks__p">{ error }</p>
                    </div>}
                    <div className="login__cta__container">
                        {loading && <button className="header__cta__btn__fill component__info__btn__fill login__cta__main" style={{padding: "10px"}}>
                            <div className="loader"></div>
                        </button>}
                        {!loading && <button className="logind__form__element__btn" onClick={() => handleLogin()}>
                            Log ind
                        </button>}
                        <button className="google__logind__form__element__btn" onClick={() => handleGoogleLogin()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="google__logind__form__element__btn__icon" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                            </svg>
                            Fortsæt med Google
                        </button>
                        <p className="logind__form__element__tagline">Har du ikke allerede en konto? <Link href="/opretkonto" className="logind__form__element__tagline__color">Opret konto</Link></p>
                    </div>
                </form>
            </div>
            <div className="logind__container__background">
                <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
            </div>
        </div>
        </>
    );
}
