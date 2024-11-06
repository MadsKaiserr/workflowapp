"use client"
import Link from "next/link";
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getUser } from "../lib"

export default function Dashboard() {
  const pathname = usePathname()

  const [showMenu, setShowMenu] = useState(true)
  const [showSalg, setShowSalg] = useState(true)
  const [navigationElement, setNavigationElement] = useState("dashboard")

  useEffect(() => {
    if (pathname.slice(-6) == "profil") {
      setNavigationElement("profil")
    } else if (pathname.slice(-8) == "samtaler") {
      setNavigationElement("samtaler")
    } else if (pathname.slice(-9) == "portfolio") {
      setNavigationElement("portfolio")
    }
  }, [])

  useEffect(() => {
    if (navigationElement == "dashboard") {
      document.getElementById("dashboard")?.classList.add("dashboard__sidebar__nav__element__active")
      document.getElementById("profil")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("portfolio")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("samtaler")?.classList.remove("dashboard__sidebar__nav__element__active")
    } else if (navigationElement == "profil") {
      document.getElementById("dashboard")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("profil")?.classList.add("dashboard__sidebar__nav__element__active")
      document.getElementById("portfolio")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("samtaler")?.classList.remove("dashboard__sidebar__nav__element__active")
    } else if (navigationElement == "portfolio") {
      document.getElementById("dashboard")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("profil")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("portfolio")?.classList.add("dashboard__sidebar__nav__element__active")
      document.getElementById("samtaler")?.classList.remove("dashboard__sidebar__nav__element__active")
    } else if (navigationElement == "samtaler") {
      document.getElementById("dashboard")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("profil")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("portfolio")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("samtaler")?.classList.add("dashboard__sidebar__nav__element__active")
    }
  }, [navigationElement])

  function showMenuClicked() {
    if (showMenu) {
      setShowMenu(false)
      document.getElementById("menuChevron").style.transform = "rotate(180deg)";
    } else {
      setShowMenu(true)
      document.getElementById("menuChevron").style.transform = "rotate(0deg)";
    }
  }
  function showSalgClicked() {
    if (showSalg) {
      setShowSalg(false)
      document.getElementById("salgChevron").style.transform = "rotate(180deg)";
    } else {
      setShowSalg(true)
      document.getElementById("salgChevron").style.transform = "rotate(0deg)";
    }
  }

  const [brugerNavn, setBrugerNavn] = useState("")
  
  async function getUserSession() {
    const user = await getUser()
    setBrugerNavn(user.user.userInformation.user__name)
  }

  useEffect(() => {
    getUserSession()
  }, []);

  return (
    <>
    <div className="dashboard__sidebar">
        <div className="dashboard__sidebar__nav">
          {brugerNavn !== "" ? <p className="dashboard__sidebar__heading">Velkommen til, {brugerNavn}</p> : <p className="dashboard__sidebar__heading">Velkommen til</p>}
          <div className="dashboard__sidebar__nav__header" onClick={() => showMenuClicked()}>
              <p className="dashboard__sidebar__nav__heading">Menu</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="header__navigation__nav__a__icon" id="menuChevron" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
              </svg>
          </div>
          {showMenu && <>
              <Link href="/dashboard" className="dashboard__sidebar__nav__element" id="dashboard">
                <div className="dashboard__sidebar__nav__element__info">
                    <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                    <path d="M19,24H5c-2.757,0-5-2.243-5-5V9.724c0-1.665,.824-3.215,2.204-4.145L9.203,.855c1.699-1.146,3.895-1.146,5.594,0l7,4.724c1.379,.93,2.203,2.479,2.203,4.145v9.276c0,2.757-2.243,5-5,5ZM12,1.997c-.584,0-1.168,.172-1.678,.517L3.322,7.237c-.828,.558-1.322,1.487-1.322,2.486v9.276c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V9.724c0-.999-.494-1.929-1.321-2.486L13.678,2.514c-.51-.345-1.094-.517-1.678-.517Z"/>
                    </svg>
                    <p className="dashboard__sidebar__nav__element__p">Dashboard</p>
                </div>
              </Link>
              <Link href="/dashboard/profil" className="dashboard__sidebar__nav__element" id="profil">
                <div className="dashboard__sidebar__nav__element__info">
                    <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                    <path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/>
                    </svg>
                    <p className="dashboard__sidebar__nav__element__p">Min profil</p>
                </div>
              </Link>
              <Link href="/dashboard/portfolio" className="dashboard__sidebar__nav__element" id="portfolio">
                <div className="dashboard__sidebar__nav__element__info">
                    <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                      <path d="M19,3H12.472a1.019,1.019,0,0,1-.447-.1L8.869,1.316A3.014,3.014,0,0,0,7.528,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V8A5.006,5.006,0,0,0,19,3ZM5,3H7.528a1.019,1.019,0,0,1,.447.1l3.156,1.579A3.014,3.014,0,0,0,12.472,5H19a3,3,0,0,1,2.779,1.882L2,6.994V6A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V8.994l20-.113V18A3,3,0,0,1,19,21Z"/>
                    </svg>
                    <p className="dashboard__sidebar__nav__element__p">Min portefølje</p>
                </div>
                <div className="dashboard__sidebar__nav__element__status">4</div>
              </Link>
          </>}
        </div>
        <div className="dashboard__sidebar__nav">
          <div className="dashboard__sidebar__nav__header" onClick={() => showSalgClicked()}>
              <p className="dashboard__sidebar__nav__heading">Salg</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="header__navigation__nav__a__icon" id="salgChevron" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
              </svg>
          </div>
          {showSalg && <>
              <Link href="/dashboard/samtaler" className="dashboard__sidebar__nav__element" id="samtaler">
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
        </div>
    </div>
    </>
  );
}
