import Link from "next/link";
import Kategoriermain from './header/kategoriermain';
import Image from "next/image";
import { getSession, getUser } from "../lib"
import Profil from "./header/profil"
import Sprog from "./header/sprog"

import Logo from '../assets/workflowlogo.png';

export default async function Header() {
    const userData = await getUser()
    const userSession = await getSession()

    let user = {}
    if (userData) {
        user = userData.clientUserData
    }

    return (
        <header className="header__main">
            <div className="header__main__dropable">
                <div className="header__main__padding">
                    <div className="header__container">
                        <div className="header__navigation">
                            <Link href="/" className="header__logo__container">
                                <Image src={Logo} width={100} alt="" />
                                <div className="header__logo__container__status">Beta</div>
                            </Link>
                            {user.accountInformation && user.accountInformation.account__type == "freelancer" ? <div className="header__navigation__nav">
                                <Link href="/dashboard/portfolio" className="header__navigation__nav__a">Min portefølje</Link>
                                <div className="header__navigation__nav__element">
                                    <Link href="/projektopslag" className="header__navigation__nav__a">
                                        Projektopslag
                                        <svg xmlns="http://www.w3.org/2000/svg" className="header__navigation__nav__a__icon" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </Link>
                                    <div className="header__navigation__nav__element__dropdown">
                                        <div className="header__dropdown__indhold">
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Projektopslag</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="/projektopslag/opret" className="footer__navigation__element__indhold__link">Opslå nyt projekt</Link>
                                                    <Link href="/projektopslag" className="footer__navigation__element__indhold__link">Søg i projekter</Link>
                                                    <Link href="/projektopslag/hvad-er-et-projekt?" className="footer__navigation__element__indhold__link">Hvad er et projekt?</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                    <Link href="/politikker/privatlivspolitik" className="footer__navigation__element__indhold__link">Privatlivspolitik</Link>
                                                    <Link href="/politikker/betingelser" className="footer__navigation__element__indhold__link">Betingelser</Link>
                                                    <Link href="/politikker/cookiepolitik" className="footer__navigation__element__indhold__link">Cookiepolitik</Link>
                                                    <Link href="/politikker/ansvar" className="footer__navigation__element__indhold__link">Hvem står til ansvar?</Link>
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
                                                <p className="footer__navigation__element__heading">Genveje</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="/freelance-kategorier" className="footer__navigation__element__indhold__link">Se alle kategorier</Link>
                                                    <Link href="#" className="footer__navigation__element__indhold__link">Hvordan virker Workflow?</Link>
                                                </div>
                                            </div>
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Populære kategorier</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="/freelance-kategorier/webbureau" className="footer__navigation__element__indhold__link">Webbureau</Link>
                                                    <Link href="/freelance-kategorier/mediebureau" className="footer__navigation__element__indhold__link">Mediebureau</Link>
                                                    <Link href="/freelance-kategorier/google-seo" className="footer__navigation__element__indhold__link">Google SEO</Link>
                                                    <Link href="/freelance-kategorier/marketing" className="footer__navigation__element__indhold__link">Marketing</Link>
                                                    <Link href="/freelance-kategorier/grafisk-designer" className="footer__navigation__element__indhold__link">Grafisk Designer</Link>
                                                    <Link href="/freelance-kategorier/ai-services" className="footer__navigation__element__indhold__link">AI Services</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="header__navigation__nav__element">
                                    <Link href="/projektopslag" className="header__navigation__nav__a">
                                        Projektopslag
                                        <svg xmlns="http://www.w3.org/2000/svg" className="header__navigation__nav__a__icon" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </Link>
                                    <div className="header__navigation__nav__element__dropdown">
                                        <div className="header__dropdown__indhold">
                                            <div className="header__dropdown__indhold__element">
                                                <p className="footer__navigation__element__heading">Projektopslag</p>
                                                <div className="footer__navigation__element__indhold">
                                                    <Link href="/projektopslag/opret" className="footer__navigation__element__indhold__link">Opslå nyt projekt</Link>
                                                    <Link href="/projektopslag" className="footer__navigation__element__indhold__link">Søg i projekter</Link>
                                                    <Link href="/projektopslag/hvad-er-et-projekt?" className="footer__navigation__element__indhold__link">Hvad er et projekt?</Link>
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
                                                    <Link href="/politikker/privatlivspolitik" className="footer__navigation__element__indhold__link">Privatlivspolitik</Link>
                                                    <Link href="/politikker/betingelser" className="footer__navigation__element__indhold__link">Betingelser</Link>
                                                    <Link href="/politikker/cookiepolitik" className="footer__navigation__element__indhold__link">Cookiepolitik</Link>
                                                    <Link href="/politikker/ansvar" className="footer__navigation__element__indhold__link">Hvem står til ansvar?</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        {!userSession && <div className="header__cta__container">
                            <Link href="/logind" className="header__cta__btn__transparent"><span>Log ind</span></Link>
                            <div className="header__cta__icons">
                                <Sprog />
                            </div>
                            <Link href="/opretkonto" className="header__cta__btn__fill">Opret konto</Link>
                        </div>}
                        {userSession && <div className="header__cta__container">
                            {/* {error !== "" && <div className="component__error__container">
                                <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                                    <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
                                </svg>
                                <p className="component__howitworks__p">{ error }</p>
                            </div>} */}
                            <div className="header__cta__icons">
                                <Link href="/dashboard/samtaler" className="header__cta__icon__button">
                                    <div className="header__cta__icon__button__notifications">2</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__icon" viewBox="0 0 24 24">
                                        <path d="m13.5,12c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm3.5-1.5c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm-10,0c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm17,1.84v6.66c0,2.757-2.243,5-5,5h-5.917C6.082,24,.47,19.208.03,12.854c-.241-3.476,1.027-6.878,3.479-9.333S9.363-.206,12.836.029c6.26.425,11.164,5.833,11.164,12.312Zm-2,0c0-5.431-4.084-9.962-9.299-10.316-.229-.016-.458-.023-.686-.023-2.656,0-5.209,1.048-7.091,2.933-2.044,2.046-3.101,4.883-2.899,7.782.373,5.38,5.024,9.285,11.059,9.285h5.917c1.654,0,3-1.346,3-3v-6.66Z"/>
                                    </svg>
                                </Link>
                                <Sprog />
                            </div>
                            <Profil user={Object.keys(user).length > 0 ? {
                                createduser: true,
                                ...user
                            } : {
                                createduser: false,
                                userInformation: {
                                    user__email: userSession.userAuth.providerData.email,
                                    user__id: userSession.userAuth.providerData.uid,
                                    user__name: userSession.userAuth.providerData.displayName
                                }
                            }} />
                        </div>}
                    </div>
                </div>
            </div>
            <Kategoriermain />
        </header>
    );
}
