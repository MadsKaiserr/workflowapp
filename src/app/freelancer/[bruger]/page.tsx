"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getFreelanceProfil } from "@/app/lib";

import dotWave from '../../assets/dotwave.png';
import profilBillede from '../../assets/madskaiser.jpg';

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

export default function Freelancer() {
    const searchParams  = useSearchParams()

    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState<User | null>(null)

    async function getFreelancer() {
        const userId = searchParams.get("id")
        if (userId) {
            const userData: any = {...await getFreelanceProfil(userId)}
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

        /* const opdaterDatabase = async () => {
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
        opdaterDatabase() */
    }

    return (
        <div className="profil__container">
            {loading ? <div className="profil__loading__container">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div> : <>
                {user && <>
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
                                <Link className="search__where__p" href={"/freelance-kategorier/" + user.freelanceInformation.freelance__profile.profile__branche}>{user.freelanceInformation.freelance__profile.profile__branche}</Link>
                                <p className="search__where__divider">»</p>
                                <Link className="search__where__p" href={"/freelance-kategorier?kategori=" + user.freelanceInformation.freelance__profile.profile__underkategori}>{user.freelanceInformation.freelance__profile.profile__underkategori}</Link>
                                <p className="search__where__divider">»</p>
                                <Link className="search__where__p" href={"/freelancer/profil?id=" + user.freelanceInformation.freelance__url}>{user.userInformation.user__name}</Link>
                            </div>
                            <div className="profil__tags__container">
                                <div className="profil__tags__wrapper">
                                    {user.freelanceInformation.freelance__profile.profile__tags.map((tag) => {
                                        return (<div key={tag.tag__id} className="profil__tag__container" style={{backgroundColor: tag.tag_color}}>
                                            {tag.tag__id == "workflowVerified" && <svg xmlns="http://www.w3.org/2000/svg" className="profil__verified__icon" viewBox="0 0 16 16">
                                                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                            </svg>}
                                            {tag.tag__id == "topSeller" && <svg xmlns="http://www.w3.org/2000/svg" className="profil__verified__icon" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.18.18 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.18.18 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.18.18 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.18.18 0 0 1-.134-.098z"/>
                                            </svg>}
                                            <p className="profil__verified__heading">{tag.tag__name}</p>
                                            <div className="profil__tag__popup">
                                                <div className="profil__tag__popup__arrow"></div>
                                                <p className="profil__tag__popup__p">{user.userInformation.user__name} {tag.tag__description}</p>
                                            </div>
                                        </div>)
                                    })}
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
                            <h1 className="profil__h1">{user.freelanceInformation.freelance__overskrift}</h1>
                            <div className="profil__location__wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" className="profil__reviews__icon" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <p className="profil__reviews__p">{user.freelanceInformation.freelance__reviews.reviews__rating} <span>({user.freelanceInformation.freelance__reviews.reviews__data.length})</span></p>
                            </div>
                            <div className="salecard__element__indhold__seller">
                                <div className="salecard__element__indhold__seller__image">
                                    <Image className="salecard__element__indhold__seller__image__pic" src={profilBillede} alt="" />
                                </div>
                                <div className="salecard__element__indhold__seller__indhold">
                                    <p className="salecard__element__indhold__seller__heading">{user.userInformation.user__name}</p>
                                    <div className="profil__salecard__tags">
                                        <div className="profil__location__wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="profil__location__icon" viewBox="0 0 16 16">
                                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                            </svg>
                                            <p className="profil__location__heading">{user.userInformation.user__location}</p>
                                        </div>
                                        <div className="profil__location__wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="profil__location__icon" viewBox="0 0 16 16">
                                                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z"/>
                                                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
                                            </svg>
                                            <p className="profil__location__heading">{user.freelanceInformation.freelance__profile.profile__type}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="salecard__element__indhold__tags__container">
                                {user.freelanceInformation.freelance__tags.map((tag: string) => {
                                    return <div key={tag} className="salecard__element__indhold__tags__element">{tag}</div>
                                })}
                            </div>
                        </div>
                        <div className="home__hero__background">
                            <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
                        </div>
                    </div>
                    <div className="profil__indhold__container">
                        <div className="profil__content__container">
                            <div className="portfolio__container">
                                <div className="portfolio__selected"></div>
                                <div className="portfolio__miniatures__container">
                                    <div className="portfolio__miniatures__element"></div>
                                    <div className="portfolio__miniatures__element"></div>
                                    <div className="portfolio__miniatures__element"></div>
                                    <div className="portfolio__miniatures__element"></div>
                                </div>
                            </div>
                            <pre className="textsection__container">
                                <p className="textsection__element__p">
                                    {user.freelanceInformation.freelance__beskrivelse}
                                </p>
                                {/* <div className="textsection__element">
                                    <p className="textsection__element__h1">Hvad betyder "Ascent" for mig?</p>
                                    <p className="textsection__element__p">Jeg hjælper virksomheder med at vokse, ikke kun ved at udvikle moderne hjemmesider, men ved udvikle deres brand og genkendelighed. Navnet Ascent, afspejler vores værdier – vi stræber altid efter at blive bedre, både som team og i de løsninger, vi leverer.</p>
                                </div>
                                <div className="textsection__element">
                                    <p className="textsection__element__h1">Jeg sætter ord på Ascent's vision</p>
                                    <p className="textsection__element__p">Hos Ascent handler min vision om at skabe værdi for mine kunder ved at bygge moderne og brugervenlige hjemmesider, der hjælper dem med at skille sig ud i en digital verden. Jeg tror på, at en hjemmeside er mere end bare et design – det er virksomhedens ansigt udadtil.</p>
                                </div> */}
                            </pre>
                            <div className="anmeldelser__content">
                                <div className="anmeldelser__header">
                                    <div className="anmeldelser__header__stats">
                                        <div className="anmeldelser__header__stats__overview">
                                            <p className="anmeldelser__header__stats__overview__h1">Anmeldelser <span>({user.freelanceInformation.freelance__reviews.reviews__data.length})</span></p>
                                            <div className="anmeldelser__header__stats__overview__heading">
                                                <p className="anmeldelser__header__stats__overview__heading__h1">{user.freelanceInformation.freelance__reviews.reviews__rating}</p>
                                                <div className="anmeldelser__header__stats__overview__heading__stars">
                                                    {user.freelanceInformation.freelance__reviews.reviews__rating >= 1 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                    </svg>}
                                                    {user.freelanceInformation.freelance__reviews.reviews__rating >= 2 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                    </svg>}
                                                    {user.freelanceInformation.freelance__reviews.reviews__rating >= 3 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                    </svg>}
                                                    {user.freelanceInformation.freelance__reviews.reviews__rating >= 4 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                    </svg>}
                                                    {user.freelanceInformation.freelance__reviews.reviews__rating >= 5 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                    </svg>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="anmeldelser__header__stats__content">
                                            <div className="anmeldelser__header__stats__content__element">
                                                <p className="anmeldelser__header__stats__content__element__p">5 stjerner</p>
                                                <div className="anmeldelser__header__stats__content__element__line">
                                                    <div className="anmeldelser__header__stats__content__element__line__active" style={{width: user.freelanceInformation.freelance__reviews.reviews__5star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                                </div>
                                                <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{user.freelanceInformation.freelance__reviews.reviews__5star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                            </div>
                                            <div className="anmeldelser__header__stats__content__element">
                                                <p className="anmeldelser__header__stats__content__element__p">4 stjerner</p>
                                                <div className="anmeldelser__header__stats__content__element__line">
                                                    <div className="anmeldelser__header__stats__content__element__line__active" style={{width: user.freelanceInformation.freelance__reviews.reviews__4star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                                </div>
                                                <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{user.freelanceInformation.freelance__reviews.reviews__4star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                            </div>
                                            <div className="anmeldelser__header__stats__content__element">
                                                <p className="anmeldelser__header__stats__content__element__p">3 stjerner</p>
                                                <div className="anmeldelser__header__stats__content__element__line">
                                                    <div className="anmeldelser__header__stats__content__element__line__active" style={{width: user.freelanceInformation.freelance__reviews.reviews__3star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                                </div>
                                                <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{user.freelanceInformation.freelance__reviews.reviews__3star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                            </div>
                                            <div className="anmeldelser__header__stats__content__element">
                                                <p className="anmeldelser__header__stats__content__element__p">2 stjerner</p>
                                                <div className="anmeldelser__header__stats__content__element__line">
                                                    <div className="anmeldelser__header__stats__content__element__line__active" style={{width: user.freelanceInformation.freelance__reviews.reviews__2star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                                </div>
                                                <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{user.freelanceInformation.freelance__reviews.reviews__2star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                            </div>
                                            <div className="anmeldelser__header__stats__content__element">
                                                <p className="anmeldelser__header__stats__content__element__p">1 stjerne</p>
                                                <div className="anmeldelser__header__stats__content__element__line">
                                                    <div className="anmeldelser__header__stats__content__element__line__active" style={{width: user.freelanceInformation.freelance__reviews.reviews__1star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                                </div>
                                                <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{user.freelanceInformation.freelance__reviews.reviews__1star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profil__info__container">
                            <div className="profil__info__wrapper">
                                <div className="salecard__element__indhold__seller">
                                    <div className="salecard__element__indhold__seller__image">
                                        <Image className="salecard__element__indhold__seller__image__pic" src={profilBillede} alt="" />
                                    </div>
                                    <div className="salecard__element__indhold__seller__indhold">
                                        <p className="salecard__element__indhold__seller__heading">{user.userInformation.user__name}</p>
                                        <p className="salecard__element__indhold__seller__p">{user.freelanceInformation.freelance__profile.profile__underkategori}</p>
                                    </div>
                                </div>
                                <div className="profil__info__description__container">
                                    <p className="profil__info__description__heading">Læs om denne freelancer</p>
                                    <p className="profil__info__description__p">{user.freelanceInformation.freelance__profile.profile__about}</p>
                                </div>
                                <div className="profil__info__description__container profil__info__bulletpoints">
                                    <p className="profil__info__description__heading">Mød din freelancer</p>
                                    <p className="profil__info__description__p"><span>Lokation: </span>{user.userInformation.user__location}</p>
                                    <p className="profil__info__description__p"><span>Timepris: </span></p>
                                    <p className="profil__info__description__p"><span>Erfaring: </span>{user.freelanceInformation.freelance__erfaring.erfaring__tid}</p>
                                </div>
                            </div>
                            <div className="profil__info__cta">
                                <button className="profil__info__cta__btn" onClick={() => kontaktfreelancer()}>{loading ? <div className="loader"></div> : "Kontakt Freelancer"}</button>
                                <button className="profil__info__cta__btn profil__info__cta__btn__outline">Se website</button>
                            </div>
                        </div>
                    </div>
                </>}
            </>}
        </div>
    );
}
