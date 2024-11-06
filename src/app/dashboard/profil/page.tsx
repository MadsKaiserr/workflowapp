"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/firebase/config"
import { setDoc, doc } from "firebase/firestore";
import { getUser, updateUser } from "../../lib"
import { getKategorier, getDanskeByer } from '../../assets/lister/lister';

import Sidebar from '../../components/sidebar';

export default function Dashboard() {

  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [changed, setChanged] = useState(false)

  const [email, setEmail] = useState("")
  const [fuldeNavn, setFuldeNavn] = useState("")
  const [url, setUrl] = useState("")
  const [lokation, setLokation] = useState("")

  const [overskrift, setOverskrift] = useState("")
  const [beskrivelse, setBeskrivelse] = useState("")
  const [branche, setBranche] = useState("")
  const [erfaring, setErfaring] = useState("")
  const [pris, setPris] = useState("")
  
  async function getUserSession() {
    const userData = await getUser()
    setEmail(userData.user.userInformation.user__email || "")
    setFuldeNavn(userData.user.userInformation.user__name || "")
    setBranche(userData.user.freelanceInformation.freelance__branche || "")
    setErfaring(userData.user.freelanceInformation.freelance__erfaring.erfaring__tid || "")
    setBeskrivelse(userData.user.freelanceInformation.freelance__beskrivelse || "")
    setOverskrift(userData.user.freelanceInformation.freelance__overskrift || "")
    setUrl(userData.user.freelanceInformation.freelance__url || "")
    setChosenLocation(userData.user.freelanceInformation.freelance__location || "")
    setChosenBranche(userData.user.freelanceInformation.freelance__branche.replace("-", " ") || "")
    setPageLoading(false)
  }

  useEffect(() => {
    getUserSession()
  }, []);

  async function saveChanges() {
    setLoading(true)
    const userData = {
      userInformation: {
        user__name: fuldeNavn || "Anonym",
        user__location: chosenLocation
      },
      freelanceInformation: {
          freelance__url: url,
          freelance__location: chosenLocation,
          freelance__branche: chosenBranche.toLowerCase(),
          freelance__beskrivelse: beskrivelse,
          freelance__overskrift: overskrift
      }
    }
    await updateUser(userData)
    setLoading(false)
  }

  const [chosenLocation, setChosenLocation] = useState("")
  const [byQuery, setByQuery] = useState("")
  const [byQueryList, setByQueryList] = useState([])
  const [byDropdownActive, setByDropdownActive] = useState(false)

  useEffect(() => {
    if (byQuery === "") {
      setByQueryList(getDanskeByer());
    } else {
        var dupli = getDanskeByer();
        var newDupli = [];
        for (var y in dupli) {
            if ((dupli[y].toLowerCase()).includes(byQuery.toLowerCase()) || (dupli[y].toLowerCase()).includes(byQuery.toLowerCase().replaceAll("ø", "o"))) {
                newDupli.push(dupli[y]);
            }
        }
        setByQueryList(newDupli);
    }
  }, [byQuery])

  useEffect(() => {
    setByQuery(chosenLocation)
    setByDropdownActive(false)
  }, [chosenLocation])

  const [chosenBranche, setChosenBranche] = useState("")
  const [brancheQuery, setBrancheQuery] = useState("")
  const [brancheQueryList, setBrancheQueryList] = useState([])
  const [brancheDropdownActive, setBrancheDropdownActive] = useState(false)

  useEffect(() => {
    if (brancheQuery === "") {
      setBrancheQueryList(getKategorier());
    } else {
        var dupli = getKategorier();
        var newDupli = [];
        for (var y in dupli) {
            if ((dupli[y].navn.toLowerCase()).includes(brancheQuery.toLowerCase())) {
                newDupli.push(dupli[y]);
            }
        }
        setBrancheQueryList(newDupli);
    }
  }, [brancheQuery])

  useEffect(() => {
    setBrancheQuery(chosenBranche)
    setBrancheDropdownActive(false)
  }, [chosenBranche])

  useEffect(() => {
      if (pageLoading == false) {
        if (byQueryList.length <= 0 && byQuery == "") {
          setByQueryList(getDanskeByer());
        }
        if (brancheQueryList.length <= 0 && brancheQuery == "") {
          setBrancheQueryList(getKategorier());
        }
  
        if (document.getElementById('bydropdown')) {
          document.getElementById('bydropdown').addEventListener('focus', function(){
            setByDropdownActive(true)
          });
        }
        if (document.getElementById('branchedropdown')) {
          document.getElementById('branchedropdown').addEventListener('focus', function(){
            setBrancheDropdownActive(true)
          });
        }
      }
  }, [pageLoading])

  return (
    <>
      {pageLoading ? <div className="loading__container">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div> : <div className="dashboard__container">
        <Sidebar />
        <div className="dashboard__content">
          <div className="dashboard__save__container">
            {loading ? <button className="header__cta__btn__fill dashboard__save" disabled><div className="loader"></div></button> : <button className="header__cta__btn__fill dashboard__save" onClick={() => {saveChanges()}}>Gem opdateringer</button>}
            <a href={"/freelancer/profil?id=" + url} target={"_blank"} className="header__cta__btn__fill component__info__btn__fill dashboard__open__btn">
              <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__save__icon" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
              </svg>
            </a>
          </div>
          <div className="dashboard__content__header">
            <div className="dashboard__content__header__indhold">
              <p className="dashboard__content__heading">Profilindstillinger</p>
              <p className="dashboard__content__p">Fortæl os lidt om dig selv. Disse oplysninger vises på din offentlige profil, så potentielle købere kan lære dig bedre at kende.</p>
            </div>
          </div>
          <div className="logind__form">
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">Fulde navn</p>
                  <p className="logind__form__element__heading__glemt">Offentligt</p>
              </div>
              <input className="logind__form__element__input" required value={fuldeNavn} placeholder="" onChange={(e) => setFuldeNavn(e.target.value)} />
            </div>
            <div className="logind__form__element">
              <div className="logind__form__element__header">
                  <p className="logind__form__element__heading">URL</p>
                  <p className="logind__form__element__heading__glemt">Offentligt</p>
              </div>
              <div className="logind__form__multiple__container">
                <p className="logind__form__element__heading__glemt">workflow.dk/freelancer/profil?id=</p>
                <input className="logind__form__element__input" required value={url} placeholder="" onChange={(e) => setUrl(e.target.value)} />
              </div>
            </div>
            <div className="logind__form__element">
                <div className="logind__form__element__header">
                    <p className="logind__form__element__heading">Lokation</p>
                    <p className="logind__form__element__heading__glemt">Offentligt</p>
                </div>
                <div className="logind__form__multiple__container">
                    <div className={byDropdownActive ? "logind__form__element__dropdown logind__form__element__dropdown__active" : "logind__form__element__dropdown"}>
                        <input className="logind__form__element__dropdown__input" autoComplete={"off"} id={"bydropdown"} placeholder={"Vælg by..."} value={byQuery} onChange={(e) => setByQuery(e.target.value)} />
                        <svg xmlns="http://www.w3.org/2000/svg" className="logind__form__element__input__icon" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                        </svg>
                        {byDropdownActive && <div className="logind__form__element__dropdown__container">
                            {byQueryList.map((item) => {
                                return (<button className="logind__form__element__dropdown__element" key={item} onClick={() => {setChosenLocation(item); setByDropdownActive(false)}}>
                                    <p className="logind__form__element__dropdown__element__p">{item}</p>
                                </button>);
                            })}
                        </div>}
                    </div>
                </div>
            </div>
          </div>
          <div className="logind__form">
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
          </div>
        </div>
      </div>}
    </>
  );
}
