import Link from "next/link";
import Image from "next/image";

import dotWave from '../assets/dotwave.png';
import dotWaveGreen from '../assets/dotwavegreen.png';
import stripe from '../assets/stripe.png';

export default function Home() {
  return (
    <>
      <div className="priser__hero__container">
        <div className="priser__hero__indhold">
          <h1 className="home__hero__h1">Hvad koster det at blive <span className="home__hero__h1__span">freelancer</span> hos Workflow?</h1>
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
      <div className="priser__wrapper">
        <div className="priser__wrapper__indhold">
            <div className="priser__wrapper__indhold__element priser__wrapper__indhold__heading priser__wrapper__indhold__heading__nonfixed">
                <div className="priser__wrapper__indhold__element__section">
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <div className="priser__wrapper__indhold__element__section__header">
                        <p className="priser__wrapper__indhold__element__section__header__tagline">Bliv Workflow Freelance Partner</p>
                        <div className="priser__wrapper__indhold__element__section__header__price">
                            <p className="priser__wrapper__indhold__element__section__header__heading">129</p>
                            <p className="priser__wrapper__indhold__element__section__header__info">kr./måned</p>
                        </div>
                        <div className="priser__wrapper__indhold__element__section__header__background">
                            <Image src={dotWaveGreen} className="priser__wrapper__indhold__element__section__header__background__image" alt="" width={1200} />
                        </div>
                    </div>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <div className="priser__wrapper__indhold__element__section__header priser__wrapper__indhold__element__section__header__secondary">
                        <p className="priser__wrapper__indhold__element__section__header__tagline">Workflow Partner Pro</p>
                        <div className="priser__wrapper__indhold__element__section__header__price">
                            <p className="priser__wrapper__indhold__element__section__header__heading">489</p>
                            <p className="priser__wrapper__indhold__element__section__header__info">kr./måned</p>
                        </div>
                        <div className="priser__wrapper__indhold__element__section__header__background">
                            <Image src={dotWave} className="priser__wrapper__indhold__element__section__header__background__image" alt="" width={1200} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="priser__wrapper__indhold__element priser__wrapper__indhold__heading">
                <div className="priser__wrapper__indhold__element__section">
                    <p className="priser__wrapper__indhold__element__section__p">Fremvis dit arbejde for potentielle kunder</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                </div>
            </div>
            <div className="priser__wrapper__indhold__element">
                <div className="priser__wrapper__indhold__element__section">
                    <p className="priser__wrapper__indhold__element__section__p">Antal projekter der kan uploades til profilen</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="priser__wrapper__indhold__element__section__p">10 inkluderet</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="priser__wrapper__indhold__element__section__p">25 inkluderet</p>
                </div>
            </div>
            <div className="priser__wrapper__indhold__element">
                <div className="priser__wrapper__indhold__element__section">
                    <p className="priser__wrapper__indhold__element__section__p">Bliv fremvist under flere kategorier</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <p className="priser__wrapper__indhold__element__section__p">3 kategorier</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <p className="priser__wrapper__indhold__element__section__p">8 kategorier</p>
                </div>
            </div>
            <div className="priser__wrapper__indhold__element">
                <div className="priser__wrapper__indhold__element__section">
                    <p className="priser__wrapper__indhold__element__section__p">Mulighed for at stå som sponsoreret</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <p className="priser__wrapper__indhold__element__section__p">Ja</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <p className="priser__wrapper__indhold__element__section__p">Nej</p>
                </div>
            </div>
            <div className="priser__wrapper__indhold__element">
                <div className="priser__wrapper__indhold__element__section">
                    <p className="priser__wrapper__indhold__element__section__p">Antal projekter der kan uploades til profilen</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="priser__wrapper__indhold__element__section__p">10 inkluderet</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    <p className="priser__wrapper__indhold__element__section__p">25 inkluderet</p>
                </div>
            </div>
            <div className="priser__wrapper__indhold__element">
                <div className="priser__wrapper__indhold__element__section">
                    <p className="priser__wrapper__indhold__element__section__p">Bliv fremvist under flere kategorier</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <p className="priser__wrapper__indhold__element__section__p">3 kategorier</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <p className="priser__wrapper__indhold__element__section__p">8 kategorier</p>
                </div>
            </div>
            <div className="priser__wrapper__indhold__element">
                <div className="priser__wrapper__indhold__element__section">
                    <p className="priser__wrapper__indhold__element__section__p">Mulighed for at stå som sponsoreret</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <p className="priser__wrapper__indhold__element__section__p">Ja</p>
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                    <p className="priser__wrapper__indhold__element__section__p">Nej</p>
                </div>
            </div>
            <div className="priser__wrapper__indhold__element priser__wrapper__indhold__heading">
                <div className="priser__wrapper__indhold__element__section">
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                </div>
                <div className="priser__wrapper__indhold__element__section__center">
                </div>
            </div>
        </div>
      </div>
      <div className="component__info__container">
        <div className="component__info__indhold">
          <p className="component__info__topline">For klienter</p>
          <h2 className="component__info__heading">Lad en kyndig freelancer finde dit projekt</h2>
          <p className="component__info__p">Hos Workflow kan du oprette en annonce, hvor du beskriver dit projekt, krav, behov og mangler. Du skal blot vente på, at interesserede freelancer byder på dit projekt.</p>
          <div className="header__cta__container component__info__cta">
            <Link href="#" className="header__cta__btn__fill component__info__btn__fill">Opret en projektannonce</Link>
            <Link href="#" className="header__cta__btn__transparent">Opret konto</Link>
          </div>
        </div>
        <div className="component__info__media">
          <Image src={stripe} alt="" className="component__info__image" />
        </div>
      </div>
      <div className="component__slider__container">
        <p className="component__info__topline">For klienter</p>
        <h2 className="component__info__heading">Hvordan fungerer Workflow?</h2>
        <p className="component__info__p">Workflow tilbyder en række services. Se hvordan de fungerer.</p>
        <div className="component__slider__wrapper">
          <div className="component__slider__element">
            <div className="component__slider__element__image__container"></div>
            <div className="component__slider__element__indhold">
              <p className="component__slider__element__indhold__tagline">Find freelancere</p>
              <p className="component__slider__element__indhold__heading">Filtrér i landets freelancere</p>
              <p className="component__slider__element__indhold__p">Filtrer i vores store udvalg af freelancere efter dine krav og behov</p>
              <div className="component__slider__element__indhold__ul">
                <div className="component__slider__element__indhold__li">
                  <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                  </svg>
                  <p className="component__slider__element__indhold__li__p">Minimér forvirringen og maksimér udbyttet af din søgning</p>
                </div>
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
              </div>
            </div>
          </div>
          <div className="component__slider__element">
            <div className="component__slider__element__image__container"></div>
            <div className="component__slider__element__indhold">
              <p className="component__slider__element__indhold__tagline">Find freelancere</p>
              <p className="component__slider__element__indhold__heading">Filtrér i landets freelancere</p>
              <p className="component__slider__element__indhold__p">Filtrer i vores store udvalg af freelancere efter dine krav og behov</p>
              <div className="component__slider__element__indhold__ul">
                <div className="component__slider__element__indhold__li">
                  <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                  </svg>
                  <p className="component__slider__element__indhold__li__p">Minimér forvirringen og maksimér udbyttet af din søgning</p>
                </div>
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
              </div>
            </div>
          </div>
          <div className="component__slider__element">
            <div className="component__slider__element__image__container"></div>
            <div className="component__slider__element__indhold">
              <p className="component__slider__element__indhold__tagline">Find freelancere</p>
              <p className="component__slider__element__indhold__heading">Filtrér i landets freelancere</p>
              <p className="component__slider__element__indhold__p">Filtrer i vores store udvalg af freelancere efter dine krav og behov</p>
              <div className="component__slider__element__indhold__ul">
                <div className="component__slider__element__indhold__li">
                  <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                  </svg>
                  <p className="component__slider__element__indhold__li__p">Minimér forvirringen og maksimér udbyttet af din søgning</p>
                </div>
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
              </div>
            </div>
          </div>
          <div className="component__slider__element">
            <div className="component__slider__element__image__container"></div>
            <div className="component__slider__element__indhold">
              <p className="component__slider__element__indhold__tagline">Find freelancere</p>
              <p className="component__slider__element__indhold__heading">Filtrér i landets freelancere</p>
              <p className="component__slider__element__indhold__p">Filtrer i vores store udvalg af freelancere efter dine krav og behov</p>
              <div className="component__slider__element__indhold__ul">
                <div className="component__slider__element__indhold__li">
                  <svg xmlns="http://www.w3.org/2000/svg" className="component__slider__element__indhold__li__icon" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                  </svg>
                  <p className="component__slider__element__indhold__li__p">Minimér forvirringen og maksimér udbyttet af din søgning</p>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
