"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getFreelanceProfil, opretSamtale, getUser } from "@/app/lib";

import dotWave from '../../assets/dotwave.png';

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
        freelance__pricing: {
            pricing__packages: {
                package__description: string;
                package__name: string;
                package__price: number;
                package__includes: string[]
            }[];
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
        user__id: string;
    };
    portfolioInformation: string[]
};

export default function Freelancer() {
    const router = useRouter()
    const searchParams  = useSearchParams()

    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState<User | null>(null)
    const [freelancer, setFreelancer] = useState<User | null>(null)
    const [notFound, setNotFound] = useState(false)

    async function getFreelancer() {
        const userData: any = {...await getUser()}
        setUser(userData.clientUserData)

        const freelancerId = searchParams.get("id")
        if (freelancerId) {
            const freelancerData: any = {...await getFreelanceProfil(freelancerId)}
            if (Object.keys(freelancerData).length > 0) {
                setFreelancer(freelancerData)
                setLoading(false)
            } else {
                console.log("Ikke fundet")
                setLoading(false)
                setNotFound(true)
            }
        }
    }

    useEffect(() => {
        getFreelancer()
    }, [])

    async function kontaktfreelancer() {
        setLoading(true)

        if (user) {
            const samtale = await opretSamtale(user!.userInformation.user__id, freelancer!.userInformation.user__id)
            if (samtale) {
                 router.push("/dashboard/samtaler")
            }
        } else {
            router.push("/logind")
        }
    }

    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <div className="profil__container">
            {loading ? <div className="profil__loading__container">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div> : <>
                {freelancer && <>
                    <div className="profil__hero__container">
                        <div className="priser__hero__indhold">
                            <div className="profil__tags__container">
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
                                </div>
                            </div>
                            <h1 className="profil__h1">{freelancer.freelanceInformation.freelance__overskrift}</h1>
                            <div className="profil__location__wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" className="profil__reviews__icon" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <p className="profil__reviews__p">{freelancer.freelanceInformation.freelance__reviews.reviews__rating} <span>({freelancer.freelanceInformation.freelance__reviews.reviews__data.length})</span></p>
                            </div>
                            <div className="salecard__element__indhold__tags__container">
                                {freelancer.freelanceInformation.freelance__tags.map((tag: string) => {
                                    return <div key={tag} className="salecard__element__indhold__tags__element">{tag}</div>
                                })}
                            </div>
                        </div>
                        {/* <div className="home__hero__background">
                            <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
                        </div> */}
                    </div>
                    <div className="profil__indhold__container">
                        <div className="profil__content__container">
                            <div className="portfolio__container">
                                <div className="portfolio__selected">
                                    <img src={freelancer.freelanceInformation.freelance__portfolio[selectedImage].portfolio__image} className="portfolio__selected__image__img" alt="" />
                                </div>
                                <ul className="portfolio__miniatures__container">
                                    {freelancer.freelanceInformation.freelance__portfolio.map((portfolioCase, portfolioCaseIndex) => {
                                        return (
                                            <li key={"portfoliocase-" + portfolioCaseIndex} className={selectedImage == portfolioCaseIndex ? "portfolio__miniatures__element" : "portfolio__miniatures__element portfolio__miniatures__element__off"} onClick={() => setSelectedImage(portfolioCaseIndex)}><img src={portfolioCase.portfolio__image} className="portfolio__selected__image__img" alt="" /></li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <pre className="textsection__container">
                                <p className="textsection__element__p">
                                    {freelancer.freelanceInformation.freelance__beskrivelse}
                                </p>
                            </pre>
                            <div className="anmeldelser__content">
                                <div className="anmeldelser__header">
                                    <div className="anmeldelser__header__stats">
                                        <div className="anmeldelser__header__stats__overview">
                                            <p className="anmeldelser__header__stats__overview__h1">Anmeldelser <span>({freelancer.freelanceInformation.freelance__reviews.reviews__data.length})</span></p>
                                            <div className="anmeldelser__header__stats__overview__heading">
                                                <p className="anmeldelser__header__stats__overview__heading__h1">{freelancer.freelanceInformation.freelance__reviews.reviews__rating}</p>
                                                <div className="anmeldelser__header__stats__overview__heading__stars">
                                                    {freelancer.freelanceInformation.freelance__reviews.reviews__rating >= 1 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                    </svg>}
                                                    {freelancer.freelanceInformation.freelance__reviews.reviews__rating >= 2 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                    </svg>}
                                                    {freelancer.freelanceInformation.freelance__reviews.reviews__rating >= 3 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                    </svg>}
                                                    {freelancer.freelanceInformation.freelance__reviews.reviews__rating >= 4 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                    </svg>}
                                                    {freelancer.freelanceInformation.freelance__reviews.reviews__rating >= 5 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
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
                                                    <div className="anmeldelser__header__stats__content__element__line__active" style={{width: freelancer.freelanceInformation.freelance__reviews.reviews__5star / freelancer.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                                </div>
                                                <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{freelancer.freelanceInformation.freelance__reviews.reviews__5star / freelancer.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                            </div>
                                            <div className="anmeldelser__header__stats__content__element">
                                                <p className="anmeldelser__header__stats__content__element__p">4 stjerner</p>
                                                <div className="anmeldelser__header__stats__content__element__line">
                                                    <div className="anmeldelser__header__stats__content__element__line__active" style={{width: freelancer.freelanceInformation.freelance__reviews.reviews__4star / freelancer.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                                </div>
                                                <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{freelancer.freelanceInformation.freelance__reviews.reviews__4star / freelancer.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                            </div>
                                            <div className="anmeldelser__header__stats__content__element">
                                                <p className="anmeldelser__header__stats__content__element__p">3 stjerner</p>
                                                <div className="anmeldelser__header__stats__content__element__line">
                                                    <div className="anmeldelser__header__stats__content__element__line__active" style={{width: freelancer.freelanceInformation.freelance__reviews.reviews__3star / freelancer.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                                </div>
                                                <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{freelancer.freelanceInformation.freelance__reviews.reviews__3star / freelancer.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                            </div>
                                            <div className="anmeldelser__header__stats__content__element">
                                                <p className="anmeldelser__header__stats__content__element__p">2 stjerner</p>
                                                <div className="anmeldelser__header__stats__content__element__line">
                                                    <div className="anmeldelser__header__stats__content__element__line__active" style={{width: freelancer.freelanceInformation.freelance__reviews.reviews__2star / freelancer.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                                </div>
                                                <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{freelancer.freelanceInformation.freelance__reviews.reviews__2star / freelancer.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                            </div>
                                            <div className="anmeldelser__header__stats__content__element">
                                                <p className="anmeldelser__header__stats__content__element__p">1 stjerne</p>
                                                <div className="anmeldelser__header__stats__content__element__line">
                                                    <div className="anmeldelser__header__stats__content__element__line__active" style={{width: freelancer.freelanceInformation.freelance__reviews.reviews__1star / freelancer.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                                </div>
                                                <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{freelancer.freelanceInformation.freelance__reviews.reviews__1star / freelancer.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="abonnement__cards__container">
                                {freelancer.freelanceInformation.freelance__pricing.pricing__packages.map((pricePackage, pricePackageIndex) => {
                                    return (<li key={"package-" + pricePackageIndex} className="opretkonto__priser__element">
                                        <p className="opretkonto__priser__element__h1">{pricePackage.package__name}</p>
                                        <p className="opretkonto__priser__element__h2">Denne pakke tilbydes af {freelancer.userInformation.user__name}</p>
                                        <div className="opretkonto__priser__element__price">
                                            <p className="opretkonto__priser__element__price__h1">DKK</p>
                                            <p className="opretkonto__priser__element__price__input">{pricePackage.package__price}</p>
                                        </div>
                                        <div className="question__cta__container">
                                            <button className="abonnement__cta__btn__outline" onClick={() => {}}>
                                                Vælg pakke
                                                <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                                                    <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="welcome__selection__container">
                                            <p className="logind__form__element__heading">Inkluderet</p>
                                            <div className="welcome__dropdown__element__container">
                                                <ul className="welcome__list__ul">
                                                    {pricePackage.package__includes.map((inkluderet, inkluderetIndex) => {
                                                        return (<li key={"inkluderet-" + inkluderetIndex} className="welcome__list__li">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="welcome__list__li__svg">
                                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                                            </svg>
                                                            <p className="welcome__list__li__p">{inkluderet}</p>
                                                        </li>)
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </li>)
                                })}
                            </div>
                        </div>
                        <div className="profil__sidebar__container">
                            <div className="freelancer__sidebar__container">
                                <div className="freelancer__sidebar__banner">
                                    <div className="freelancer__sidebar__banner__profilepicture">
                                        <img className="freelancer__sidebar__banner__profilepicture__image" src={freelancer.userInformation.user__picture.picture__url} alt="" />
                                    </div>
                                </div>
                                <div className="freelancer__sidebar__info__container">
                                    <div className="freelance__sidebar__tags__wrapper">
                                        {freelancer.freelanceInformation.freelance__profile.profile__tags.map((tag) => {
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
                                                    <p className="profil__tag__popup__p">{freelancer.userInformation.user__name} {tag.tag__description}</p>
                                                </div>
                                            </div>)
                                        })}
                                    </div>
                                    <div className="freelancer__sidebar__info__hero">
                                        <p className="freelancer__sidebar__info__hero__heading">{freelancer.userInformation.user__name}</p>
                                        <p className="freelancer__sidebar__info__hero__location">{freelancer.userInformation.user__location} &#183; {freelancer.freelanceInformation.freelance__profile.profile__type}</p>
                                        <p className="freelancer__sidebar__info__hero__oneliner">{freelancer.freelanceInformation.freelance__profile.profile__about}</p>
                                    </div>
                                    <div className="freelancer__sidebar__info__highlights">
                                        <div className="freelancer__sidebar__info__highlights__element">
                                            <div className="freelancer__sidebar__info__highlights__element__main">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="freelancer__sidebar__info__highlights__element__main__icon" viewBox="0 0 24 24">
                                                    <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,21a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Z"/><path d="M10.5,11.055l-2.4,1.5a1.5,1.5,0,0,0-.475,2.068h0a1.5,1.5,0,0,0,2.068.475l2.869-1.8a2,2,0,0,0,.938-1.7V7.772a1.5,1.5,0,0,0-1.5-1.5h0a1.5,1.5,0,0,0-1.5,1.5Z"/>
                                                </svg>
                                                <p className="freelancer__sidebar__info__highlights__element__main__p">5 min</p>
                                            </div>
                                            <p className="freelancer__sidebar__info__highlights__element__p">Gns. svartid</p>
                                        </div>
                                        <div className="freelancer__sidebar__info__highlights__element freelancer__sidebar__info__highlights__element__middle">
                                            <div className="freelancer__sidebar__info__highlights__element__main">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="freelancer__sidebar__info__highlights__element__main__icon" viewBox="0 0 24 24">
                                                    <path d="M21.557,7.153L15.318,.964C14.547,.232,13.5-.105,12.447,.03L5.821,.905c-.821,.109-1.399,.862-1.291,1.684,.108,.822,.867,1.402,1.684,1.291l6.626-.875c.15-.02,.301,.028,.388,.112l6.201,6.152c.757,.773,.756,2.03,.007,2.793l-.512,.512c-.113-.145-.236-.285-.367-.419l-6.238-6.189c-.771-.732-1.819-1.07-2.871-.935l-6.626,.875c-.701,.093-1.242,.663-1.299,1.368l-.511,6.396c-.086,1.059,.307,2.086,1.054,2.795l6.086,6.035c.947,.967,2.214,1.5,3.567,1.501h.005c1.352,0,2.617-.53,3.564-1.494l3.278-3.333c.927-.944,1.401-2.178,1.421-3.421l1.579-1.579c1.896-1.929,1.898-5.072-.01-7.02Zm-5.13,9.917l-3.277,3.333c-.379,.386-.887,.598-1.428,.598-.542,0-1.049-.214-1.442-.616l-6.124-6.072c-.109-.104-.166-.25-.153-.402l.414-5.189,5.424-.716c.148-.024,.301,.028,.388,.112l6.201,6.152c.757,.773,.756,2.03-.002,2.802Zm-7.427-5.57c-.034,1.972-2.967,1.971-3,0,.034-1.972,2.967-1.971,3,0Z"/>
                                                </svg>
                                                <p className="freelancer__sidebar__info__highlights__element__main__p">6500 kr.</p>
                                            </div>
                                            <p className="freelancer__sidebar__info__highlights__element__p">Gns. pris</p>
                                        </div>
                                        <div className="freelancer__sidebar__info__highlights__element">
                                            <div className="freelancer__sidebar__info__highlights__element__main">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="freelancer__sidebar__info__highlights__element__main__icon" viewBox="0 0 24 24">
                                                    <path d="m20.697,14.025c-1.32-1.319-3.621-1.322-4.945-.005l-.411.404c-2.586-1.199-4.48-3.101-5.754-5.777l.388-.395c.661-.661,1.025-1.54,1.025-2.475s-.364-1.814-.986-2.436l-2.152-2.317c-1.309-1.309-3.583-1.326-4.908-.041,0,0-1.067.93-1.092.954C.662,3.138,0,4.758,0,6.5c0,7.523,9.977,17.5,17.5,17.5,1.743,0,3.363-.662,4.562-1.863.024-.024.954-1.091.954-1.091,1.323-1.367,1.309-3.557-.082-4.946l-2.237-2.074Zm.156,4.941c-.024.024-.948,1.083-.948,1.083-.629.613-1.481.95-2.405.95-5.51,0-14.5-8.101-14.5-14.5,0-.924.337-1.776.95-2.405,0,0,1.06-.924,1.084-.948.127-.128.276-.146.353-.146s.226.019.314.106l2.152,2.317c.127.128.146.276.146.354,0,.077-.019.226-.155.362l-1.108,1.126c-.418.425-.545,1.058-.323,1.61,1.694,4.221,4.632,7.153,8.732,8.719.55.21,1.169.079,1.587-.332,0,0,1.133-1.114,1.136-1.117.127-.128.276-.146.353-.146s.226.019.394.186l2.237,2.074c.195.195.195.512,0,.707Zm-6.559-14.473c-.267-.226-.364-.594-.243-.922.12-.328.432-.546.782-.546h2.501l.885-2.483c.121-.326.433-.542.781-.542s.66.216.781.542l.885,2.483h2.501c.35,0,.663.219.783.548.12.329.022.698-.246.923l-1.971,1.606.815,2.484c.112.336-.002.706-.282.922-.281.216-.667.231-.964.038l-2.295-1.495-2.257,1.51c-.14.094-.302.141-.464.141-.176,0-.352-.056-.5-.166-.283-.212-.401-.58-.295-.917l.784-2.513-1.981-1.612Z"/>
                                                </svg>
                                                <p className="freelancer__sidebar__info__highlights__element__main__p">84</p>
                                            </div>
                                            <p className="freelancer__sidebar__info__highlights__element__p">Henvendelser</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="profil__info__description__container profil__info__bulletpoints">
                                    <p className="profil__info__description__heading">Mød din freelancer</p>
                                    <p className="profil__info__description__p"><span>Lokation: </span>{freelancer.userInformation.user__location}</p>
                                    <p className="profil__info__description__p"><span>Erfaring: </span>{freelancer.freelanceInformation.freelance__erfaring.erfaring__tid}</p>
                                </div> */}
                                <div className="freelancer__sidebar__cta__container">
                                    <button className="freelancer__sidebar__cta__btn__fill" onClick={() => kontaktfreelancer()}>
                                        {loading ? <div className="loader"></div> : "Kontakt Freelancer"}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="freelancer__sidebar__cta__icon" viewBox="0 0 24 24">
                                            <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                                        </svg>
                                    </button>
                                    <button className="freelancer__sidebar__cta__btn__fill freelancer__sidebar__cta__btn__transparent">
                                        <p className="freelancer__sidebar__cta__btn__transparent__text">Sammenlign pakker</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
                {notFound && <div className="home__hero__container">
                    <div className="home__hero__indhold">
                        <h1 className="home__hero__h1"><span className="home__hero__h1__span">404</span> - Freelancer ikke fundet...</h1>
                        <p className="home__hero__p">Freelanceren du søger efter findes ikke. Prøv igen, eller kontakt os for mere information.</p>
                        <div className="home__hero__cta">
                            <div className="component__howitworks__container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                            </svg>
                            <p className="component__howitworks__p">Hvordan virker Workflow?</p>
                            </div>
                        </div>
                    </div>
                    <div className="home__hero__background">
                        <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
                    </div>
                </div>}
            </>}
        </div>
    );
}
