"use client"
import { useState, useEffect } from 'react'
import { getUser, updateUser, getFreelancerInformation } from "../../lib"
import { getDanskeByer } from '../../assets/lister/lister';

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

export default function Konto() {

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
    if (!pageLoading) {
      (document.getElementById("user.userInformation.user__name") as HTMLInputElement).value = user.userInformation.user__name;
      (document.getElementById("user.userInformation.user__email") as HTMLInputElement).value = user.userInformation.user__email;
      
      if (user.freelanceInformation) {
        (document.getElementById("user.freelanceInformation.freelance__url") as HTMLInputElement).value = user.freelanceInformation.freelance__url;
        (document.getElementById("user.userInformation.user__location") as HTMLInputElement).value = user.userInformation.user__location;
      }
    }
  }, [pageLoading])

  useEffect(() => {
    getUserSession()
  }, []);

  async function saveChanges() {
    setLoading(true)
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
            {user.freelanceInformation && <>
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
                              return (<option key={item.navn.toLowerCase()} value={item.navn.toLowerCase()}>{item.navn}</option>);
                          })}
                      </select>
                      <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                      </svg>
                  </div>
              </div>
            </>}
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
