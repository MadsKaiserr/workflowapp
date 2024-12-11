"use client"
import Image from "next/image";
import { useEffect, useState } from 'react'
import { getUser, handleAbonnementUpdate } from "../../../lib"

import dotWave from '../../../assets/dotwave.png';

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

export default function Portfolio() {

    const [user, setUser] = useState<User | any>(null)

    async function getUserSession() {
        const userData: any = {...await getUser()}
        setUser(userData.clientUserData)
    }
    
    useEffect(() => {
        getUserSession()
    }, []);

    async function choosePakke(type: string) {
        if (type == "gratis") {
            await handleAbonnementUpdate(type, user)
        }
    }

    return (
        <div className="abonnmenet__container">
            <div className="home__hero__container">
                <div className="home__hero__indhold">
                    <h1 className="question__h1">Vælg dit foretrukne <span className="question__h1__span">Abonnement</span></h1>
                    <p className="question__p">Opret dig i dag og få de første <span className="question__p__bold">3 måneder gratis</span>.</p>
                </div>
                <div className="home__hero__background">
                    <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
                </div>
            </div>
            <div className="abonnement__cards__container">
                <li className="opretkonto__priser__element abonnement__cards__element__highlighted">
                    <p className="abonnement__cards__element__tag">Mest Populære</p>
                    <p className="opretkonto__priser__element__h1">1  måned gratis</p>
                    <p className="opretkonto__priser__element__h2">Tilføj dine priser og detaljer til din service</p>
                    <div className="opretkonto__priser__element__price">
                        <p className="opretkonto__priser__element__price__h1">GRATIS</p>
                    </div>
                    <div className="question__cta__container">
                        <button className="abonnement__cta__btn__fill" onClick={() => choosePakke("gratis")}>
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
                                <li className="welcome__list__li">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="welcome__list__li__svg">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                    </svg>
                                    <p className="welcome__list__li__p"><span>3 cases</span> i porteføljen</p>
                                </li>
                                <li className="welcome__list__li">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="welcome__list__li__svg">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                    </svg>
                                    <p className="welcome__list__li__p">10 anmeldelser</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li className="opretkonto__priser__element">
                    <p className="opretkonto__priser__element__h1">Freelance Partner</p>
                    <p className="opretkonto__priser__element__h2">Tilføj dine priser og detaljer til din service</p>
                    <div className="opretkonto__priser__element__price">
                        <p className="opretkonto__priser__element__price__h1">DKK</p>
                        <p className="opretkonto__priser__element__price__input">89</p>
                    </div>
                    <div className="question__cta__container">
                        <button className="abonnement__cta__btn__outline" onClick={() => choosePakke("partner")}>
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
                                <li className="welcome__list__li">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="welcome__list__li__svg">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                    </svg>
                                    <p className="welcome__list__li__p"><span>5 cases</span> i porteføljen</p>
                                </li>
                                <li className="welcome__list__li">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="welcome__list__li__svg">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                    </svg>
                                    <p className="welcome__list__li__p">50 anmeldelser</p>
                                </li>
                                <li className="welcome__list__li">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="welcome__list__li__svg">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                    </svg>
                                    <p className="welcome__list__li__p">Effektivitetsanalyse</p>
                                </li>
                                <li className="welcome__list__li">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="welcome__list__li__svg">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                    </svg>
                                    <p className="welcome__list__li__p">Fremhævet i søgeresultaterne</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </div>
        </div>
    );
}