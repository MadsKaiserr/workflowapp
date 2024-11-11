"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react'

import dotWave from '../assets/dotwave.png';
import dotWaveGreen from '../assets/dotwavegreen.png';
import stripe from '../assets/stripe.png';

export default function Home() {

    const [type, setType] = useState("årligt");

    return (
        <>
        <div className="priser__hero__container">
            <div className="priser__hero__indhold">
            <h1 className="home__hero__h1">Tjen penge på dit <span className="home__hero__h1__span">freelance</span> arbejde</h1>
            <p className="home__hero__p">Som partner kan du tilbyde dine services for hele Danmark, og gøre din drøm om at yde freelancearbejde til en realitet.</p>
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
        </div>
        <div className="component__info__container">
            <div className="component__info__indhold">
            <p className="component__info__topline">For freelancere</p>
            <h2 className="component__info__heading">Hvad kan jeg med en partnerkonto?</h2>
            <p className="component__info__p">Hvis du opretter en partnerkonto, kan du få din egen personlige side på Workflow. Upload din portefølje, angiv dine priser, kompetencer og erfaring. Sværere behøver det ikke at være.</p>
            <p className="component__info__p">Du kan enten vente på, at blive fundet af klienter, som har behov for dine kompetencer, eller udforsk et hav af projekter, og byd ind på dem, som du matcher kompetencerne til.</p>
            <div className="header__cta__container component__info__cta">
                <Link href="/opretkonto" className="header__cta__btn__fill component__info__btn__fill">Bliv freelance partner</Link>
                <Link href="/priser" className="header__cta__btn__transparent">Se priser</Link>
            </div>
            </div>
            <div className="component__info__media">
            <Image src={stripe} alt="" className="component__info__image" />
            </div>
        </div>
        <div className="type__container">
            {type == "årligt" ? <div className="type__wrapper">
            <p className="type__wrapper__element type__wrapper__element__active">Årligt</p>
            <p className="type__wrapper__element" onClick={() => setType("månedligt")}>Månedligt</p>
            </div> : <div className="type__wrapper">
            <p className="type__wrapper__element" onClick={() => setType("årligt")}>Årligt</p>
            <p className="type__wrapper__element type__wrapper__element__active">Månedligt</p>
            </div>}
        </div>
        <div className="priser__wrapper">
            <div className="priser__wrapper__indhold">
                <div className="priser__wrapper__indhold__element priser__wrapper__indhold__heading priser__wrapper__indhold__heading__nonfixed">
                    <div className="priser__wrapper__indhold__element__section">
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <div className="priser__wrapper__indhold__element__section__header">
                            <p className="priser__wrapper__indhold__element__section__header__tagline">Bliv Workflow Freelance Partner</p>
                            <div className="priser__wrapper__indhold__element__section__header__price">
                                <p className="priser__wrapper__indhold__element__section__header__heading">{type == "årligt" ? "89" : "169"}</p>
                                <p className="priser__wrapper__indhold__element__section__header__info">kr./måned</p>
                            </div>
                            <div className="priser__wrapper__indhold__element__section__header__background">
                                <Image src={dotWaveGreen} className="priser__wrapper__indhold__element__section__header__background__image" alt="" width={1200} />
                            </div>
                        </div>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <div className="priser__wrapper__indhold__element__section__header priser__wrapper__indhold__element__section__header__secondary">
                            <p className="priser__wrapper__indhold__element__section__header__tagline">Workflow Enterprise Partner</p>
                            <div className="priser__wrapper__indhold__element__section__header__price">
                                <p className="priser__wrapper__indhold__element__section__header__heading">{type == "årligt" ? "329" : "489"}</p>
                                <p className="priser__wrapper__indhold__element__section__header__info">kr./måned</p>
                            </div>
                            <div className="priser__wrapper__indhold__element__section__header__background">
                                <Image src={dotWave} className="priser__wrapper__indhold__element__section__header__background__image" alt="" width={1200} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="priser__wrapper__indhold__element priser__wrapper__indhold__heading">
                    <div className="priser__wrapper__indhold__element__section">
                        <p className="priser__wrapper__indhold__element__section__p">Inkluderede funktioner i pakkerne</p>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                    </div>
                </div>
                <div className="priser__wrapper__indhold__element">
                    <div className="priser__wrapper__indhold__element__section">
                        <p className="priser__wrapper__indhold__element__section__p">Antal medarbejderprofiler</p>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <p className="priser__wrapper__indhold__element__section__p">1 inkluderet</p>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <p className="priser__wrapper__indhold__element__section__p">5 inkluderet</p>
                    </div>
                </div>
                <div className="priser__wrapper__indhold__element">
                    <div className="priser__wrapper__indhold__element__section">
                        <p className="priser__wrapper__indhold__element__section__p">Effektivitetsanalyse</p>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                        </svg>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                        </svg>
                    </div>
                </div>
                <div className="priser__wrapper__indhold__element">
                    <div className="priser__wrapper__indhold__element__section">
                        <p className="priser__wrapper__indhold__element__section__p">Upload min portefølje</p>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                        </svg>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                        </svg>
                    </div>
                </div>
                <div className="priser__wrapper__indhold__element">
                    <div className="priser__wrapper__indhold__element__section">
                        <p className="priser__wrapper__indhold__element__section__p">Fremhævet i søgeresultaterne</p>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon component__slider__element__indhold__li__icon__off" viewBox="0 0 16 16">
                            <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"/>
                        </svg>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                        </svg>
                    </div>
                </div>
                <div className="priser__wrapper__indhold__element">
                    <div className="priser__wrapper__indhold__element__section">
                        <p className="priser__wrapper__indhold__element__section__p">Enterprise troværdighedsbadge</p>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon component__slider__element__indhold__li__icon__off" viewBox="0 0 16 16">
                            <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"/>
                        </svg>
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                        </svg>
                    </div>
                </div>
                <div className="priser__wrapper__indhold__element priser__wrapper__indhold__heading">
                    <div className="priser__wrapper__indhold__element__section">
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                    </div>
                    <div className="priser__wrapper__indhold__element__section__center">
                    </div>
                </div>
            </div>
        </div>
        <div className="component__info__container">
            <div className="component__info__indhold">
            <p className="component__info__topline">For freelancere</p>
            <h2 className="component__info__heading">Hvorfor skal jeg købe et abonnement?</h2>
            <p className="component__info__p">Ved at blive Freelance Partner på Workflow, kan du bruge platformen som en markedsføringskanal. Din profil vil blive vist i søgeresultaterne, når folk søger i den branche.</p>
            <p className="component__info__p">Du bliver kun eksponeret for folk, som er i købefasen, og er klar til at hyre en freelancer med netop dine kompetencer.</p>
            <p className="component__info__p">Samtidig kan du altid finde projekter, som du kan byde ind på, hvis du i en periode får færre henvendelser.</p>
            <div className="header__cta__container component__info__cta">
                <Link href="/opretkonto" className="header__cta__btn__fill component__info__btn__fill">Opret Partner konto</Link>
                <Link href="/priser" className="header__cta__btn__transparent">Se priser</Link>
            </div>
            </div>
            <div className="component__info__media">
            <Image src={stripe} alt="" className="component__info__image" />
            </div>
        </div>
        </>
    );
}
