import Link from "next/link";
import Kategoriermain from './header/kategoriermain';
import Image from "next/image";
import { getSession } from "../lib"
import Profil from "./header/profil"

import Logo from '../assets/workflowlogo.png';

export default async function Header() {
    const session = await getSession()

    const userType = "freelancer"

    let sted = ""
    sted = "test"

    return (
        <div className="header__main">
            <div className="header__main__dropable">
                <div className="header__main__padding">
                    <div className="header__container">
                        <div className="header__navigation">
                            <Link href="/" className="header__logo__container">
                                <Image src={Logo} width={100} alt="" />
                                <div className="header__logo__container__status">Beta</div>
                            </Link>
                            {sted == "/dashboard" && userType == "freelancer" ? <div className="header__navigation__nav">
                                <Link href="/dashboard" className="header__navigation__nav__a">Dashboard</Link>
                                <div className="header__navigation__nav__element">
                                    <Link href="/freelance-kategorier" className="header__navigation__nav__a">
                                        Min profil
                                        <svg xmlns="http://www.w3.org/2000/svg" className="header__navigation__nav__a__icon" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </Link>
                                    <div className="header__navigation__nav__element__dropdown">
                                        <div className="header__dropdown__indhold">
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Ordrer</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="/freelance-kategorier/webbureau" className="footer__navigation__element__indhold__link">Ufuldførte henvendelser</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Alle henvendelser</Link>
                                                </div>
                                            </div>
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Min profil</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="" className="footer__navigation__element__indhold__link">Rediger profil</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Indstillinger</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Anmeldelser</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Sponsoreret indhold</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="header__navigation__nav__element">
                                    <Link href="/info/hvad-er-workflow" className="header__navigation__nav__a">
                                        Analytics
                                        <svg xmlns="http://www.w3.org/2000/svg" className="header__navigation__nav__a__icon" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </Link>
                                    <div className="header__navigation__nav__element__dropdown">
                                        <div className="header__dropdown__indhold">
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Profil</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="/info/hvad-er-workflow" className="footer__navigation__element__indhold__link">Effektivitet</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Konvertering</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Sponsoreret indhold</Link>
                                                </div>
                                            </div>
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Salg</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="" className="footer__navigation__element__indhold__link">Henvendelser</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Ordrer</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Fakturaer</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : <div className="header__navigation__nav">
                                <div className="header__navigation__nav__element">
                                    <Link href="/freelance-kategorier" className="header__navigation__nav__a">
                                        Find freelancer
                                        <svg xmlns="http://www.w3.org/2000/svg" className="header__navigation__nav__a__icon" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </Link>
                                    <div className="header__navigation__nav__element__dropdown">
                                        <div className="header__dropdown__indhold">
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Populære kategorier</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="/freelance-kategorier/webbureau" className="footer__navigation__element__indhold__link">Webbureau</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Marketing</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Transport</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Reklame</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Dronefoto</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Google SEO</Link>
                                                </div>
                                            </div>
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Søg efter</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="" className="footer__navigation__element__indhold__link">Højest ratede</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Verificerede</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Flest anmeldelser</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Billigste</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Flest kunder</Link>
                                                </div>
                                            </div>
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Workflow anbefaler</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="" className="footer__navigation__element__indhold__link">Handpicks</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Upcoming</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Værd at se</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Partnere</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/bliv-partner" className="header__navigation__nav__a">Bliv freelancer</Link>
                                <div className="header__navigation__nav__element">
                                    <Link href="/info/hvad-er-workflow" className="header__navigation__nav__a">
                                        Hvad er Workflow?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="header__navigation__nav__a__icon" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </Link>
                                    <div className="header__navigation__nav__element__dropdown">
                                        <div className="header__dropdown__indhold">
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Om Workflow</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="/info/hvad-er-workflow" className="footer__navigation__element__indhold__link">Hvad er Workflow?</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Vores vision</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Hvem står bag Workflow?</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Karriere</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Kontakt os</Link>
                                                </div>
                                            </div>
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Juridisk</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="" className="footer__navigation__element__indhold__link">Privatlivspolitik</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Betingelser</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Cookiepolitik</Link>
                                                    <Link href="" className="footer__navigation__element__indhold__link">Hvem står til ansvar?</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        {!session && <div className="header__cta__container">
                            <Link href="/logind" className="header__cta__btn__transparent">Log ind</Link>
                            <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__icon" viewBox="0 0 24 24">
                                <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm8.647,7H17.426a19.676,19.676,0,0,0-2.821-4.644A10.031,10.031,0,0,1,20.647,7ZM16.5,12a10.211,10.211,0,0,1-.476,3H7.976A10.211,10.211,0,0,1,7.5,12a10.211,10.211,0,0,1,.476-3h8.048A10.211,10.211,0,0,1,16.5,12ZM8.778,17h6.444A19.614,19.614,0,0,1,12,21.588,19.57,19.57,0,0,1,8.778,17Zm0-10A19.614,19.614,0,0,1,12,2.412,19.57,19.57,0,0,1,15.222,7ZM9.4,2.356A19.676,19.676,0,0,0,6.574,7H3.353A10.031,10.031,0,0,1,9.4,2.356ZM2.461,9H5.9a12.016,12.016,0,0,0-.4,3,12.016,12.016,0,0,0,.4,3H2.461a9.992,9.992,0,0,1,0-6Zm.892,8H6.574A19.676,19.676,0,0,0,9.4,21.644,10.031,10.031,0,0,1,3.353,17Zm11.252,4.644A19.676,19.676,0,0,0,17.426,17h3.221A10.031,10.031,0,0,1,14.605,21.644ZM21.539,15H18.1a12.016,12.016,0,0,0,.4-3,12.016,12.016,0,0,0-.4-3h3.437a9.992,9.992,0,0,1,0,6Z"/>
                            </svg>
                            <Link href="/opretkonto" className="header__cta__btn__fill">Opret konto</Link>
                        </div>}
                        {session && <div className="header__cta__container">
                            {/* {error !== "" && <div className="component__error__container">
                                <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                                    <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
                                </svg>
                                <p className="component__howitworks__p">{ error }</p>
                            </div>} */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__icon" viewBox="0 0 24 24">
                                <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm8.647,7H17.426a19.676,19.676,0,0,0-2.821-4.644A10.031,10.031,0,0,1,20.647,7ZM16.5,12a10.211,10.211,0,0,1-.476,3H7.976A10.211,10.211,0,0,1,7.5,12a10.211,10.211,0,0,1,.476-3h8.048A10.211,10.211,0,0,1,16.5,12ZM8.778,17h6.444A19.614,19.614,0,0,1,12,21.588,19.57,19.57,0,0,1,8.778,17Zm0-10A19.614,19.614,0,0,1,12,2.412,19.57,19.57,0,0,1,15.222,7ZM9.4,2.356A19.676,19.676,0,0,0,6.574,7H3.353A10.031,10.031,0,0,1,9.4,2.356ZM2.461,9H5.9a12.016,12.016,0,0,0-.4,3,12.016,12.016,0,0,0,.4,3H2.461a9.992,9.992,0,0,1,0-6Zm.892,8H6.574A19.676,19.676,0,0,0,9.4,21.644,10.031,10.031,0,0,1,3.353,17Zm11.252,4.644A19.676,19.676,0,0,0,17.426,17h3.221A10.031,10.031,0,0,1,14.605,21.644ZM21.539,15H18.1a12.016,12.016,0,0,0,.4-3,12.016,12.016,0,0,0-.4-3h3.437a9.992,9.992,0,0,1,0,6Z"/>
                            </svg>
                            {/* <div className="header__cta__profil__container">
                                {showProfileDropdown && <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__profil__menu" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>}
                                {!showProfileDropdown && <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__profil__menu" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                                </svg>}
                                <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__profil__image" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                                {showProfileDropdown && <div className="header__cta__profil__dropdown">
                                    <div className="header__cta__profil__dropdown__container">
                                        <Link href="/dashboard" className="header__cta__profil__dropdown__element">Dashboard</Link>
                                        <Link href="/dashboard/profil" className="header__cta__profil__dropdown__element">Profilindstillinger</Link>
                                        <p className="header__cta__profil__dropdown__element">Kontoindstillinger</p>
                                        <p className="header__cta__profil__dropdown__element">Log ud</p>
                                    </div>
                                </div>}
                            </div> */}
                            <Profil />
                        </div>}
                    </div>
                </div>
            </div>
            <Kategoriermain />
        </div>
    );
}
