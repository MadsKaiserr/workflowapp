"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react'
import { getKategorier, getKollektioner } from "../assets/lister/lister";

import dotWave from '../assets/dotwave.png';

export default function Home() {

    const [kategorier] = useState(getKategorier())
    const [kollektioner] = useState(getKollektioner())

    return (
        <>
            <div className="search__hero__container">
                <div className="priser__hero__indhold">
                    <div className="search__where__container">
                        <Link href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" className="search__where__icon">
                                <path d="M22,5.724V2c0-.552-.447-1-1-1s-1,.448-1,1v2.366L14.797,.855c-1.699-1.146-3.895-1.146-5.594,0L2.203,5.579c-1.379,.931-2.203,2.48-2.203,4.145v9.276c0,2.757,2.243,5,5,5h3c.553,0,1-.448,1-1V15c0-.551,.448-1,1-1h4c.552,0,1,.449,1,1v8c0,.552,.447,1,1,1h3c2.757,0,5-2.243,5-5V9.724c0-1.581-.744-3.058-2-4Zm0,13.276c0,1.654-1.346,3-3,3h-2v-7c0-1.654-1.346-3-3-3h-4c-1.654,0-3,1.346-3,3v7h-2c-1.654,0-3-1.346-3-3V9.724c0-.999,.494-1.929,1.322-2.487L10.322,2.513c1.02-.688,2.336-.688,3.355,0l7,4.724c.828,.558,1.322,1.488,1.322,2.487v9.276Z"/>
                            </svg>
                        </Link>
                        <p className="search__where__divider">»</p>
                        <Link className="search__where__p" href="/freelance-kategorier">Freelance kategorier</Link>
                    </div>
                    <h1 className="search__hero__h1">Gennemse alle <span className="search__hero__h1__span">kategorier</span> hos Workflow</h1>
                    <p className="search__hero__p">Vælg en kategori nedenfor, for at søge i Workflows freelancere.</p>
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
            <div className="cards__container">
                {kollektioner.map((kollektion) => {
                    const kollektionKategorier = []

                    kategorier.forEach((kollektionKategori) => {
                        if (kollektionKategori.kollektioner.includes(kollektion.id)) {
                            kollektionKategorier.push(kollektionKategori)
                        }
                    })

                    return (<div key={kollektion.id} className="cards__kategori__element">
                        <h2 className="cards__heading">{kollektion.navn}</h2>
                        <div className="cards__wrapper">
                            <div className="kategorier__slider" id="kategorierSlider">
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="kategorier__slider__icon__left kategorier__slider__icon__off" viewBox="0 0 24 24">
                                        <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="kategorier__slider__icon" viewBox="0 0 24 24">
                                        <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                                    </svg>
                                </>
                            </div>
                            {kollektionKategorier.map((kategori) => {
                                return (<Link key={kategori.id} href={"/freelance-kategorier/" + kategori.navn.replace(" ", "-")} className="cards__element">
                                    <div className="cards__element__icon__container">
                                        {kategori.svg}
                                    </div>
                                    <div className="cards__element__indhold">
                                        <p className="cards__element__indhold__heading">{kategori.navn}</p>
                                    </div>
                                </Link>)
                            })}
                        </div>
                    </div>)
                })}
            </div>
        </>
    );
}
