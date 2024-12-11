import Image from "next/image";
import type { Metadata } from 'next'
import Form from "./components/form"

import dotWave from '../assets/dotwave.png';

export const metadata: Metadata = {
    title: 'Opret konto » Workflow',
    description: '...',
}

export default function Opretkonto() {

    return (
        <main className="logind__container">
            <div className="home__hero__indhold">
                <h1 className="underside__hero__h1">Opret profil på Workflow</h1>
                <p className="home__hero__p">Opret dig <span>gratis</span> på Workflow allerede i dag!</p>
                <Form />
            </div>
            <div className="logind__container__background">
                <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
            </div>
        </main>
    );
}