"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { auth, db } from "@/app/firebase/config"
import { getDoc, doc, addDoc, collection } from "firebase/firestore";
import { getFreelanceProfil } from "@/app/lib";

import dotWave from '../../assets/dotwave.png';
import forside from '../../assets/Ascent/Ascent_Forside.jpg';
import profilBillede from '../../assets/madskaiser.jpg';

export default function Freelancer() {
    const router = useRouter()
    const searchParams  = useSearchParams()

    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState({})

    async function getFreelancer() {
        const userId = searchParams.get("id")
        if (userId) {
            const userData = await getFreelanceProfil(userId)
            if (userData) {
                console.log("User:", userData)
                setUser(userData)
                setLoading(false)
            } else {
                console.log("Ikke fundet")
            }
        }
    }

    useEffect(() => {
        getFreelancer()
    }, [])

    function kontaktfreelancer() {
        setLoading(true)

        const opdaterDatabase = async () => {
            const profilEmail = JSON.parse(localStorage.getItem("user")).userInformation.user__email

            const velkommenDoc = await addDoc(collection(db, "samtaler"), {
                samtale__beskeder: [
                ],
                samtale__medlemmer: [
                    email,
                    profilEmail
                ],
                samtale__data: {
                    data__created: new Date().getTime()
                }
            })
            velkommenDoc
            router.push("/dashboard/samtaler")
        }
        opdaterDatabase()
    }

    return (
        <>
            {loading ? <div className="profil__loading__container">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div> : <>
                <div className="profil__hero__container">
                    <div className="priser__hero__indhold">
                        <div className="search__where__container">
                            <Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" className="search__where__icon">
                                    <path d="M22,5.724V2c0-.552-.447-1-1-1s-1,.448-1,1v2.366L14.797,.855c-1.699-1.146-3.895-1.146-5.594,0L2.203,5.579c-1.379,.931-2.203,2.48-2.203,4.145v9.276c0,2.757,2.243,5,5,5h3c.553,0,1-.448,1-1V15c0-.551,.448-1,1-1h4c.552,0,1,.449,1,1v8c0,.552,.447,1,1,1h3c2.757,0,5-2.243,5-5V9.724c0-1.581-.744-3.058-2-4Zm0,13.276c0,1.654-1.346,3-3,3h-2v-7c0-1.654-1.346-3-3-3h-4c-1.654,0-3,1.346-3,3v7h-2c-1.654,0-3-1.346-3-3V9.724c0-.999,.494-1.929,1.322-2.487L10.322,2.513c1.02-.688,2.336-.688,3.355,0l7,4.724c.828,.558,1.322,1.488,1.322,2.487v9.276Z"/>
                                </svg>
                            </Link>
                            <p className="search__where__divider">»</p>
                            <Link className="search__where__p" href="/freelance-kategorier">Find freelancer</Link>
                            <p className="search__where__divider">»</p>
                            <Link className="search__where__p" href={"/freelance-kategorier/" + user ? user.freelanceInformation.freelance__branche : ""}>{user ? user.freelanceInformation.freelance__branche : ""}</Link>
                            <p className="search__where__divider">»</p>
                            <Link className="search__where__p" href={"/freelance-kategorier?kategori=" + user ? user.freelanceInformation.freelance__underkategori : ""}>{user ? user.freelanceInformation.freelance__underkategori : ""}</Link>
                            <p className="search__where__divider">»</p>
                            <Link className="search__where__p" href={"/freelancer/profil?id=" + user ? user.freelanceInformation.freelance__url : ""}>{user ? user.userInformation.user__name : ""}</Link>
                        </div>
                        <div className="profil__tags__container">
                            <div className="profil__tags__wrapper">
                                <div className="profil__tag__container profil__verified__container">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="profil__verified__icon" viewBox="0 0 16 16">
                                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                    </svg>
                                    <p className="profil__verified__heading">Workflow Verificeret</p>
                                    <div className="profil__tag__popup">
                                        <div className="profil__tag__popup__arrow"></div>
                                        <p className="profil__tag__popup__p">Mads Kaiser er blevet verificeret af Workflow administrationen. Freelanceren er derfor af høj kvalitet og troværdighed.</p>
                                    </div>
                                </div>
                                <div className="profil__tag__container profil__top__container">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="profil__verified__icon" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.18.18 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.18.18 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.18.18 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.18.18 0 0 1-.134-.098z"/>
                                    </svg>
                                    <p className="profil__verified__heading">Top Sælger</p>
                                    <div className="profil__tag__popup">
                                        <div className="profil__tag__popup__arrow"></div>
                                        <p className="profil__tag__popup__p">Mads Kaiser er førende indenfor sine kategorier. Vedkommende har solgt til mange, og har mange glade kunder.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="profil__cta__container">
                                <div className="profil__cta__btns">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="profil__cta__btn" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="profil__cta__btn" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"/>
                                        <path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708z"/>
                                    </svg>
                                </div>
                                <div className="component__howitworks__container">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                                    </svg>
                                    <p className="component__howitworks__p">Hvordan virker Workflow?</p>
                                </div>
                            </div>
                        </div>
                        <h1 className="profil__h1">{user.freelanceInformation ? user.freelanceInformation.freelance__overskrift : ""}</h1>
                        <div className="salecard__element__indhold__seller">
                            <div className="salecard__element__indhold__seller__image">
                                <Image className="salecard__element__indhold__seller__image__pic" src={profilBillede} alt="" />
                            </div>
                            <div className="salecard__element__indhold__seller__indhold">
                                <p className="salecard__element__indhold__seller__heading">{user.userInformation ? user.userInformation.user__name : ""}</p>
                                <div className="profil__salecard__tags">
                                    <div className="profil__location__wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="profil__location__icon" viewBox="0 0 16 16">
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                        </svg>
                                        <p className="profil__location__heading">{user ? user.freelanceInformation.freelance__location : ""}</p>
                                    </div>
                                    <div className="profil__location__wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="profil__location__icon" viewBox="0 0 16 16">
                                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z"/>
                                        </svg>
                                        <p className="profil__location__heading">540 ordrer</p>
                                    </div>
                                    <div className="profil__location__wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="profil__location__icon" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        <p className="profil__location__heading">82 anmeldelser</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="salecard__element__indhold__tags__container">
                            <div className="salecard__element__indhold__tags__element">Webdesign</div>
                            <div className="salecard__element__indhold__tags__element">Grafisk design</div>
                            <div className="salecard__element__indhold__tags__element">Shopify</div>
                        </div>
                    </div>
                    <div className="home__hero__background">
                        <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
                    </div>
                </div>
                <div className="profil__indhold__container">
                    <div className="profil__media__container">
                        <Image className="profil__media__image" src={forside} alt="" height={2000} />
                    </div>
                    <div className="profil__info__container">
                        <div className="profil__info__wrapper">
                            <div className="salecard__element__indhold__seller">
                                <div className="salecard__element__indhold__seller__image">
                                    <Image className="salecard__element__indhold__seller__image__pic" src={profilBillede} alt="" />
                                </div>
                                <div className="salecard__element__indhold__seller__indhold">
                                    <p className="salecard__element__indhold__seller__heading">{user.userInformation ? user.userInformation.user__name : ""}</p>
                                    <p className="salecard__element__indhold__seller__p">{user.freelanceInformation ? user.freelanceInformation.freelance__branche : ""}</p>
                                </div>
                            </div>
                            <div className="profil__info__description__container">
                                <p className="profil__info__description__heading">Læs om denne freelancer</p>
                                <p className="profil__info__description__p">{user.freelanceInformation ? user.freelanceInformation.freelance__beskrivelse : ""}</p>
                            </div>
                            <div className="profil__info__description__container">
                                <p className="profil__info__description__heading">Mød din freelancer</p>
                                <p className="profil__info__description__p"><span>Lokation: </span>{user.freelanceInformation ? user.freelanceInformation.freelance__location : ""}</p>
                                <p className="profil__info__description__p"><span>Timepris: </span></p>
                                <p className="profil__info__description__p"><span>Erfaring: </span>{user.freelanceInformation ? user.freelanceInformation.freelance__erfaring.erfaring__tid : ""}</p>
                                <p className="profil__info__description__p"><span>Anmeldelser: </span>4,5 stjerner</p>
                            </div>
                        </div>
                        <div className="profil__info__cta">
                            <button className="profil__info__cta__btn" onClick={() => kontaktfreelancer()}>{loading ? <div className="loader"></div> : "Kontakt freelancer"}</button>
                        </div>
                    </div>
                </div>
            </>}
        </>
    );
}
