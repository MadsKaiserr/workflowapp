"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

import dotWave from './assets/dotwave.png';
import stripe from './assets/stripe.png';
import productImage from './assets/productimage.png';

export default function Home() {
  const router = useRouter()

  const [type, setType] = useState("klient");
  const [searchBranche, setSearchBranche] = useState("")

  function search() {
    if (searchBranche !== "") {
      router.push("/freelance-kategorier/webbureau?kategori=" + searchBranche.toLocaleLowerCase().replace(" ", "-"))
    }
  }
  
  return (
    <>
      <div className="home__hero__container">
        <div className="home__hero__indhold">
          <h1 className="home__hero__h1">Find den <span className="home__hero__h1__span">freelancer</span>, der passer bedst til dit projekt</h1>
          <p className="home__hero__p">Workflow forbinder danske virksomheder med de rette freelancere, så idéer kan blive til virkelighed.</p>
          <form onSubmit={() => search()} className="home__hero__input__container">
            <select className="home__hero__input__select" onChange={(e) => setSearchBranche(e.target.value)}>
                <option value="">Vælg branche...</option>
                <option value="Shopify Udvikler">Shopify Udvikler</option>
                <option value="Wordpress Udvikler">Wordpress Udvikler</option>
                <option value="Webflow Udvikler">Webflow Udvikler</option>
            </select>
            <div className="home__hero__input__btn" onClick={() => search()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="home__hero__input__icon" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </div>
          </form>
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
      <div className="type__container">
        {type == "klient" && <div className="type__wrapper">
          <p className="type__wrapper__element type__wrapper__element__active">Klient</p>
          <p className="type__wrapper__element" onClick={() => setType("freelancer")}>Freelancer</p>
        </div>}
        {type == "freelancer" && <div className="type__wrapper">
          <p className="type__wrapper__element" onClick={() => setType("klient")}>Klient</p>
          <p className="type__wrapper__element type__wrapper__element__active">Freelancer</p>
        </div>}
      </div>
      {type == "klient" && <>
        <div className="component__info__container">
          <div className="component__info__indhold">
            <p className="component__info__topline">For klienter</p>
            <h2 className="component__info__heading">Filtrer i vores store udvalg af freelancere efter dine behov</h2>
            <p className="component__info__p">Workflow er for dig, som er træt af at bruge uendelige timer på at lede i junglen af freelancere. Vi gør det nemt  og hurtigt at  finde den freelancer, som matcher dine krav bedst.</p>
            <p className="component__info__p">Søg i mere end 50 kategorier, og filtrer efter lokation, erfaring, pris, anmeldelser og meget mere.</p>
            <div className="header__cta__container component__info__cta">
              <Link href="/freelance-kategorier" className="header__cta__btn__fill component__info__btn__fill">Find en freelancer</Link>
              <Link href="/opretkonto" className="header__cta__btn__transparent">Opret konto</Link>
            </div>
          </div>
          <div className="component__info__media">
            <Image src={stripe} alt="" className="component__info__image" />
          </div>
        </div>
        <div className="component__slider__container">
          <p className="component__info__topline">For klienter</p>
          <h2 className="component__info__heading">Hvordan fungerer Workflow?</h2>
          <div className="component__slider__wrapper">
            <div className="component__slider__element">
              <div className="component__slider__element__image__container"></div>
              <div className="component__slider__element__indhold">
                <p className="component__slider__element__indhold__tagline">Find freelancer</p>
                <p className="component__slider__element__indhold__heading">Filtrér i landets freelancere</p>
                <p className="component__slider__element__indhold__p">Filtrer i vores store udvalg af freelancere efter dine krav og behov</p>
                <div className="component__slider__element__indhold__ul">
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Søg i lokation, erfaring, pris, kategori, anmeldelser mm.</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Kontakt flere freelancere inden du vælger</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Gem eller del freelancere med dit team</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="component__slider__element">
              <div className="component__slider__element__image__container"></div>
              <div className="component__slider__element__indhold">
                <p className="component__slider__element__indhold__tagline">Tag kontakt</p>
                <p className="component__slider__element__indhold__heading">Kontakt den freelancer, der matcher dig</p>
                <p className="component__slider__element__indhold__p">Tag kontakt direkte fra platformen, og skriv med freelanceren</p>
                <div className="component__slider__element__indhold__ul">
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Lær freelanceren at kende inden du tager beslutningen</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Indgå en aftale direkte fra chatten</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Kontakt flere freelancere inden du vælger</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="component__slider__element">
              <div className="component__slider__element__image__container"></div>
              <div className="component__slider__element__indhold">
                <p className="component__slider__element__indhold__tagline">Opret projektannonce</p>
                <p className="component__slider__element__indhold__heading">Lad freelancere finde dit projekt</p>
                <p className="component__slider__element__indhold__p">Opret et projekt, og lad interesserede freelancere byde ind. Vælg derefter selv i udvalget</p>
                <div className="component__slider__element__indhold__ul">
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Beskriv dit projekt og dine behov</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Freelancere, der er kompitable byder selv ind</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Udvælg dit bedste match i tilbuddene</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="component__slider__element">
              <div className="component__slider__element__image__container"></div>
              <div className="component__slider__element__indhold">
                <p className="component__slider__element__indhold__tagline">Anmeld freelanceren</p>
                <p className="component__slider__element__indhold__heading">Giv freelanceren en anmeldelse</p>
                <p className="component__slider__element__indhold__p">Efter aftale og arbejde kan du anmelde din freelancer</p>
                <div className="component__slider__element__indhold__ul">
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Giv din freelancer stjerner fra 1-5</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Beskriv din oplevelse med freelanceren</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Anbefal din freelancer, så andre også kan få samme glæde</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="component__info__container">
          <div className="component__info__indhold">
            <p className="component__info__topline">For klienter</p>
            <h2 className="component__info__heading">Lad en kyndig freelancer finde dit projekt</h2>
            <p className="component__info__p">Hos Workflow kan du oprette en projektannonce, hvor du beskriver dit projekt, krav, behov og mangler.</p>
            <p className="component__info__p">Så vil freelancere, der matcher dine kriterier byde ind på projektet, og du kan derefter selv sortere og udvælge dit bedste match.</p>
            <div className="header__cta__container component__info__cta">
              <Link href="#" className="header__cta__btn__fill component__info__btn__fill">Opret en projektannonce</Link>
              <Link href="/opretkonto" className="header__cta__btn__transparent">Opret konto</Link>
            </div>
          </div>
          <div className="component__info__media">
            <Image src={stripe} alt="" className="component__info__image" />
          </div>
        </div>
      </>}
      {type == "freelancer" && <>
        <div className="component__info__container">
          <div className="component__info__indhold">
            <p className="component__info__topline">For freelancere</p>
            <h2 className="component__info__heading">Tilbyd dine services. Bliv eksponeret for specifikke grupper</h2>
            <p className="component__info__p">Workflow er for dig, som søger at drive din freelance-forretning på en nem og enkel måde.</p>
            <p className="component__info__p">Tilmeld dig og bliv eksponeret for målgrupper, der søger netop de kvalificeringer som du besidder. Upload dit arbejde, information om dine services og indsaml anmeldelser direkte fra platformen.</p>
            <div className="header__cta__container component__info__cta">
              <Link href="/bliv-partner" className="header__cta__btn__fill component__info__btn__fill">Bliv freelance partner</Link>
              <Link href="/priser" className="header__cta__btn__transparent">Se priser</Link>
            </div>
          </div>
          <div className="component__info__media">
            <Image src={stripe} alt="" className="component__info__image" />
          </div>
        </div>
        <div className="component__slider__container">
          <p className="component__info__topline">For freelancere</p>
          <h2 className="component__info__heading">Hvordan fungerer Workflow for Freelancere?</h2>
          <div className="component__slider__wrapper">
            <div className="component__slider__element">
              <div className="component__slider__element__image__container"></div>
              <div className="component__slider__element__indhold">
                <p className="component__slider__element__indhold__tagline">Opret partnerprofil</p>
                <p className="component__slider__element__indhold__heading">Udfyld din profil og branche</p>
                <p className="component__slider__element__indhold__p">Lad besøgende finde dig gennem dine kompetencer og branche</p>
                <div className="component__slider__element__indhold__ul">
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Upload dit arbejde til din portefølje</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Beskriv dine ydelser og angiv dine priser</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Øg dine eksponeringer og CTR</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="component__slider__element">
              <div className="component__slider__element__image__container"></div>
              <div className="component__slider__element__indhold">
                <p className="component__slider__element__indhold__tagline">Afvent tilbud</p>
                <p className="component__slider__element__indhold__heading">Lad interesserede finde dig i søgninger</p>
                <p className="component__slider__element__indhold__p">Interesserede brugere kan finde din profil på platformen, og tage kontakt direkte i chatten</p>
                <div className="component__slider__element__indhold__ul">
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Bliv kontaktet uopfordret af potentielle kunder</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Bliv vist i søgeresultaterne for brugere på platformen</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Chat med interesserede direkte igennem Workflow</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="component__slider__element">
              <div className="component__slider__element__image__container"></div>
              <div className="component__slider__element__indhold">
                <p className="component__slider__element__indhold__tagline">Indgå aftale</p>
                <p className="component__slider__element__indhold__heading">Filtrér i landets freelancere</p>
                <p className="component__slider__element__indhold__p">Brug chatten på platformen, til at blive enige om din konsulentydelses pris og omfang</p>
                <div className="component__slider__element__indhold__ul">
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Aftal med den interesserede om du er det rette match</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Fastlæg en pris, og hvilket arbejde der skal udføres</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Udfør dit arbejde og bliv betalt udenfor platformen</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="component__slider__element">
              <div className="component__slider__element__image__container"></div>
              <div className="component__slider__element__indhold">
                <p className="component__slider__element__indhold__tagline">Bliv anmeldt</p>
                <p className="component__slider__element__indhold__heading">Lad dine kunder vurdere dine præstationer</p>
                <p className="component__slider__element__indhold__p">Kunderne kan selv anmelde dine ydelser efter endt arbejde. Disse kan være med til at tiltrække flere interesserede</p>
                <div className="component__slider__element__indhold__ul">
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Bliv anmeldt automatisk af dine kunder</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Fremvis dine anmeldelser på din profil</p>
                  </div>
                  <div className="component__slider__element__indhold__li">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="component__slider__element__indhold__li__p">Få "Top Sælger" badget ved gentagende gode anmeldelser</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="component__info__container">
          <div className="component__info__indhold">
            <p className="component__info__topline">For freelancere</p>
            <h2 className="component__info__heading">Byd ind på projekter oprettet af klienter</h2>
            <p className="component__info__p">Iværksættere og virksomheder kan selv oprette en projektannonce hos Workflow. Her kan du som freelancere filtrere efter projekter, som matcher dine kompetencer.</p>
            <p className="component__info__p">Byd ind på projekter, og forklar, hvorfor klienten skal vælge dig. Derved opnår du mere arbejde, så du selv kan administrere mængden.</p>
            <div className="header__cta__container component__info__cta">
              <Link href="/bliv-partner" className="header__cta__btn__fill component__info__btn__fill">Bliv freelance partner</Link>
              <Link href="/priser" className="header__cta__btn__transparent">Se priser</Link>
            </div>
          </div>
          <div className="component__info__media">
            <Image src={stripe} alt="" className="component__info__image" />
          </div>
        </div>
      </>}
    </>
  );
}
