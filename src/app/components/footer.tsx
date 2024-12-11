import Link from "next/link";
import Image from "next/image";

import Logo from '../assets/workflowlogo.png';

export default function Footer() {
  return (
    <footer className="footer__container">
        <div className="footer__navigation__container">
            <div className="footer__navigation__element">
                <p className="footer__navigation__element__heading">Kategorier</p>
                <div className="footer__navigation__element__indhold">
                    <Link href="" className="footer__navigation__element__indhold__link">Webbureau</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Marketing</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Transport</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Reklame</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Dronefoto</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Google SEO</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Revisor</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Mediebureau</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Advokat</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Band</Link>
                </div>
            </div>
            <div className="footer__navigation__element">
                <p className="footer__navigation__element__heading">For klienter</p>
                <div className="footer__navigation__element__indhold">
                    <Link href="" className="footer__navigation__element__indhold__link">Hvordan virker Workflow?</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Opret projektannonce</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Find freelancer</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Kvalitetstjek</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Sikkerhed</Link>
                </div>
            </div>
            <div className="footer__navigation__element">
                <p className="footer__navigation__element__heading">For freelancere</p>
                <div className="footer__navigation__element__indhold">
                    <Link href="" className="footer__navigation__element__indhold__link">Bliv freelance partner</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Verificering</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Sponsoreret</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Find projektannoncer</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Priser</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Sikkerhed</Link>
                </div>
            </div>
            <div className="footer__navigation__element">
                <p className="footer__navigation__element__heading">Om Workflow</p>
                <div className="footer__navigation__element__indhold">
                    <Link href="" className="footer__navigation__element__indhold__link">Om Workflow</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Hjælp & Support</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Karriere</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Partnerskab</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Kontakt os</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Betingelser</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Privatlivspolitik</Link>
                    <Link href="" className="footer__navigation__element__indhold__link">Cookiepolitik</Link>
                </div>
            </div>
        </div>
        <div className="footer__company__container">
            <Link href="/" className="header__logo__container">
                <Image src={Logo} width={100} alt="" />
            </Link>
            <p className="footer__logo__copyright">🇩🇰 Based in Denmark</p>
        </div>
    </footer>
  );
}
