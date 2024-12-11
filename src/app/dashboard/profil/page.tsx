"use client"
import { useState, useEffect } from 'react'
import { getUser, updateUser, getFreelancerInformation } from "../../lib"
import { getKategorier } from '../../assets/lister/lister';

import Sidebar from '../../components/sidebar';

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

export default function Profil() {

  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [user, setUser] = useState<User | any>(null)

  const [saveSuccess, setSaveSuccess] = useState(false)
  
  async function getUserSession() {
    const userSession: any = {...await getUser()}
    const userData: any = {...await getFreelancerInformation(userSession.clientUserData.userInformation.user__id)}
    setUser(userData)
    setPageLoading(false)
  }

  useEffect(() => {
    getUserSession()
  }, []);

  useEffect(() => {
    if (!pageLoading && user) {
      (document.getElementById("user.freelanceInformation.freelance__profile.profile__about") as HTMLInputElement).value = user.freelanceInformation.freelance__profile.profile__about;
      (document.getElementById("user.freelanceInformation.freelance__overskrift") as HTMLInputElement).value = user.freelanceInformation.freelance__overskrift;
      (document.getElementById("user.freelanceInformation.freelance__beskrivelse") as HTMLInputElement).value = user.freelanceInformation.freelance__beskrivelse;
      (document.getElementById("user.freelanceInformation.freelance__erfaring.erfaring__tid") as HTMLInputElement).value = user.freelanceInformation.freelance__erfaring.erfaring__tid;
      (document.getElementById("branche-dropdown") as HTMLInputElement).value = user.freelanceInformation.freelance__profile.profile__branche;
      (document.getElementById("underkat-dropdown") as HTMLInputElement).value = user.freelanceInformation.freelance__profile.profile__underkategori;
    }
  }, [pageLoading])

  async function saveChanges() {
    setLoading(true)

    if (user.freelanceInformation.freelance__erfaring.erfaring__tid == "Ingen erfaring") {
      user.freelanceInformation.freelance__erfaring.erfaring__text = "Jeg er lige begyndt"
    } else if (user.freelanceInformation.freelance__erfaring.erfaring__tid == "Lidt erfaring") {
      user.freelanceInformation.freelance__erfaring.erfaring__text = "Jeg har et par projekter"
    } else if (user.freelanceInformation.freelance__erfaring.erfaring__tid == "Medium erfaring") {
      user.freelanceInformation.freelance__erfaring.erfaring__text = "Jeg har været i gang i 1-2 år"
    } else if (user.freelanceInformation.freelance__erfaring.erfaring__tid == "Meget erfaring") {
      user.freelanceInformation.freelance__erfaring.erfaring__text = "Jeg er ekspert med mere end 2 års erfaring"
    }
    
    await updateUser(user)
    setLoading(false)
    setSaveSuccess(true)
  }

  useEffect(() => {
    if (saveSuccess) {
      setTimeout(function () {
        setSaveSuccess(false)
      }, 3000);
    }
  }, [saveSuccess])

  const [brancherSearch, setBrancherSearch] = useState(getKategorier())
  const [underkatSearch, setUnderkatSearch] = useState([])

  return (
    <>
      {pageLoading ? <div className="loading__container">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div> : <>
        <div className="dashboard__container">
        <Sidebar />
        {user && <div className="dashboard__content">
          <div className="dashboard__save__container">
            {loading ? <button className="header__cta__btn__fill dashboard__save" disabled><div className="loader"></div></button> : <button className="header__cta__btn__fill dashboard__save" onClick={() => {saveChanges()}}>Gem opdateringer</button>}
            <a href={"/freelancer/profil?id=" + user.freelanceInformation.freelance__url} target={"_blank"} className="header__cta__btn__fill component__info__btn__fill dashboard__open__btn">
              <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__save__icon" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
              </svg>
            </a>
          </div>
          <div className="dashboard__content__header">
            <div className="dashboard__content__header__indhold">
              <p className="dashboard__content__heading">Min profil</p>
              <p className="dashboard__content__p">Fortæl os lidt om dig selv. Disse oplysninger vises på din offentlige profil, så potentielle købere kan lære dig bedre at kende.</p>
            </div>
          </div>
          <div className="logind__form">
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Overskrift</p>
                  <p className={user.freelanceInformation.freelance__overskrift.length >= 60 ? "logind__form__element__heading__glemt logind__form__element__heading__glemt__error" : "logind__form__element__heading__glemt"}>{user.freelanceInformation.freelance__overskrift.length}/60 tegn</p>
              </div>
              <input maxLength={60} className="logind__form__element__input" id="user.freelanceInformation.freelance__overskrift" placeholder={user.freelanceInformation.freelance__overskrift} autoComplete={"off"} onChange={(e) => {
                const userDupli = {...user}
                userDupli.freelanceInformation.freelance__overskrift = e.target.value
                setUser(userDupli)
              }} />
            </div>
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Service beskrivelse</p>
                  <p className={user.freelanceInformation.freelance__beskrivelse.length >= 1024 ? "logind__form__element__heading__glemt logind__form__element__heading__glemt__error" : "logind__form__element__heading__glemt"}>{user.freelanceInformation.freelance__beskrivelse.length}/1024 tegn</p>
              </div>
              <textarea maxLength={1024} className="logind__form__element__input logind__form__element__textarea__big" id="user.freelanceInformation.freelance__beskrivelse" placeholder={user.freelanceInformation.freelance__beskrivelse} onChange={(e) => {
                const userDupli = {...user}
                userDupli.freelanceInformation.freelance__beskrivelse = e.target.value
                setUser(userDupli)
              }} />
            </div>
          </div>
          <div className="logind__form">
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Om mig</p>
                  <p className="logind__form__element__heading__glemt">{user.freelanceInformation.freelance__profile.profile__about.length}/255 tegn</p>
              </div>
              <textarea className="logind__form__element__input" maxLength={255} id="user.freelanceInformation.freelance__profile.profile__about" placeholder={user.freelanceInformation.freelance__profile.profile__about} onChange={(e) => {
                const userDupli = {...user}
                userDupli.freelanceInformation.freelance__profile.profile__about = e.target.value
                setUser(userDupli)
              }} />
            </div>
            <div className="logind__form__element">
                <div className="logind__form__element__header">
                    <p className="logind__form__element__heading">Branche</p>
                    <p className="logind__form__element__heading__glemt">Offentligt</p>
                </div>
                <div className="logind__form__multiple__container">
                  <div className="welcome__dropdown__element__container">
                    <div className="welcome__dropdown__element__dropdown__container">
                      <input className="welcome__dropdown__element__dropdown__input" onFocus={() => {
                          document.getElementById("branche-dropdown-wrapper")?.classList.add("welcome__dropdown__element__dropdown__wrapper__active")
                      }} autoComplete={"off"} id={"branche-dropdown"} placeholder={"Vælg branche"} onChange={(e) => {
                          const searchedDupli = []
                          
                          getKategorier().forEach((listItem) => {
                              if (listItem.navn.toLowerCase().includes(e.target.value.toLowerCase())) {
                                  searchedDupli.push(listItem)
                              }
                          })
                          setBrancherSearch(searchedDupli)
                      }} />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                      </svg>
                      <div className="welcome__dropdown__element__dropdown__wrapper" id="branche-dropdown-wrapper">
                          {brancherSearch.map((item) => {
                              return (<button className="welcome__dropdown__element__dropdown__wrapper__element" key={"branche" + item.navn} onClick={() => {
                                  const userDupli = {...user}
                                  userDupli.freelanceInformation.freelance__profile.profile__branche = item.navn

                                  document.getElementById("branche-dropdown").value = item.navn
                                  document.getElementById("branche-dropdown-wrapper")?.classList.remove("welcome__dropdown__element__dropdown__wrapper__active")
                                  setUser(userDupli)
                              }}>
                                  <p className="welcome__dropdown__element__dropdown__wrapper__element__p">{item.navn}</p>
                              </button>);
                          })}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="logind__form__element">
                <div className="logind__form__element__header">
                    <p className="logind__form__element__heading">Underkategori</p>
                    <p className="logind__form__element__heading__glemt">Offentligt</p>
                </div>
                <div className="logind__form__multiple__container">
                  <div className="welcome__dropdown__element__container">
                    <div className="welcome__dropdown__element__dropdown__container">
                      <input className="welcome__dropdown__element__dropdown__input" onFocus={() => {
                          document.getElementById("underkat-dropdown-wrapper")?.classList.add("welcome__dropdown__element__dropdown__wrapper__active")
                      }} autoComplete={"off"} id={"underkat-dropdown"} placeholder={"Vælg underkategori"} onChange={(e) => {
                          const searchedDupli = []

                          const indexOfBranche = getKategorier().findIndex(item => item.id == user.freelanceInformation.freelance__profile.profile__branche)
                          
                          if (indexOfBranche >= 0) {
                            getKategorier()[indexOfBranche].underkategorier!.forEach((listItem) => {
                              if (listItem.navn.toLowerCase().includes(e.target.value.toLowerCase())) {
                                  searchedDupli.push(listItem)
                              }
                            })
                          }
                          setUnderkatSearch(searchedDupli)
                      }} />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                      </svg>
                      <div className="welcome__dropdown__element__dropdown__wrapper" id="underkat-dropdown-wrapper">
                          {underkatSearch.map((item) => {
                              return (<button className="welcome__dropdown__element__dropdown__wrapper__element" key={"underkat" + item.navn} onClick={() => {
                                  const userDupli = {...user}
                                  userDupli.freelanceInformation.freelance__profile.profile__branche = item.navn

                                  document.getElementById("underkat-dropdown").value = item.navn
                                  document.getElementById("underkat-dropdown-wrapper")?.classList.remove("welcome__dropdown__element__dropdown__wrapper__active")
                                  setUser(userDupli)
                              }}>
                                  <p className="welcome__dropdown__element__dropdown__wrapper__element__p">{item.navn}</p>
                              </button>);
                          })}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Erfaring</p>
                  <p className="logind__form__element__heading__glemt">Offentligt</p>
              </div>
              <div className="logind__form__multiple__container">
                  <select className="logind__form__element__input" id="user.freelanceInformation.freelance__erfaring.erfaring__tid" onChange={(e) => user.freelanceInformation.freelance__erfaring.erfaring__tid = e.target.value}>
                      <option value="">Vælg erfaring...</option>
                      <option value="Ingen erfaring">Jeg er lige begyndt (Ingen erfaring)</option>
                      <option value="Lidt erfaring">Jeg har et par projekter (Lidt erfaring)</option>
                      <option value="Medium erfaring">Jeg har været i gang i 1-2 år (Medium erfaring)</option>
                      <option value="Meget erfaring">Jeg er ekspert med mere end 2 års erfaring (Meget erfaring)</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                  </svg>
              </div>
            </div>
          </div>
          {saveSuccess && <div className="dashboard__notification">
            <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__notification__icon" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
            </svg>
            <p className="dashboard__notification__p">Dine ændringer er blevet gemt</p>
          </div>}
        </div>}
      </div>
      </>}
    </>
  );
}
