"use client"
import { useState, useEffect } from 'react'
import { getUser, updateUser } from "../../lib"
import { getDanskeByer } from '../../assets/lister/lister';

import Sidebar from '../../components/sidebar';

export default function Konto() {

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
  
  async function getUserSession() {
    const userData: any = {...await getUser()}
    setUser(userData.user)
    setPageLoading(false)
  }

  useEffect(() => {
    if (!pageLoading) {
      (document.getElementById("user.userInformation.user__name") as HTMLInputElement).value = user.userInformation.user__name;
      (document.getElementById("user.userInformation.user__email") as HTMLInputElement).value = user.userInformation.user__email;
      (document.getElementById("user.freelanceInformation.freelance__url") as HTMLInputElement).value = user.freelanceInformation.freelance__url;
      (document.getElementById("user.userInformation.user__location") as HTMLInputElement).value = user.userInformation.user__location;
    }
  }, [pageLoading])

  useEffect(() => {
    getUserSession()
  }, []);

  async function saveChanges() {
    setLoading(true)
    await updateUser(user)
    setLoading(false)
  }

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
          </div>
          <div className="dashboard__content__header">
            <div className="dashboard__content__header__indhold">
              <p className="dashboard__content__heading">Kontoindstillinger</p>
              <p className="dashboard__content__p">Fortæl os lidt om dig selv. Disse oplysninger vises på din offentlige profil, så potentielle købere kan lære dig bedre at kende.</p>
            </div>
          </div>
          <div className="logind__form">
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Fulde navn</p>
                  <p className="logind__form__element__heading__glemt">Offentligt</p>
              </div>
              <input className="logind__form__element__input" id="user.userInformation.user__name" placeholder={user.userInformation.user__name} onChange={(e) => user.userInformation.user__name = e.target.value} />
            </div>
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Email</p>
                  <p className="logind__form__element__heading__glemt">Privat</p>
              </div>
              <input className="logind__form__element__input" id="user.userInformation.user__email" placeholder={user.userInformation.user__email} onChange={(e) => user.userInformation.user__email = e.target.value} />
            </div>
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">URL</p>
                  <p className="logind__form__element__heading__glemt">Offentligt</p>
              </div>
              <div className="logind__form__multiple__container">
                <p className="logind__form__element__heading__glemt">workflow.dk/freelancer/profil?id=</p>
                <input className="logind__form__element__input" id="user.freelanceInformation.freelance__url" placeholder={user.freelanceInformation.freelance__url} onChange={(e) => user.freelanceInformation.freelance__url = e.target.value} />
              </div>
            </div>
            <div className="logind__form__element">
                <div className="logind__form__element__header">
                    <p className="logind__form__element__heading">Lokation</p>
                    <p className="logind__form__element__heading__glemt">Offentligt</p>
                </div>
                <div className="logind__form__multiple__container">
                    <select className="logind__form__element__input" id="user.userInformation.user__location" onChange={(e) => user.userInformation.user__location = e.target.value}>
                        <option value="">Vælg lokation...</option>
                        {getDanskeByer().map((item) => {
                            return (<option key={item.navn} value={item.navn}>{item.navn}</option>);
                        })}
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                    </svg>
                </div>
            </div>
          </div>
        </div>}
      </div>
      </>}
    </>
  );
}
