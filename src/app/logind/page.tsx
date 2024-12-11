import Image from "next/image";
import type { Metadata } from 'next'
import Form from "./components/form"

import dotWave from '../assets/dotwave.png';

export const metadata: Metadata = {
    title: 'Log ind » Workflow',
    description: '...',
}

export default function Logind() {

    return (
        <main className="logind__container">
            <div className="home__hero__indhold">
                <h1 className="home__hero__h1">Velkommen tilbage</h1>
                <p className="home__hero__p">Log ind på din profil nedenfor</p>
                <Form />
            </div>
            <div className="logind__container__background">
                <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
            </div>
        </main>
    );
}