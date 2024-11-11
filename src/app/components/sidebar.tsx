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
    } else if (pathname.slice(-5) == "konto") {
      setNavigationElement("konto")
    } else if (pathname.slice(-9) == "portfolio") {
      setNavigationElement("portfolio")
    }
  }, [])

  useEffect(() => {
    if (navigationElement == "dashboard") {
      document.getElementById("dashboard")?.classList.add("dashboard__sidebar__nav__element__active")
      document.getElementById("profil")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("portfolio")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("konto")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("samtaler")?.classList.remove("dashboard__sidebar__nav__element__active")
    } else if (navigationElement == "profil") {
      document.getElementById("dashboard")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("profil")?.classList.add("dashboard__sidebar__nav__element__active")
      document.getElementById("portfolio")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("konto")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("samtaler")?.classList.remove("dashboard__sidebar__nav__element__active")
    } else if (navigationElement == "portfolio") {
      document.getElementById("dashboard")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("profil")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("portfolio")?.classList.add("dashboard__sidebar__nav__element__active")
      document.getElementById("samtaler")?.classList.remove("dashboard__sidebar__nav__element__active")
    } else if (navigationElement == "konto") {
      document.getElementById("dashboard")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("profil")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("portfolio")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("konto")?.classList.add("dashboard__sidebar__nav__element__active")
      document.getElementById("samtaler")?.classList.remove("dashboard__sidebar__nav__element__active")
    } else if (navigationElement == "samtaler") {
      document.getElementById("dashboard")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("profil")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("portfolio")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("konto")?.classList.remove("dashboard__sidebar__nav__element__active")
      document.getElementById("samtaler")?.classList.add("dashboard__sidebar__nav__element__active")
    }
  }, [navigationElement])

  function showMenuClicked() {
    if (showMenu) {
      setShowMenu(false)
      document.getElementById("menuChevron")!.style.transform = "rotate(180deg)";
    } else {
      setShowMenu(true)
      document.getElementById("menuChevron")!.style.transform = "rotate(0deg)";
    }
  }
  function showSalgClicked() {
    if (showSalg) {
      setShowSalg(false)
      document.getElementById("salgChevron")!.style.transform = "rotate(180deg)";
    } else {
      setShowSalg(true)
      document.getElementById("salgChevron")!.style.transform = "rotate(0deg)";
    }
  }

  const [brugerNavn, setBrugerNavn] = useState("")
  
  async function getUserSession() {
    const user = await getUser()
    if (user) {
      const userData: any = {...user}
      setBrugerNavn(userData.user.userInformation.user__name)
    }
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
              <Link href="/dashboard/konto" className="dashboard__sidebar__nav__element" id="konto">
                <div className="dashboard__sidebar__nav__element__info">
                    <svg xmlns="http://www.w3.org/2000/svg" className="dashboard__sidebar__nav__element__icon" viewBox="0 0 24 24">
                      <path d="m21.298,13.885l-.451-.259c.102-.544.153-1.088.153-1.625s-.051-1.082-.153-1.625l.451-.26c1.434-.825,1.93-2.663,1.105-4.096-.399-.695-1.045-1.192-1.819-1.401-.773-.208-1.582-.103-2.277.295l-.45.259c-.841-.72-1.81-1.28-2.857-1.649v-.522c0-1.654-1.346-3-3-3s-3,1.346-3,3v.522c-1.047.37-2.016.929-2.857,1.649l-.45-.258c-.694-.4-1.503-.504-2.277-.296-.774.209-1.42.707-1.819,1.401-.825,1.434-.329,3.271,1.105,4.097l.451.259c-.102.544-.153,1.088-.153,1.625s.051,1.082.153,1.625l-.451.26c-1.434.825-1.93,2.663-1.105,4.096.399.695,1.045,1.192,1.819,1.401.773.21,1.583.104,2.277-.295l.45-.259c.841.72,1.81,1.28,2.857,1.649v.522c0,1.654,1.346,3,3,3s3-1.346,3-3v-.522c1.047-.37,2.016-.929,2.857-1.649l.45.258c.695.4,1.504.506,2.277.296.774-.209,1.42-.707,1.819-1.401.825-1.434.329-3.271-1.105-4.097Zm-2.556-3.744c.171.624.258,1.25.258,1.859s-.087,1.235-.258,1.859c-.121.439.071.905.466,1.132l1.093.628c.478.275.644.888.368,1.366-.133.231-.348.397-.606.467-.257.071-.527.035-.759-.099l-1.091-.627c-.396-.227-.895-.158-1.213.168-.889.908-2.012,1.557-3.25,1.876-.442.114-.75.512-.75.968v1.262c0,.551-.449,1-1,1s-1-.449-1-1v-1.262c0-.456-.309-.854-.75-.968-1.237-.319-2.361-.968-3.25-1.876-.193-.198-.453-.301-.715-.301-.17,0-.342.043-.498.133l-1.091.627c-.232.133-.503.168-.759.099-.258-.07-.473-.235-.606-.467-.275-.478-.109-1.09.369-1.365l1.093-.628c.395-.227.586-.693.466-1.132-.171-.624-.258-1.25-.258-1.859s.087-1.235.258-1.859c.121-.439-.071-.905-.466-1.132l-1.093-.628c-.478-.275-.644-.888-.368-1.366.133-.231.348-.397.606-.467.258-.069.528-.034.759.099l1.091.627c.396.228.895.158,1.213-.168.889-.908,2.012-1.557,3.25-1.876.442-.114.75-.512.75-.968v-1.262c0-.551.449-1,1-1s1,.449,1,1v1.262c0,.456.309.854.75.968,1.237.319,2.361.968,3.25,1.876.319.326.817.396,1.213.168l1.091-.627c.231-.134.5-.17.759-.099.258.07.473.235.606.467.275.478.109,1.09-.369,1.365l-1.093.628c-.395.227-.586.693-.466,1.132Zm-2.997,4.533c.368.412.333,1.044-.078,1.412-.191.171-.429.255-.667.255-.275,0-.548-.112-.746-.333-.574-.641-1.396-1.008-2.255-1.008s-1.681.368-2.255,1.008c-.368.411-1,.447-1.412.078-.412-.368-.446-1-.078-1.412.952-1.064,2.317-1.674,3.745-1.674s2.793.61,3.745,1.674Zm-6.245-5.174c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5-1.119,2.5-2.5,2.5-2.5-1.119-2.5-2.5Z"/>
                    </svg>
                    <p className="dashboard__sidebar__nav__element__p">Kontoindstillinger</p>
                </div>
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
