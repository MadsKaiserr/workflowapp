"use client"
/* import { useState, useEffect } from 'react'
import { db } from "@/app/firebase/config"
import { collection, query, where, setDoc, doc, getDocs } from "firebase/firestore"; */

import Sidebar from '../../components/sidebar';

export default function Samtaler() {

    /* const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [nyBesked, setNyBesked] = useState("")
    const [samtaler, setSamtaler] = useState([])
    const [currentSamtale, setCurrentSamtale] = useState("") */

    /* useEffect(() => {
        if (document.getElementById(currentSamtale)) {
            document.getElementById(currentSamtale)?.classList.add("chat__list__element__active")
        }
    }, [currentSamtale]) */

    /* function sendBesked() {
        setLoading(true)
        if (nyBesked !== "") {
            const beskedDBUpdate = async () => {
                const updateSamtaleMap = samtaler[samtaler.findIndex(item => item.id == currentSamtale)]
                let samtaleModtager = samtaler[samtaler.findIndex(item => item.id == currentSamtale)].samtale__medlemmer[0]
                if (samtaleModtager == email) {
                    samtaleModtager = samtaler[samtaler.findIndex(item => item.id == currentSamtale)].samtale__medlemmer[1]
                }

                updateSamtaleMap.samtale__beskeder.push({
                    besked: nyBesked,
                    metaData: {
                        data__created: new Date().getTime(),
                        data__sender: email,
                        data__modtager: samtaleModtager
                    }
                })
                await setDoc(doc(db, "samtaler", currentSamtale), updateSamtaleMap)

                console.log("Besked sendt")
                setLoading(false)
                setNyBesked("")
            }
            beskedDBUpdate()
        }
    } */


        /* const q = query(collection(db, "samtaler"), where("testid", "==", "testtrue"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const beskeder = [];
            querySnapshot.forEach((doc) => {
                const documentJSON = {...doc.data()}
                documentJSON.id = doc.id
                beskeder.push(documentJSON);
            });
            console.log("Alle beskeder", beskeder)
            setBeskederData(beskeder)
        }); */

    /* useEffect(() => {
        setEmail(JSON.parse(localStorage.getItem("user")).userInformation.user__email)

        const emailData = JSON.parse(localStorage.getItem("user")).userInformation.user__email

        const getSamtaler = async () => {
            const q = query(collection(db, "samtaler"), where("samtale__medlemmer", "array-contains", emailData));
            const querySnapshot = await getDocs(q);

            const samtaleArray = []
            querySnapshot.forEach((doc) => {
                const samtaleData = {...doc.data()}
                samtaleData.id = doc.id
                samtaleArray.push(samtaleData)
            });
            setSamtaler(samtaleArray)
        }
        getSamtaler()
    }, [] ) */

    return (
        <>
        <div className="dashboard__container">
            <Sidebar />
            <div className="dashboard__content">
                <div className="dashboard__content__header">
                    <div className="dashboard__content__header__indhold">
                    <p className="dashboard__content__heading">Samtaler</p>
                    <p className="dashboard__content__p">Administrer dine samtaler fra potentielle kunder</p>
                    </div>
                </div>
                {/* <div className="chat__container">
                    <div className="chat__list__container">
                        {samtaler.map((samtale) => {
                            return (
                                <div key={samtale.id} id={samtale.id} className="chat__list__element" onClick={() => setCurrentSamtale(samtale.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="chat__list__element__profile" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                    </svg>
                                    <div className="chat__list__element__content">
                                        <div className="chat__list__element__content__top">
                                            <p className="chat__list__element__content__top__heading">{samtale.samtale__medlemmer[0] == email ? samtale.samtale__medlemmer[1] : samtale.samtale__medlemmer[0]}</p>
                                            <p className="chat__list__element__content__top__time">{new Date(samtale.samtale__data.data__created).getHours() + ":" + new Date(samtale.samtale__data.data__created).getMinutes()}</p>
                                        </div>
                                        <p className="chat__list__element__content__p">Fik du fikset det sidste inden vi går videre?</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="chat__indhold__container">
                        <div className="chat__wrapper">
                            <ul className="chat__wrapper__ul">
                                {samtaler.length >= 1 && samtaler[samtaler.findIndex(item => item.id == currentSamtale)] ? samtaler[samtaler.findIndex(item => item.id == currentSamtale)].samtale__beskeder.map((besked) => {
                                    return (
                                        <li className="chat__wrapper__element" key={besked.metaData.data__created}>
                                            <div className="chat__wrapper__element__sidebar">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="chat__wrapper__element__sidebar__profile" viewBox="0 0 16 16">
                                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                                </svg>
                                            </div>
                                            <div className="chat__wrapper__element__content">
                                                <div className="chat__wrapper__element__content__header">
                                                    <p className="chat__wrapper__element__content__header__heading">{besked.metaData.data__sender}</p>
                                                    <p className="chat__wrapper__element__content__header__p">{new Date(besked.metaData.data__created).getHours() + ":" + new Date(besked.metaData.data__created).getMinutes()}</p>
                                                </div>
                                                <p className="chat__wrapper__element__content__p">{besked.besked}</p>
                                            </div>
                                        </li>
                                    );
                                }) : <>Vælg en samtale</>}
                            </ul>
                        </div>
                        <div className="chat__cta__container">
                            <input className="logind__form__element__input" placeholder="Skriv en besked" value={nyBesked} onChange={(e) => setNyBesked(e.target.value)} />
                            <button className="chat__send__btn" onClick={() => sendBesked()}>
                                {!loading && <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="chat__send__btn__icon" viewBox="0 0 16 16">
                                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                                    </svg>
                                    Send besked
                                </>}
                                {loading && <div className="loader"></div>}
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        </>
    );
}
