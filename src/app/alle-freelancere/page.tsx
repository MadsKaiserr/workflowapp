"use client"
/* import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { auth, db } from "@/app/firebase/config"
import { getDocs, doc, query, collection, where } from "firebase/firestore";

import dotWave from '../assets/dotwave.png';
import profilBillede from '../assets/madskaiser.jpg'; */

export default function AlleFreelancere() {
    /* const searchParams  = useSearchParams() */

    /* const [freelancers, setFreelancers] = useState([])

    useEffect(() => {
        const getFreelancers = async () => {
            const q = query(collection(db, "users"), where("accountInformation.account__type", "==", "freelancer"));
            const querySnapshot = await getDocs(q);

            const freelancersArray = []
            querySnapshot.forEach((doc) => {
                const freelancerData = {...doc.data()}
                freelancersArray.push(freelancerData)
            });
            setFreelancers(freelancersArray)
        }
        getFreelancers()
        console.log(searchParams.get("kategori"))
    }, []) */

    return (
        <>
        {/* <div className="priser__hero__container">
            <div className="priser__hero__indhold">
            <h1 className="home__hero__h1">Find din freelancer i <span className="home__hero__h1__span">alle freelancere</span> hos Workflow</h1>
            <p className="home__hero__p">Workflow forbinder danske virksomheder med de perfekte freelancere, så idéer kan blive til virkelighed.</p>
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
        <div className="salecard__container">
            {freelancers.length >= 1 ? <div className="salecard__section">
                {freelancers.map((freelancer) => {
                    return (
                        <Link href={"/freelancer/" + freelancer.freelanceInformation.freelance__url} className="salecard__section__element" key={freelancer.userInformation.user__email}>
                            <div className="salecard__element__image__container"></div>
                            <div className="salecard__element__indhold">
                                <div className="salecard__element__indhold__seller">
                                    <div className="salecard__element__indhold__seller__image">
                                        <Image className="salecard__element__indhold__seller__image__pic" src={profilBillede} alt="" />
                                    </div>
                                    <div className="salecard__element__indhold__seller__indhold">
                                        <p className="salecard__element__indhold__seller__heading">{freelancer.userInformation.user__fullname}</p>
                                        <p className="salecard__element__indhold__seller__p">{freelancer.freelanceInformation.freelance__branche}</p>
                                    </div>
                                </div>
                                <p className="salecard__element__indhold__heading">{freelancer.freelanceInformation.freelance__overskrift}</p>
                                <p className="salecard__element__indhold__p">Ekspert - Fast pris - Est. budget: 8000 kr.</p>
                                <div className="salecard__element__indhold__tags__container">
                                    <div className="salecard__element__indhold__tags__element">Webdesign</div>
                                    <div className="salecard__element__indhold__tags__element">Grafisk design</div>
                                    <div className="salecard__element__indhold__tags__element">Shopify</div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div> : <div className="salecard__section">
                Der blev ikke fundet nogen freelancere, der matcher dine søgeresultater
            </div>}
        </div> */}
        </>
    );
}
