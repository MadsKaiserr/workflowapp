"use client"
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react'
import Image from "next/image";
import { getUser, getSamtaler, sendBesked, getFreelancerInformation } from "../../lib"
import { db } from "@/app/firebase/config"
import { collection, query, where, onSnapshot } from "firebase/firestore";

import Sidebar from '../../components/sidebar';
import inboxUndraw from '../../assets/Undraws/Inbox.png';

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

export default function Samtaler() {

    /* const [loading, setLoading] = useState(false) */
    const [pageLoading, setPageLoading] = useState(true)

    const [nyBesked, setNyBesked] = useState("")
    const [samtaler, setSamtaler] = useState([])
    const [currentSamtale, setCurrentSamtale] = useState("")

    const [user, setUser] = useState<User | any>(null)

    async function getUserSession() {
        const userSession: any = {...await getUser()}
        const userData: any = {...await getFreelancerInformation(userSession.clientUserData.userInformation.user__id)}
        setUser(userData)

        const samtaleCall: any = await getSamtaler(userData.userInformation.user__id)
        if (samtaleCall) {
            setSamtaler(samtaleCall)
        }

        setPageLoading(false)
    }
    
    useEffect(() => {
        getUserSession()
    }, []);

    useEffect(() => {
        if (document.getElementById(currentSamtale)) {
            document.getElementById(currentSamtale)?.classList.add("chat__list__element__active")
        }

        getBeskedSnapshotHandler(currentSamtale)
    }, [currentSamtale])

    async function getBeskedSnapshotHandler(id: string) {
        if (id !== "") {
            const q = query(collection(db, "samtaler"), where("id", "==", id));
            onSnapshot(q, (querySnapshot) => {
                let nySamtale = {};
                const gamleSamtaler = [...samtaler]
                querySnapshot.forEach((doc) => {
                    nySamtale = doc.data()
                    nySamtale.samtale__modpart = samtaler[samtaler.findIndex(item => item.id == id)].samtale__modpart
                    gamleSamtaler[gamleSamtaler.findIndex(item => item.id == id)] = nySamtale
                })
                setSamtaler(gamleSamtaler)
            })
        }
    }

    const sendBeskedHandler = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        
        /* setLoading(true) */
        if (nyBesked !== "") {
            const currentSamtaleObject = {...samtaler[samtaler.findIndex(item => item.id == currentSamtale)]}
            const modtager = currentSamtaleObject.samtale__modpart.userInformation.user__id
            delete currentSamtaleObject.samtale__modpart

            const sendbeskedCall = await sendBesked(currentSamtaleObject, user.userInformation.user__id, modtager, nyBesked)
            if (sendbeskedCall) {
                /* setLoading(false) */
                setNyBesked("")
            } else {
                /* setLoading(false) */
            }
        }
    }

    return (
        <>
        <div className="dashboard__container">
            <Sidebar />
            {pageLoading ? <div className="loading__container">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div> : 
            <div className="dashboard__content__samtaler">
                <div className="chat__container">
                    {samtaler.length > 0 ? <div className="chat__list__container">
                        <div className="chat__list__element__filter">
                            <p className="chat__list__element__h1">Alle beskeder</p>
                        </div>
                        {samtaler.map((samtale) => {
                            let hours = new Date(samtale.samtale__data.data__created).getHours().toString()
                            let minutes = new Date(samtale.samtale__data.data__created).getMinutes().toString()
                            if (hours.length == 1) {
                                hours = "0" + hours
                            }
                            if (minutes.length == 1) {
                                minutes = "0" + minutes
                            }
                            const klokken = hours + ":" + minutes

                            let recentMessage = "Start en samtale med " + samtale.samtale__modpart.userInformation.user__name
                            if (samtale.samtale__beskeder.length >= 1) {
                                const lastBesked = samtale.samtale__beskeder.slice(-1)
                                if (lastBesked[0].metaData.data__sender == user.userInformation.user__id) {
                                    recentMessage = "Dig: " + lastBesked[0].besked
                                } else {
                                    recentMessage = lastBesked[0].besked
                                }
                            }

                            return (
                                <div key={samtale.id} id={samtale.id} className="chat__list__element" onClick={() => setCurrentSamtale(samtale.id)}>
                                    <div className="chat__list__element__profile">
                                        {samtale.samtale__modpart.userInformation.user__picture ? <>
                                            {samtale.samtale__modpart.userInformation.user__picture.picture__custom && <img src={samtale.samtale__modpart.userInformation.user__picture.picture__url} className="chat__wrapper__element__sidebar__profile__image" />}
                                        </> : samtale.samtale__modpart.userInformation.user__name.slice(0,1)}
                                    </div>
                                    <div className="chat__list__element__content">
                                        <div className="chat__list__element__content__top">
                                            <p className="chat__list__element__content__top__heading">{samtale.samtale__modpart.userInformation.user__name}</p>
                                            <p className="chat__list__element__content__top__time">{klokken}</p>
                                        </div>
                                        <p className="chat__list__element__content__p">{recentMessage}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div> : <div className="chat__list__container">
                        <div className="chat__list__container__empty">
                            <svg xmlns="http://www.w3.org/2000/svg" className="chat__list__container__empty__icon" viewBox="0 0 24 24">
                                <path d="m15,23.5c0,.276-.224.5-.5.5H4.5c-2.481,0-4.5-2.019-4.5-4.5V4.5C0,2.019,2.019,0,4.5,0h13c1.378,0,2.5,1.121,2.5,2.5v8c0,.276-.224.5-.5.5s-.5-.224-.5-.5V2.5c0-.827-.673-1.5-1.5-1.5H4.5c-1.93,0-3.5,1.57-3.5,3.5v15c0,1.93,1.57,3.5,3.5,3.5h10c.276,0,.5.224.5.5ZM6.5,7c-.276,0-.5.224-.5.5s.224.5.5.5h7c.276,0,.5-.224.5-.5s-.224-.5-.5-.5h-7Zm17.354,16.854c-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-2.853-2.853c-.77.616-1.733,1-2.793,1-2.481,0-4.5-2.019-4.5-4.5s2.019-4.5,4.5-4.5,4.5,2.019,4.5,4.5c0,1.06-.384,2.023-1,2.793l2.853,2.853c.195.195.195.512,0,.707Zm-6.354-2.854c1.93,0,3.5-1.57,3.5-3.5s-1.57-3.5-3.5-3.5-3.5,1.57-3.5,3.5,1.57,3.5,3.5,3.5Z"/>
                            </svg>
                            <p className="chat__list__container__empty__h1">Ingen samtaler</p>
                            <p className="chat__list__container__empty__p">Der kunne ikke indehentes nogen samtaler</p>
                        </div>
                    </div>}
                    {samtaler.length > 0 && samtaler[samtaler.findIndex(item => item.id == currentSamtale)] ? <div className="chat__indhold__container">
                        <div className="chat__wrapper">
                            <ul className="chat__wrapper__ul">
                                {samtaler[samtaler.findIndex(item => item.id == currentSamtale)].samtale__beskeder.length > 0 && samtaler[samtaler.findIndex(item => item.id == currentSamtale)].samtale__beskeder.map((besked: { metaData: { data__created: Key | Date | null | undefined; data__sender: any; }; besked: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => {

                                    let hours = new Date(besked.metaData.data__created).getHours().toString()
                                    let minutes = new Date(besked.metaData.data__created).getMinutes().toString()
                                    if (hours.length == 1) {
                                        hours = "0" + hours
                                    }
                                    if (minutes.length == 1) {
                                        minutes = "0" + minutes
                                    }
                                    const klokken = hours + ":" + minutes

                                    let dag = new Date(besked.metaData.data__created).getDate().toString()
                                    const month = new Date(besked.metaData.data__created)
                                    if (dag.length == 1) {
                                        dag = "0" + dag
                                    }
                                    const dato = dag + " " + month.toLocaleString('default', { month: 'short' }).replace(".", "")
                                    const year = new Date(besked.metaData.data__created).getFullYear()

                                    const samtaleId = samtaler.findIndex(item => item.id == currentSamtale)
                                    const modpartId = samtaler[samtaleId].samtale__modpart.userInformation.user__id

                                    return (
                                        <li className="chat__wrapper__element" key={besked.metaData.data__created}>
                                            <div className="chat__wrapper__element__sidebar">
                                                {besked.metaData.data__sender == modpartId ? <div className="chat__wrapper__element__sidebar__profile">
                                                    {samtaler[samtaleId].samtale__modpart.userInformation.user__picture ? <>
                                                        {samtaler[samtaleId].samtale__modpart.userInformation.user__picture.picture__custom && <img src={samtaler[samtaleId].samtale__modpart.userInformation.user__picture.picture__url} className="chat__wrapper__element__sidebar__profile__image" />}
                                                    </> : samtaler[samtaleId].samtale__modpart.userInformation.user__name.slice(0,1)}
                                                </div> : <div className="chat__wrapper__element__sidebar__profile">
                                                    {user.userInformation.user__picture ? <>
                                                        {user.userInformation.user__picture.picture__custom && <img src={user.userInformation.user__picture.picture__url} className="chat__wrapper__element__sidebar__profile__image" />}
                                                    </> : user.userInformation.user__name.slice(0,1)}
                                                </div>}
                                            </div>
                                            <div className="chat__wrapper__element__content">
                                                <div className="chat__wrapper__element__content__header">
                                                    <p className="chat__wrapper__element__content__header__heading">{besked.metaData.data__sender == samtaler[samtaler.findIndex(item => item.id == currentSamtale)].samtale__modpart.userInformation.user__id ? samtaler[samtaler.findIndex(item => item.id == currentSamtale)].samtale__modpart.userInformation.user__name : user.userInformation.user__name}</p>
                                                    <p className="chat__wrapper__element__content__header__p">{dato + ", " + year + ", " + klokken}</p>
                                                </div>
                                                <p className="chat__wrapper__element__content__p">{besked.besked}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <form className="chat__cta__container" onSubmit={sendBeskedHandler}>
                            <div className="chat__cta__input__container">
                                <div className="chat__cta__input__icons">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="chat__cta__input__icons__icon">
                                        <g id="_01_align_center" data-name="01 align center"><path d="M6.983,24.007A7,7,0,0,1,2.02,12.054l10.6-10.585a5.008,5.008,0,0,1,7.091,7.075L9.11,19.128a3.083,3.083,0,0,1-4.254,0,3,3,0,0,1,0-4.245L14.75,5.007l1.418,1.415L6.274,16.3a1,1,0,0,0,0,1.414,1.027,1.027,0,0,0,1.418,0L18.3,7.129a3.005,3.005,0,1,0-4.255-4.245L3.438,13.468a5.008,5.008,0,0,0,7.09,7.076l12.021-12,1.418,1.415-12.021,12A7,7,0,0,1,6.983,24.007Z"/></g>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="chat__cta__input__icons__icon">
                                        <path d="m19 24h-14a5.006 5.006 0 0 1 -5-5v-14a5.006 5.006 0 0 1 5-5h14a5.006 5.006 0 0 1 5 5v14a5.006 5.006 0 0 1 -5 5zm-14-22a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-14a3 3 0 0 0 -3-3zm4.342 15.005a2.368 2.368 0 0 1 -1.186-.323 2.313 2.313 0 0 1 -1.164-2.021v-5.322a2.337 2.337 0 0 1 3.5-2.029l5.278 2.635a2.336 2.336 0 0 1 .049 4.084l-5.376 2.687a2.2 2.2 0 0 1 -1.101.289zm-.025-8a.314.314 0 0 0 -.157.042.327.327 0 0 0 -.168.292v5.322a.337.337 0 0 0 .5.293l5.376-2.688a.314.314 0 0 0 .12-.266.325.325 0 0 0 -.169-.292l-5.274-2.635a.462.462 0 0 0 -.228-.068z"/>
                                    </svg>
                                </div>
                                <input className="chat__cta__input__field" placeholder="Skriv en besked ..." value={nyBesked} onChange={(e) => setNyBesked(e.target.value)} />
                                <button className="chat__cta__input__icon__button" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="chat__cta__input__icon" viewBox="0 0 24 24">
                                        <path d="m.172,3.708C-.216,2.646.076,1.47.917.713,1.756-.041,2.951-.211,3.965.282l18.09,8.444c.97.454,1.664,1.283,1.945,2.273H4.048L.229,3.835c-.021-.041-.04-.084-.057-.127Zm3.89,9.292L.309,20.175c-.021.04-.039.08-.054.122-.387,1.063-.092,2.237.749,2.993.521.467,1.179.708,1.841.708.409,0,.819-.092,1.201-.279l18.011-8.438c.973-.456,1.666-1.288,1.945-2.28H4.062Z"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div> : <div className="chat__indhold__container">
                        <div className="chat__indhold__container__empty">
                            <Image src={inboxUndraw} alt="" height={170} className="chat__indhold__container__empty__svg" />
                            <p className="chat__list__container__empty__h1">Vælg en samtale i sidemenuen</p>
                            <p className="chat__list__container__empty__p">Hvis du ikke har startet en samtale endnu, så find en freelancer, og tryk på kontakt-knappen.</p>
                        </div>
                    </div>}
                </div>
            </div>}
        </div>
        </>
    );
}
