import Link from "next/link";
import Image from "next/image";

import dotWave from '../../assets/dotwave.png';
import freelancer from '../../assets/Workflow/Freelancer.jpg';
import kategori from '../../assets/Workflow/kategori.jpg';

export default function HvadErWorkflow() {

    return (
        <>
            <div className="logind__container">
                <div className="home__hero__indhold">
                    <h1 className="home__hero__h1">Hvad er <span className="home__hero__h1__span">Workflow</span>?</h1>
                    <p className="home__hero__p">Workflow forbinder danske virksomheder med de rette freelancere, så idéer kan blive til virkelighed.</p>
                </div>
                <div className="logind__container__background">
                    <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
                </div>
            </div>
            <div className="component__info__container">
                <div className="component__info__indhold">
                <p className="component__info__topline">Hvad gør vi?</p>
                <h2 className="component__info__heading">Workflow er en platform for iværksættere og freelancere</h2>
                <p className="component__info__p">Workflow hjælper både iværksættere, virksomheder og freelancere. Vi gør det muligt for iværksættere og virksomheder nemt at navigere i junglen af freelancere.</p>
                <p className="component__info__p">Vi matcher virksomheders kriterier med freelancers kompetencer og identitet, for at skabe det bedste match.</p>
                <div className="header__cta__container component__info__cta">
                    <Link href="#" className="header__cta__btn__fill component__info__btn__fill">
                        Find en freelancer
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__info__btn__icon" viewBox="0 0 24 24"><path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"></path></svg>
                    </Link>
                    <Link href="#" className="header__cta__btn__transparent"><span>Opret konto</span></Link>
                </div>
                </div>
                <div className="component__info__media">
                <Image src={kategori} alt="" className="component__info__image" />
                </div>
            </div>
            <div className="component__info__container">
                <div className="component__info__indhold">
                <p className="component__info__topline">Hvad gør vi for klienter?</p>
                <h2 className="component__info__heading">Workflow matcher dine behov med en freelancer</h2>
                <p className="component__info__p">Som klient kan du søge og filtrere i landets freelancere efter kategori, pris, erfaring, lokation, anmeldelser med mere, så du matcher med den perfekte freelancer til dine behov.</p>
                <p className="component__info__p">Tag kontakt til freelanceren, der bedst matcher dine kriterier, og indgå en aftale direkte igennem Workflow.</p>
                <div className="header__cta__container component__info__cta">
                    <Link href="/freelance-kategorier" className="header__cta__btn__fill component__info__btn__fill">
                        Find en freelancer
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__info__btn__icon" viewBox="0 0 24 24"><path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"></path></svg>
                    </Link>
                    <Link href="/opretkonto" className="header__cta__btn__transparent"><span>Opret konto</span></Link>
                </div>
                </div>
                <div className="component__info__media">
                    <Image src={kategori} alt="" className="component__info__image" />
                </div>
            </div>
            <div className="component__info__container">
                <div className="component__info__indhold">
                <p className="component__info__topline">Hvad gør vi for freelancere?</p>
                <h2 className="component__info__heading">Workflow er en salgskanal for freelancere</h2>
                <p className="component__info__p">Som freelancer booster du antallet af henvendelser du får fra potentielle kunder. Opnå mere arbejde og etabler flere samarbejder, som styrker dit image som freelancer.</p>
                <p className="component__info__p">Samtidig frigør vi det besværlige for freelancere, ved at bryde barieren for at starte som freelancer. Her kan du fokusere på dit kernearbejde, istedet for at skulle bruge tid på at skaffe logo, hjemmeside, markedsføring osv.</p>
                <div className="header__cta__container component__info__cta">
                    <Link href="/opretkonto" className="header__cta__btn__fill component__info__btn__fill">
                        Bliv freelance partner
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__info__btn__icon" viewBox="0 0 24 24"><path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"></path></svg>
                    </Link>
                    <Link href="/priser" className="header__cta__btn__transparent"><span>Se priser</span></Link>
                </div>
                </div>
                <div className="component__info__media">
                    <Image src={freelancer} alt="" className="component__info__image" />
                </div>
            </div>
        </>
    );
}
