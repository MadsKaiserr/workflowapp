"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getUser } from "../lib"

type User = {
  freelanceInformation: {
      freelance__url: string;
      freelance__profile: {
        profile__branche: string;
        profile__type: string;
        profile__tags: {
          tag__id: string;
          tag_color: string;
          tag__name: string;
          tag__description: string;
        }[];
        profile__underkategori: string;
        profile__about: string;
      };
      freelance__reviews: {
        reviews__rating: number;
        reviews__5star: number;
        reviews__4star: number;
        reviews__3star: number;
        reviews__2star: number;
        reviews__1star: number;
        reviews__data: {
          review__id: number;
          review__overskrift: string;
          review__profileid: number;
          review__rating: number;
          review__text: string;
        }[];
      };
      freelance__overskrift: string;
      freelance__beskrivelse: string;
      freelance__erfaring: {
        erfaring__tid: string;
      };
      freelance__tags: string[]
  };
  userInformation: {
      user__email: string;
      user__name: string;
      user__location: string;
  };
};

export default function Dashboard() {
  const pathname = usePathname()

  const [showSalg, setShowSalg] = useState(true)
  const [navigationElement, setNavigationElement] = useState("")

  const [pageLoading, setPageLoading] = useState(true)
  const [user, setUser] = useState<User | any>(null)

  useEffect(() => {
    if (pathname.slice(-"oversigt".length) == "oversigt") {
      setNavigationElement("oversigt")
    } else if (pathname.slice(-6) == "profil") {
      setNavigationElement("profil")
    } else if (pathname.slice(-9) == "assistent") {
      setNavigationElement("assistent")
    } else if (pathname.slice(-"priser".length) == "priser") {
      setNavigationElement("priser")
    } else if (pathname.slice(-8) == "samtaler") {
      setNavigationElement("samtaler")
    } else if (pathname.slice(-5) == "konto") {
      setNavigationElement("konto")
    } else if (pathname.slice(-9) == "portfolio") {
      setNavigationElement("portfolio")
    }
  }, [])

  function showSalgClicked() {
    if (showSalg) {
      setShowSalg(false)
      document.getElementById("salgChevron")!.style.transform = "rotate(180deg)";
    } else {
      setShowSalg(true)
      document.getElementById("salgChevron")!.style.transform = "rotate(0deg)";
    }
  }

  async function getUserSession() {
    const userData: any = {...await getUser()}
    setUser(userData.clientUserData)
    setPageLoading(false)
  }

  useEffect(() => {
    getUserSession()
  }, []);

  return (
    <>
    <div className="dashboard__sidebar">
      {pageLoading ? <></> : <div className="dashboard__sidebar__container">
        <div className="dashboard__sidebar__content">
          <div className="dashboard__sidebar__nav">
            {user.accountInformation.account__type == "freelancer" ? <>
                  <Link href="/dashboard/oversigt" className={navigationElement == "oversigt" ? "dashboard__sidebar__nav__element dashboard__sidebar__nav__element__active" : "dashboard__sidebar__nav__element"}>
                    <div className="dashboard__sidebar__nav__element__info">
                        <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                        <path d="m24 23a1 1 0 0 1 -1 1h-22a1 1 0 0 1 0-2h22a1 1 0 0 1 1 1zm-23.709-14.448a2.443 2.443 0 0 1 .153-2.566 4.716 4.716 0 0 1 1.668-1.5l7.501-3.904a5.174 5.174 0 0 1 4.774 0l7.5 3.907a4.716 4.716 0 0 1 1.668 1.5 2.443 2.443 0 0 1 .153 2.566 2.713 2.713 0 0 1 -2.416 1.445h-.292v8h1a1 1 0 0 1 0 2h-20a1 1 0 0 1 0-2h1v-8h-.292a2.713 2.713 0 0 1 -2.417-1.448zm4.709 9.448h3v-8h-3zm5-8v8h4v-8zm9 0h-3v8h3zm-16.937-2.375a.717.717 0 0 0 .645.375h18.584a.717.717 0 0 0 .645-.375.452.452 0 0 0 -.024-.5 2.7 2.7 0 0 0 -.949-.864l-7.5-3.907a3.176 3.176 0 0 0 -2.926 0l-7.5 3.907a2.712 2.712 0 0 0 -.949.865.452.452 0 0 0 -.026.499z"/>
                        </svg>
                        <p className="dashboard__sidebar__nav__element__p">Oversigt</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/assistent" className={navigationElement == "assistent" ? "dashboard__sidebar__nav__element dashboard__sidebar__nav__element__active" : "dashboard__sidebar__nav__element"}>
                    <div className="dashboard__sidebar__nav__element__info">
                        <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                        <path d="M19.5,24a1,1,0,0,1-.929-.628l-.844-2.113-2.116-.891a1.007,1.007,0,0,1,.035-1.857l2.088-.791.837-2.092a1.008,1.008,0,0,1,1.858,0l.841,2.1,2.1.841a1.007,1.007,0,0,1,0,1.858l-2.1.841-.841,2.1A1,1,0,0,1,19.5,24ZM10,21a2,2,0,0,1-1.936-1.413L6.45,14.54,1.387,12.846a2.032,2.032,0,0,1,.052-3.871L6.462,7.441,8.154,2.387A1.956,1.956,0,0,1,10.108,1a2,2,0,0,1,1.917,1.439l1.532,5.015,5.03,1.61a2.042,2.042,0,0,1,0,3.872h0l-5.039,1.612-1.612,5.039A2,2,0,0,1,10,21Zm.112-17.977L8.2,8.564a1,1,0,0,1-.656.64L2.023,10.888l5.541,1.917a1,1,0,0,1,.636.643l1.77,5.53,1.83-5.53a1,1,0,0,1,.648-.648l5.53-1.769a.072.072,0,0,0,.02-.009L12.448,9.2a1,1,0,0,1-.652-.661Zm8.17,8.96h0ZM20.5,7a1,1,0,0,1-.97-.757l-.357-1.43L17.74,4.428a1,1,0,0,1,.034-1.94l1.4-.325L19.53.757a1,1,0,0,1,1.94,0l.354,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355L21.47,6.243A1,1,0,0,1,20.5,7Z"/>
                        </svg>
                        <p className="dashboard__sidebar__nav__element__p">Workflow Assistent</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/priser" className={navigationElement == "priser" ? "dashboard__sidebar__nav__element dashboard__sidebar__nav__element__active" : "dashboard__sidebar__nav__element"}>
                    <div className="dashboard__sidebar__nav__element__info">
                        <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                          <path d="M7.707,9.256c.391,.391,.391,1.024,0,1.414-.391,.391-1.024,.391-1.414,0-.391-.391-.391-1.024,0-1.414,.391-.391,1.024-.391,1.414,0Zm13.852,6.085l-.565,.565c-.027,1.233-.505,2.457-1.435,3.399l-3.167,3.208c-.943,.955-2.201,1.483-3.543,1.487h-.017c-1.335,0-2.59-.52-3.534-1.464L1.882,15.183c-.65-.649-.964-1.542-.864-2.453l.765-6.916c.051-.456,.404-.819,.858-.881l6.889-.942c.932-.124,1.87,.193,2.528,.851l7.475,7.412c.387,.387,.697,.823,.931,1.288,.812-1.166,.698-2.795-.342-3.835L12.531,2.302c-.229-.229-.545-.335-.851-.292l-6.889,.942c-.549,.074-1.052-.309-1.127-.855-.074-.547,.309-1.051,.855-1.126L11.409,.028c.921-.131,1.869,.191,2.528,.852l7.589,7.405c1.946,1.945,1.957,5.107,.032,7.057Zm-3.438-1.67l-7.475-7.412c-.223-.223-.536-.326-.847-.287l-6.115,.837-.679,6.14c-.033,.303,.071,.601,.287,.816l7.416,7.353c.569,.57,1.322,.881,2.123,.881h.01c.806-.002,1.561-.319,2.126-.893l3.167-3.208c1.155-1.17,1.149-3.067-.014-4.229Z"/>
                        </svg>
                        <p className="dashboard__sidebar__nav__element__p">Priser</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/portfolio" className={navigationElement == "portfolio" ? "dashboard__sidebar__nav__element dashboard__sidebar__nav__element__active" : "dashboard__sidebar__nav__element"}>
                    <div className="dashboard__sidebar__nav__element__info">
                        <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                          <path d="M19,3H12.472a1.019,1.019,0,0,1-.447-.1L8.869,1.316A3.014,3.014,0,0,0,7.528,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V8A5.006,5.006,0,0,0,19,3ZM5,3H7.528a1.019,1.019,0,0,1,.447.1l3.156,1.579A3.014,3.014,0,0,0,12.472,5H19a3,3,0,0,1,2.779,1.882L2,6.994V6A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V8.994l20-.113V18A3,3,0,0,1,19,21Z"/>
                        </svg>
                        <p className="dashboard__sidebar__nav__element__p">Min portefølje</p>
                    </div>
                    <div className="dashboard__sidebar__nav__element__status">4</div>
                  </Link>
                  <Link href="/dashboard/profil" className={navigationElement == "profil" ? "dashboard__sidebar__nav__element dashboard__sidebar__nav__element__active" : "dashboard__sidebar__nav__element"}>
                    <div className="dashboard__sidebar__nav__element__info">
                        <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                        <path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/>
                        </svg>
                        <p className="dashboard__sidebar__nav__element__p">Min profil</p>
                    </div>
                  </Link>
              </> : 
              <>
                  <Link href="/dashboard/samtaler" className={navigationElement == "samtaler" ? "dashboard__sidebar__nav__element dashboard__sidebar__nav__element__active" : "dashboard__sidebar__nav__element"}>
                    <div className="dashboard__sidebar__nav__element__info">
                        <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                        <path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z"/>
                        </svg>
                        <p className="dashboard__sidebar__nav__element__p">Samtaler</p>
                    </div>
                    <div className="dashboard__sidebar__nav__element__notification">1</div>
                  </Link>
            </>}
          </div>
          {user.accountInformation.account__type == "freelancer" && <div className="dashboard__sidebar__nav">
            <div className="dashboard__sidebar__nav__header" onClick={() => showSalgClicked()}>
                <p className="dashboard__sidebar__nav__heading">Salg</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="header__navigation__nav__a__icon" id="salgChevron" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>
            {showSalg && <>
                <Link href="/dashboard/samtaler" className={navigationElement == "samtaler" ? "dashboard__sidebar__nav__element dashboard__sidebar__nav__element__active" : "dashboard__sidebar__nav__element"}>
                  <div className="dashboard__sidebar__nav__element__info">
                      <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                      <path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z"/>
                      </svg>
                      <p className="dashboard__sidebar__nav__element__p">Samtaler</p>
                  </div>
                  <div className="dashboard__sidebar__nav__element__notification">1</div>
                </Link>
                <div className="dashboard__sidebar__nav__element">
                  <div className="dashboard__sidebar__nav__element__info">
                      <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                      <path d="M23,22H5a3,3,0,0,1-3-3V1A1,1,0,0,0,0,1V19a5.006,5.006,0,0,0,5,5H23a1,1,0,0,0,0-2Z"/><path d="M6,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,6,20Z"/><path d="M10,10v9a1,1,0,0,0,2,0V10a1,1,0,0,0-2,0Z"/><path d="M15,13v6a1,1,0,0,0,2,0V13a1,1,0,0,0-2,0Z"/><path d="M20,9V19a1,1,0,0,0,2,0V9a1,1,0,0,0-2,0Z"/><path d="M6,9a1,1,0,0,0,.707-.293l3.586-3.586a1.025,1.025,0,0,1,1.414,0l2.172,2.172a3,3,0,0,0,4.242,0l5.586-5.586A1,1,0,0,0,22.293.293L16.707,5.878a1,1,0,0,1-1.414,0L13.121,3.707a3,3,0,0,0-4.242,0L5.293,7.293A1,1,0,0,0,6,9Z"/>
                      </svg>
                      <p className="dashboard__sidebar__nav__element__p">Effektivitet</p>
                  </div>
                </div>
            </>}
          </div>}
        </div>
        <div className="dashboard__sidebar__profil">
          <div className="dashboard__sidebar__content">
            <div className="dashboard__sidebar__nav">
              <Link href="/dashboard/abonnement" className={navigationElement == "abonnement" ? "dashboard__sidebar__nav__element dashboard__sidebar__nav__element__active" : "dashboard__sidebar__nav__element"}>
                <div className="dashboard__sidebar__nav__element__info">
                    <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                      <path d="M16,23c0,.552-.447,1-1,1H6c-2.757,0-5-2.243-5-5V5C1,2.243,3.243,0,6,0h4.515c1.869,0,3.627,.728,4.95,2.05l3.484,3.486c.271,.271,.523,.568,.748,.883,.321,.449,.217,1.074-.232,1.395-.449,.32-1.075,.217-1.395-.233-.161-.225-.341-.438-.534-.63l-3.485-3.486c-.318-.318-.671-.587-1.051-.805V7c0,.551,.448,1,1,1h3c.553,0,1,.448,1,1s-.447,1-1,1h-3c-1.654,0-3-1.346-3-3V2.023c-.16-.015-.322-.023-.485-.023H6c-1.654,0-3,1.346-3,3v14c0,1.654,1.346,3,3,3H15c.553,0,1,.448,1,1Zm5.685-6.733l-3.041-.507c-.373-.062-.644-.382-.644-.76,0-.551,.448-1,1-1h2.268c.356,0,.688,.192,.867,.5,.275,.478,.885,.641,1.366,.365,.478-.277,.642-.888,.364-1.366-.534-.925-1.53-1.5-2.598-1.5h-.268v-1c0-.552-.447-1-1-1s-1,.448-1,1v1c-1.654,0-3,1.346-3,3,0,1.36,.974,2.51,2.315,2.733l3.041,.507c.373,.062,.644,.382,.644,.76,0,.551-.448,1-1,1h-2.268c-.356,0-.688-.192-.867-.5-.275-.479-.886-.642-1.366-.365-.478,.277-.642,.888-.364,1.366,.534,.925,1.53,1.499,2.598,1.499h.268v1c0,.552,.447,1,1,1s1-.448,1-1v-1c1.654,0,3-1.346,3-3,0-1.36-.974-2.51-2.315-2.733Zm-14.185-1.267h5.5c.553,0,1-.448,1-1s-.447-1-1-1H7.5c-1.378,0-2.5,1.122-2.5,2.5v2c0,1.378,1.122,2.5,2.5,2.5h5.5c.553,0,1-.448,1-1s-.447-1-1-1H7.5c-.276,0-.5-.224-.5-.5v-2c0-.276,.224-.5,.5-.5Zm-1.5-4h2c.552,0,1-.448,1-1s-.448-1-1-1h-2c-.552,0-1,.448-1,1s.448,1,1,1Zm0-4h2c.552,0,1-.448,1-1s-.448-1-1-1h-2c-.552,0-1,.448-1,1s.448,1,1,1Z"/>
                    </svg>
                    <p className="dashboard__sidebar__nav__element__p">Abonnement</p>
                </div>
              </Link>
              <Link href="/dashboard/konto" className={navigationElement == "konto" ? "dashboard__sidebar__nav__element dashboard__sidebar__nav__element__active" : "dashboard__sidebar__nav__element"}>
                <div className="dashboard__sidebar__nav__element__info">
                    <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                      <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/><path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z"/>
                    </svg>
                    <p className="dashboard__sidebar__nav__element__p">Indstillinger</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="salecard__element__indhold__seller__wrapper">
              <div className="salecard__element__indhold__seller__image">
                  {user.userInformation.user__picture ? <>
                    {user.userInformation.user__picture.picture__custom ? <img className="salecard__element__indhold__seller__image__pic" src={user.userInformation.user__picture.picture__url} alt="" /> : user.userInformation.user__name.slice(0,1)}
                  </> : user.userInformation.user__name.slice(0,1)}
              </div>
              <div className="salecard__element__indhold__seller__indhold">
                  <p className="salecard__element__indhold__seller__heading">{user.userInformation.user__name}</p>
                  <p className="salecard__element__indhold__seller__p">{user.userInformation.user__email}</p>
              </div>
          </div>
        </div>
      </div>}
    </div>
    </>
  );
}
