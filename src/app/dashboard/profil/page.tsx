"use client"
import { useState, useEffect } from 'react'
import { getUser, updateUser } from "../../lib"
import { getKategorier } from '../../assets/lister/lister';

import Sidebar from '../../components/sidebar';

export default function Profil() {

  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [user, setUser] = useState({
    userInformation: {
        user__id: "",
        user__name: "",
        user__email: "",
        user__location: ""
    },
    accountInformation: {
        account__status: "",
        account__created: 0,
        account__type:  ""
    },
    freelanceInformation: {
        freelance__url: "",
        freelance__reviews: {
            reviews__rating: 0,
            reviews__1star: 0,
            reviews__2star: 0,
            reviews__3star: 0,
            reviews__4star: 0,
            reviews__5star: 0,
            reviews__data: [
                {
                    review__id: 0,
                    review__profileid: 0,
                    review__overskrift: "",
                    review__text: "",
                    review__rating: 0
                }
            ]
        },
        freelance__profile: {
            profile__type: "",
            profile__tags: [
                {
                    tag__id: "",
                    tag__name: "",
                    tag__description: "",
                    tag_color: ""
                },
                {
                    tag__id: "",
                    tag__name: "",
                    tag__description: "",
                    tag_color: ""
                }
            ],
            profile__about: "",
            profile__branche: "",
            profile__underkategori: ""
        },
        freelance__tags: [],
        freelance__overskrift: "",
        freelance__beskrivelse: "",
        freelance__erfaring: {
            erfaring__text: "",
            erfaring__tid: ""
        }
    }
})
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  async function getUserSession() {
    const userData: any = {...await getUser()}
    setUser(userData.user)
    setPageLoading(false)
  }

  useEffect(() => {
    if (!pageLoading) {
      (document.getElementById("user.freelanceInformation.freelance__profile.profile__about") as HTMLInputElement).value = user.freelanceInformation.freelance__profile.profile__about;
      (document.getElementById("user.freelanceInformation.freelance__overskrift") as HTMLInputElement).value = user.freelanceInformation.freelance__overskrift;
      (document.getElementById("user.freelanceInformation.freelance__beskrivelse") as HTMLInputElement).value = user.freelanceInformation.freelance__beskrivelse;
      (document.getElementById("user.freelanceInformation.freelance__erfaring.erfaring__tid") as HTMLInputElement).value = user.freelanceInformation.freelance__erfaring.erfaring__tid;
      (document.getElementById("user.freelanceInformation.freelance__profile.profile__branche") as HTMLInputElement).value = user.freelanceInformation.freelance__profile.profile__branche;
      (document.getElementById("user.freelanceInformation.freelance__profile.profile__underkategori") as HTMLInputElement).value = user.freelanceInformation.freelance__profile.profile__underkategori;
    }
  }, [pageLoading])

  useEffect(() => {
    getUserSession()
  }, []);

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
                  <p className="logind__form__element__heading">Om mig</p>
                  <p className="logind__form__element__heading__glemt">Offentligt</p>
              </div>
              <textarea className="logind__form__element__input" id="user.freelanceInformation.freelance__profile.profile__about" placeholder={user.freelanceInformation.freelance__profile.profile__about} onChange={(e) => user.freelanceInformation.freelance__profile.profile__about = e.target.value} />
            </div>
            <div className="logind__form__element">
                <div className="logind__form__element__header">
                    <p className="logind__form__element__heading">Branche</p>
                    <p className="logind__form__element__heading__glemt">Offentligt</p>
                </div>
                <div className="logind__form__multiple__container">
                    <select className="logind__form__element__input" id="user.freelanceInformation.freelance__profile.profile__branche" onChange={(e) => user.freelanceInformation.freelance__profile.profile__branche = e.target.value}>
                        <option value="">Vælg branche...</option>
                        {getKategorier().map((item) => {
                            return (<option key={item.navn} value={item.navn}>{item.navn}</option>);
                        })}
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                    </svg>
                </div>
            </div>
            <div className="logind__form__element">
                <div className="logind__form__element__header">
                    <p className="logind__form__element__heading">Underkategori</p>
                    <p className="logind__form__element__heading__glemt">Offentligt</p>
                </div>
                <div className="logind__form__multiple__container">
                    <select className="logind__form__element__input" id="user.freelanceInformation.freelance__profile.profile__underkategori" onChange={(e) => user.freelanceInformation.freelance__profile.profile__underkategori = e.target.value}>
                        <option value="">Vælg underkategori...</option>
                        {getKategorier().map((item) => {
                            return (<option key={item.navn} value={item.navn}>{item.navn}</option>);
                        })}
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                    </svg>
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
          <div className="logind__form">
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Overskrift</p>
                  <p className={user.freelanceInformation.freelance__overskrift.length >= 60 ? "logind__form__element__heading__glemt logind__form__element__heading__glemt__error" : "logind__form__element__heading__glemt"}>{user.freelanceInformation.freelance__overskrift.length}/60 tegn</p>
              </div>
              <input maxLength={60} className="logind__form__element__input" id="user.freelanceInformation.freelance__overskrift" placeholder={user.freelanceInformation.freelance__overskrift} onChange={(e) => user.freelanceInformation.freelance__overskrift = e.target.value} />
            </div>
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Service beskrivelse</p>
                  <p className={user.freelanceInformation.freelance__beskrivelse.length >= 1024 ? "logind__form__element__heading__glemt logind__form__element__heading__glemt__error" : "logind__form__element__heading__glemt"}>{user.freelanceInformation.freelance__beskrivelse.length}/1024 tegn</p>
              </div>
              <textarea maxLength={1024} className="logind__form__element__input logind__form__element__textarea__big" id="user.freelanceInformation.freelance__beskrivelse" placeholder={user.freelanceInformation.freelance__beskrivelse} onChange={(e) => user.freelanceInformation.freelance__beskrivelse = e.target.value} />
            </div>
          </div>
          {saveSuccess && <div className="dashboard__notification">
            <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__notification__icon" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
            </svg>
            <p className="dashboard__notification__p">Dine ændringer er blevet gemt</p>
          </div>}
          {/* <div className="logind__form">
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Overskrift</p>
                  <p className={overskrift.length >= 60 ? "logind__form__element__heading__glemt logind__form__element__heading__glemt__error" : "logind__form__element__heading__glemt"}>{overskrift.length}/60 tegn</p>
              </div>
              <input className="logind__form__element__input" required value={overskrift} maxLength={60} placeholder="" onChange={(e) => setOverskrift(e.target.value)} />
            </div>
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Beskrivelse</p>
                  <p className={beskrivelse.length >= 512 ? "logind__form__element__heading__glemt logind__form__element__heading__glemt__error" : "logind__form__element__heading__glemt"}>{beskrivelse.length}/512 tegn</p>
              </div>
              <textarea className="logind__form__element__input" required value={beskrivelse} maxLength={512} placeholder="" onChange={(e) => setBeskrivelse(e.target.value)} />
            </div>
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                    <p className="logind__form__element__heading">Branche</p>
                    <p className="logind__form__element__heading__glemt">Offentligt</p>
              </div>
              <div className="logind__form__multiple__container">
                  <div className={brancheDropdownActive ? "logind__form__element__dropdown logind__form__element__dropdown__active" : "logind__form__element__dropdown"}>
                      <input className="logind__form__element__dropdown__input" autoComplete={"off"} id={"branchedropdown"} placeholder={"Vælg branche..."} value={brancheQuery} onChange={(e) => setBrancheQuery(e.target.value)} />
                      <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                      </svg>
                      {brancheDropdownActive && <div className="logind__form__element__dropdown__container">
                          {brancheQueryList.map((item) => {
                              return (<button className="logind__form__element__dropdown__element" key={item.navn} onClick={() => {setChosenBranche(item.navn); setBrancheDropdownActive(false)}}>
                                  <p className="logind__form__element__dropdown__element__p">{item.navn}</p>
                              </button>);
                          })}
                      </div>}
                  </div>
              </div>
            </div>
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Erfaring</p>
                  <p className="logind__form__element__heading__glemt">Offentligt</p>
              </div>
              <div className="logind__form__multiple__container">
                  <select className="logind__form__element__input" value={erfaring} required onChange={(e) => setErfaring(e.target.value)}>
                      <option value="">Vælg erfaring...</option>
                      <option value="Ingen erfaring">Ingen erfaring</option>
                      <option value="Lidt erfaring">Lidt erfaring</option>
                      <option value="Medium erfaring">Medium erfaring</option>
                      <option value="Meget erfaring">Meget erfaring</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                  </svg>
              </div>
            </div>
          </div> */}
        </div>}
      </div>
      </>}
    </>
  );
}
