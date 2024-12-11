"use client"
import { useState, useEffect } from 'react'
import { getUser, uploadPortfolioImage, getFreelancerInformation, handlePortfolioUpdate } from "../../lib"

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

export default function Portfolio() {

  const [pageLoading, setPageLoading] = useState(true)
  const [user, setUser] = useState<User | any>(null)
  
  async function getUserSession() {
    const userSession: any = {...await getUser()}
    const userData: any = {...await getFreelancerInformation(userSession.clientUserData.userInformation.user__id)}
    setUser(userData)
    setCases(userData.freelanceInformation.freelance__portfolio)
    setPageLoading(false)
  }

  useEffect(() => {
    getUserSession()
  }, []);

  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (event) => {
      setUploading(true)
      const uploadedImageUrl = await uploadPortfolioImage(event.target.files[0], user.userInformation.user__id)
      if (uploadedImageUrl) {
          setCurrentImageHandler(uploadedImageUrl)
      }
      setUploading(false)
  }

  const [loading, setLoading] = useState(false)
  const [createCase, setCreateCase] = useState(false)
  const [editCase, setEditCase] = useState(-1)
  const [currentImageHandler, setCurrentImageHandler] = useState("")
  const [cases, setCases] = useState([])

  async function handleUpdatedPortfolioCase(casesDupli: any) {
    setLoading(true)
    await handlePortfolioUpdate(casesDupli, user)
    setEditCase(-1)
    setCreateCase(false)
    setCurrentImageHandler("")
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
          <div className="dashboard__content__header">
            <div className="dashboard__content__header__indhold">
              <p className="dashboard__content__heading">Min portefølje</p>
              <p className="dashboard__content__p">Upload dit arbejde fra din portefølje, for at vise dine kompetencer offentligt på din profil.</p>
            </div>
          </div>
          {createCase ? <>
            {editCase >= 0 ? <form className="onboarding__portfolio__container" onSubmit={(e) => {
              e.preventDefault()
              handleUpdatedPortfolioCase(cases)
            }}>
              <div className="welcome__back__container" onClick={() => {setCreateCase(false); setEditCase(-1)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                      <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                  </svg>
                  <p className="welcome__back__h1">Gå tilbage</p>
              </div>
              <div className="portfolio__container">
                  {cases[editCase].portfolio__image != "" ? <div className="portfolio__selected portfolio__selected__empty">
                    <div className="portfolio__selected__image__container">
                          <img src={cases[editCase].portfolio__image} className="portfolio__selected__image__img" alt="" />
                    </div>
                  </div> : 
                  <div className="portfolio__selected portfolio__selected__empty">
                      {uploading ? <div className="loading__container">
                              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                      </div> : <div className="portfolio__selected__empty__container">
                          <svg xmlns="http://www.w3.org/2000/svg" className="portfolio__selected__empty__svg" viewBox="0 0 24 24">
                              <path d="M12,24c-.77,0-1.541-.073-2.291-.218-.542-.105-.897-.629-.792-1.171,.104-.542,.625-.895,1.171-.792,.625,.121,1.269,.182,1.912,.182,5.514,0,10-4.486,10-10S17.514,2,12,2c-.681,0-1.362,.069-2.023,.205-.543,.112-1.07-.237-1.181-.778-.111-.541,.237-1.07,.778-1.181,.794-.163,1.61-.246,2.426-.246,6.617,0,12,5.383,12,12s-5.383,12-12,12Zm-1.571-17.349l-3.137,3.143c-.39,.391-.389,1.024,.001,1.415,.392,.391,1.025,.389,1.415-.001l2.292-2.297v8.09c0,.552,.448,1,1,1s1-.448,1-1V8.91l2.292,2.297c.391,.391,1.023,.391,1.414,.001,.392-.39,.392-1.023,.002-1.415l-3.136-3.142c-.431-.429-.994-.645-1.558-.648-.005,0-.009-.003-.014-.003-.005,0-.009,.003-.013,.003-.565,.003-1.128,.218-1.558,.648ZM6.25,3.818c.452-.318,.56-.942,.242-1.394-.195-.276-.504-.424-.819-.424-.199,0-.399,.059-.575,.182-.671,.473-1.297,1.017-1.859,1.617-.378,.403-.357,1.036,.046,1.413,.403,.378,1.036,.358,1.413-.046,.469-.5,.991-.954,1.551-1.348Zm-3.55,4.5c.204-.513-.047-1.095-.561-1.298-.121-.048-.246-.071-.368-.071-.398,0-.774,.239-.93,.632-.285,.717-.5,1.467-.641,2.229-.1,.543,.259,1.065,.802,1.165,.544,.103,1.065-.259,1.165-.802,.117-.634,.296-1.258,.533-1.855Zm3.792,13.258c.318-.452,.209-1.076-.242-1.394-.56-.394-1.082-.848-1.551-1.348-.197-.21-.463-.316-.729-.316-.245,0-.491,.089-.684,.271-.403,.377-.424,1.01-.046,1.413,.562,.6,1.188,1.144,1.859,1.617,.453,.318,1.076,.209,1.394-.242Zm-3.792-5.894c-.237-.597-.416-1.221-.533-1.855-.089-.481-.509-.818-.982-.818-.06,0-.121,.005-.183,.017-.543,.1-.902,.622-.802,1.165,.141,.762,.356,1.512,.641,2.229,.203,.514,.782,.766,1.298,.561,.514-.204,.765-.785,.561-1.298Z"/>
                          </svg>
                          <p className="chat__list__container__empty__h1">Træk og Slip en valgfri fil</p>
                          <p className="chat__list__container__empty__p">For maksimal kvalitet, upload billeder i JPG, JPEG, PNG eller MP4</p>
                          <div className="header__cta__container component__info__cta">
                              <p className="header__cta__btn__transparent">Eller</p>
                              <label htmlFor="file-upload" className="file__upload__container">
                                  <p className="file__upload__p">Vælg fil til Upload</p>
                              </label>
                              <input id="file-upload" type="file" onChange={handleFileChange} />
                          </div>
                      </div>}
                  </div>}
              </div>
              <div className="welcome__selection__container">
                  <p className="logind__form__element__heading">Giv din case en overskrift<span></span></p>
                  <div className="welcome__dropdown__element__container">
                      <div className="welcome__dropdown__element__dropdown__container">
                          <input className="welcome__dropdown__element__dropdown__input" id="createcase__overskrift" autoComplete={"off"} placeholder="Beskriv, hvordan du har arbejdet med casen" value={cases[editCase].portfolio__overskrift} onChange={(e) => {
                            const casesDupli = [...cases]
                            casesDupli[editCase].portfolio__overskrift = e.target.value
                            setCases(casesDupli)
                          }} />
                      </div>
                  </div>
              </div>
              <div className="welcome__selection__container">
                  <p className="logind__form__element__heading">Beskriv samarbejdet med kunden<span></span></p>
                  <div className="welcome__dropdown__element__container">
                      <textarea className="welcome__dropdown__element__textarea" id="createcase__beskrivelse" autoComplete={"off"} placeholder="Beskriv, hvordan du har arbejdet med casen" value={cases[editCase].portfolio__beskrivelse} onChange={(e) => {
                            const casesDupli = [...cases]
                            casesDupli[editCase].portfolio__beskrivelse = e.target.value
                            setCases(casesDupli)
                        }} />
                  </div>
              </div>
              <div className="question__cta__container">
                  <button className={loading ? "question__cta__btn__fill logind__form__element__btn__disabled" : "question__cta__btn__fill"} type="submit">
                        {loading && <div className="loader_inline"></div>}
                        Opdater case
                        <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                            <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                        </svg>
                  </button>
                  <button className="question__cta__btn__transparent" onClick={() => {setCreateCase(false); setEditCase(-1)}}>
                      Gå tilbage
                  </button>
              </div>
            </form> : <form className="onboarding__portfolio__container" onSubmit={(e) => {
                e.preventDefault()
                if (currentImageHandler) {
                        setLoading(true)
                        const casesDupli = [...cases]
                        const overskriftElement = document.getElementById("createcase__overskrift")
                        const overskriftValue = (overskriftElement as HTMLInputElement).value
                        const beskrivelseElement = document.getElementById("createcase__beskrivelse")
                        const beskrivelseValue = (beskrivelseElement as HTMLInputElement).value

                        const data = {
                            portfolio__image: currentImageHandler,
                            portfolio__overskrift: overskriftValue,
                            portfolio__beskrivelse: beskrivelseValue
                        }

                        casesDupli.push(data);
                        (overskriftElement as HTMLInputElement).value = "";
                        (beskrivelseElement as HTMLInputElement).value = "";
                        setCases(casesDupli)
                        handleUpdatedPortfolioCase(casesDupli)
                }
            }}>
                <div className="welcome__back__container" onClick={() => {setCreateCase(false)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                        <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                    </svg>
                    <p className="welcome__back__h1">Gå tilbage</p>
                </div>
                <div className="portfolio__container">
                    {currentImageHandler != "" ? <div className="portfolio__selected portfolio__selected__empty">
                        <div className="portfolio__selected__image__container">
                            <img src={currentImageHandler} className="portfolio__selected__image__img" alt="" />
                        </div>
                    </div> : 
                    <div className="portfolio__selected portfolio__selected__empty">
                        {uploading ? <div className="loading__container">
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                        </div> : <div className="portfolio__selected__empty__container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="portfolio__selected__empty__svg" viewBox="0 0 24 24">
                                <path d="M12,24c-.77,0-1.541-.073-2.291-.218-.542-.105-.897-.629-.792-1.171,.104-.542,.625-.895,1.171-.792,.625,.121,1.269,.182,1.912,.182,5.514,0,10-4.486,10-10S17.514,2,12,2c-.681,0-1.362,.069-2.023,.205-.543,.112-1.07-.237-1.181-.778-.111-.541,.237-1.07,.778-1.181,.794-.163,1.61-.246,2.426-.246,6.617,0,12,5.383,12,12s-5.383,12-12,12Zm-1.571-17.349l-3.137,3.143c-.39,.391-.389,1.024,.001,1.415,.392,.391,1.025,.389,1.415-.001l2.292-2.297v8.09c0,.552,.448,1,1,1s1-.448,1-1V8.91l2.292,2.297c.391,.391,1.023,.391,1.414,.001,.392-.39,.392-1.023,.002-1.415l-3.136-3.142c-.431-.429-.994-.645-1.558-.648-.005,0-.009-.003-.014-.003-.005,0-.009,.003-.013,.003-.565,.003-1.128,.218-1.558,.648ZM6.25,3.818c.452-.318,.56-.942,.242-1.394-.195-.276-.504-.424-.819-.424-.199,0-.399,.059-.575,.182-.671,.473-1.297,1.017-1.859,1.617-.378,.403-.357,1.036,.046,1.413,.403,.378,1.036,.358,1.413-.046,.469-.5,.991-.954,1.551-1.348Zm-3.55,4.5c.204-.513-.047-1.095-.561-1.298-.121-.048-.246-.071-.368-.071-.398,0-.774,.239-.93,.632-.285,.717-.5,1.467-.641,2.229-.1,.543,.259,1.065,.802,1.165,.544,.103,1.065-.259,1.165-.802,.117-.634,.296-1.258,.533-1.855Zm3.792,13.258c.318-.452,.209-1.076-.242-1.394-.56-.394-1.082-.848-1.551-1.348-.197-.21-.463-.316-.729-.316-.245,0-.491,.089-.684,.271-.403,.377-.424,1.01-.046,1.413,.562,.6,1.188,1.144,1.859,1.617,.453,.318,1.076,.209,1.394-.242Zm-3.792-5.894c-.237-.597-.416-1.221-.533-1.855-.089-.481-.509-.818-.982-.818-.06,0-.121,.005-.183,.017-.543,.1-.902,.622-.802,1.165,.141,.762,.356,1.512,.641,2.229,.203,.514,.782,.766,1.298,.561,.514-.204,.765-.785,.561-1.298Z"/>
                            </svg>
                            <p className="chat__list__container__empty__h1">Træk og Slip en valgfri fil</p>
                            <p className="chat__list__container__empty__p">For maksimal kvalitet, upload billeder i JPG, JPEG, PNG eller MP4</p>
                            <div className="header__cta__container component__info__cta">
                                <p className="header__cta__btn__transparent">Eller</p>
                                <label htmlFor="file-upload" className="file__upload__container">
                                    <p className="file__upload__p">Vælg fil til Upload</p>
                                </label>
                                <input id="file-upload" type="file" onChange={handleFileChange} />
                            </div>
                        </div>}
                    </div>}
                </div>
                <div className="welcome__selection__container">
                    <p className="logind__form__element__heading">Giv din case en overskrift<span></span></p>
                    <div className="welcome__dropdown__element__container">
                        <div className="welcome__dropdown__element__dropdown__container">
                            <input className="welcome__dropdown__element__dropdown__input" id="createcase__overskrift" autoComplete={"off"} placeholder="Beskriv, hvordan du har arbejdet med casen" />
                        </div>
                    </div>
                </div>
                <div className="welcome__selection__container">
                    <p className="logind__form__element__heading">Beskriv samarbejdet med kunden<span></span></p>
                    <div className="welcome__dropdown__element__container">
                        <textarea className="welcome__dropdown__element__textarea" id="createcase__beskrivelse" autoComplete={"off"} placeholder="Beskriv, hvordan du har arbejdet med casen" />
                    </div>
                </div>
                <div className="question__cta__container">
                    <button className={loading ? "question__cta__btn__fill logind__form__element__btn__disabled" : "question__cta__btn__fill"} type="submit">
                            {loading && <div className="loader_inline"></div>}
                            Opret case
                            <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                                <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                            </svg>
                    </button>
                    <button className="question__cta__btn__transparent" onClick={() => {setCreateCase(false); setEditCase(-1)}}>
                        Gå tilbage
                    </button>
                </div>
            </form>}
            </> : <div className="onboarding__portfolio__container">
              <ul className="onboarding__portfolio__wrapper">
                  {cases.map((myCase, myCaseIndex) => {
                        return (<li key={"case-" + myCaseIndex} className="onboarding__portfolio__element">
                        <div className="onboarding__portfolio__element__btn" onClick={() => {setCreateCase(true); setEditCase(myCaseIndex)}}>
                            <div className="onboarding__portfolio__element__image">
                                <img src={myCase.portfolio__image} alt={myCase.portfolio__overskrift} className="onboarding__portfolio__element__image__file" />
                            </div>
                            <div className="onboarding__portfolio__element__info">
                                <p className="onboarding__portfolio__element__info__h1">{myCase.portfolio__overskrift}</p>
                                <p className="onboarding__portfolio__element__info__p">{myCase.portfolio__beskrivelse}</p>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="onboarding__portfolio__element__icon" viewBox="0 0 24 24" onClick={() => {
                            const casesDupli = [...cases]
                            casesDupli.splice(myCaseIndex, 1)
                            setCases(casesDupli)
                            handleUpdatedPortfolioCase(casesDupli)
                        }}>
                            <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/>
                        </svg>
                      </li>)
                  })}
                  <li className="onboarding__portfolio__element onboarding__portfolio__element__add" onClick={() => setCreateCase(true)}>
                    <div className="onboarding__portfolio__element__btn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="onboarding__portfolio__element__add__icon" viewBox="0 0 24 24">
                          <path d="m12,21c0,.553-.448,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h12c2.757,0,5,2.243,5,5v6c0,.553-.448,1-1,1s-1-.447-1-1v-6c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v6.959l2.808-2.808c1.532-1.533,4.025-1.533,5.558,0l5.341,5.341c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-5.341-5.341c-.752-.751-1.976-.752-2.73,0l-4.222,4.222v2.213c0,1.654,1.346,3,3,3h6c.552,0,1,.447,1,1ZM15,3.5c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm0,2c-.551,0-1,.448-1,1s.449,1,1,1,1-.448,1-1-.449-1-1-1Zm8,12.5h-3v-3c0-.553-.448-1-1-1s-1,.447-1,1v3h-3c-.552,0-1,.447-1,1s.448,1,1,1h3v3c0,.553.448,1,1,1s1-.447,1-1v-3h3c.552,0,1-.447,1-1s-.448-1-1-1Z"/>
                        </svg>
                        <p className="onboarding__portfolio__element__add__h1">Tilføj ny case</p>
                    </div>
                  </li>
              </ul>
          </div>}
        </div>}
      </div>
      </>}
    </>
  );
}
