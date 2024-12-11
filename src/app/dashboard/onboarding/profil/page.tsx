"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { getFreelancerInformation, getUser, updateUser, uploadPortfolioImage } from "@/app/lib";

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
        freelance__pricing: {
            pricing__packages: {
                package__description: string;
                package__name: string;
                package__price: number;
                package__includes: string[]
            }[];
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
        user__id: string;
    };
    portfolioInformation: string[]
};

export default function Freelancer() {
    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState<User | null>(null)

    async function getFreelancer() {
        const userData: any = {...await getUser()}
        const freelancerData: any = {...await getFreelancerInformation(userData.clientUserData.userInformation.user__id)}
        setUser(freelancerData)
        console.log(freelancerData)
        setLoading(false)
    }

    useEffect(() => {
        getFreelancer()
    }, [])

    const [selectedImage, setSelectedImage] = useState(0)

    const [saveLoading, setSaveLoading] = useState(false)
    async function saveEditedUser() {
        setSaveLoading(true)
        await updateUser(user)
        setSaveLoading(false)
    }

    const [createCase, setCreateCase] = useState(false)
    const [currentImageHandler, setCurrentImageHandler] = useState("")
    const [uploading, setUploading] = useState(false)
    const handleFileChange = async (event) => {
        setUploading(true)
        const uploadedImageUrl = await uploadPortfolioImage(event.target.files[0], user.userInformation.user__id)
        if (uploadedImageUrl) {
            setCurrentImageHandler(uploadedImageUrl)
        }
        setUploading(false)
    }

    return (
        <div className="profil__container preview__container">
            {loading ? <div className="profil__loading__container">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div> : <div className="preview__wrapper">
                <p className="preview__icon">Preview</p>
                <div className="profil__hero__container">
                    <div className="priser__hero__indhold">
                        <div className="profil__tags__container">
                            <div className="profil__cta__container">
                                <div className="profil__cta__btns">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="profil__cta__btn" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="profil__cta__btn" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"/>
                                        <path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <input className="profil__h1 preview__profil__h1" placeholder={"Giv din ydelse en overskrift..."} value={user.freelanceInformation.freelance__overskrift} onChange={(e) => {
                            const freelancerDupli = {...user}
                            freelancerDupli.freelanceInformation.freelance__overskrift = e.target.value
                            setUser(freelancerDupli)
                        }} />
                        <div className="profil__location__wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" className="profil__reviews__icon" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <p className="profil__reviews__p">{user.freelanceInformation.freelance__reviews.reviews__rating} <span>({user.freelanceInformation.freelance__reviews.reviews__data.length})</span></p>
                        </div>
                        <div className="salecard__element__indhold__tags__container">
                            {user.freelanceInformation.freelance__tags.map((tag: string) => {
                                return <div key={tag} className="salecard__element__indhold__tags__element">{tag}</div>
                            })}
                        </div>
                    </div>
                    {/* <div className="home__hero__background">
                        <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
                    </div> */}
                </div>
                <div className="profil__indhold__container">
                    <div className="profil__content__container">
                        <div className="portfolio__container">
                            <div className="portfolio__selected">
                                {user.freelanceInformation.freelance__portfolio.length > 0 ? 
                                    <img src={user.freelanceInformation.freelance__portfolio[selectedImage].portfolio__image} className="portfolio__selected__image__img" alt="" />
                                    : <div className="portfolio__selected__image__img" style={{width: "100%"}}>
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
                                        </div>
                                    </div>
                                }
                            </div>
                            <ul className="portfolio__miniatures__container">
                                {user.freelanceInformation.freelance__portfolio.map((portfolioCase, portfolioCaseIndex) => {
                                    return (
                                        <li key={"portfoliocase-" + portfolioCaseIndex} className={selectedImage == portfolioCaseIndex ? "portfolio__miniatures__element" : "portfolio__miniatures__element portfolio__miniatures__element__off"} onClick={() => setSelectedImage(portfolioCaseIndex)}><img src={portfolioCase.portfolio__image} className="portfolio__selected__image__img" alt="" /></li>
                                    )
                                })}
                            </ul>
                        </div>
                        <pre className="textsection__container">
                            <textarea className="textsection__element__p preview__textsection__element__p" placeholder={"Skriv en detaljeret beskrivelse af din ydelse..."} value={user.freelanceInformation.freelance__beskrivelse} onChange={(e) => {
                                const freelancerDupli = {...user}
                                freelancerDupli.freelanceInformation.freelance__beskrivelse = e.target.value
                                setUser(freelancerDupli)
                            }} />
                        </pre>
                        <div className="anmeldelser__content">
                            <div className="anmeldelser__header">
                                <div className="anmeldelser__header__stats">
                                    <div className="anmeldelser__header__stats__overview">
                                        <p className="anmeldelser__header__stats__overview__h1">Anmeldelser <span>({user.freelanceInformation.freelance__reviews.reviews__data.length})</span></p>
                                        <div className="anmeldelser__header__stats__overview__heading">
                                            <p className="anmeldelser__header__stats__overview__heading__h1">{user.freelanceInformation.freelance__reviews.reviews__rating}</p>
                                            <div className="anmeldelser__header__stats__overview__heading__stars">
                                                {user.freelanceInformation.freelance__reviews.reviews__rating >= 1 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                </svg>}
                                                {user.freelanceInformation.freelance__reviews.reviews__rating >= 2 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                </svg>}
                                                {user.freelanceInformation.freelance__reviews.reviews__rating >= 3 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                </svg>}
                                                {user.freelanceInformation.freelance__reviews.reviews__rating >= 4 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                </svg>}
                                                {user.freelanceInformation.freelance__reviews.reviews__rating >= 5 ? <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" className="anmeldelser__header__stats__overview__heading__stars__element">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                </svg>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="anmeldelser__header__stats__content">
                                        <div className="anmeldelser__header__stats__content__element">
                                            <p className="anmeldelser__header__stats__content__element__p">5 stjerner</p>
                                            <div className="anmeldelser__header__stats__content__element__line">
                                                <div className="anmeldelser__header__stats__content__element__line__active" style={{width: user.freelanceInformation.freelance__reviews.reviews__5star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                            </div>
                                            <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{user.freelanceInformation.freelance__reviews.reviews__5star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                        </div>
                                        <div className="anmeldelser__header__stats__content__element">
                                            <p className="anmeldelser__header__stats__content__element__p">4 stjerner</p>
                                            <div className="anmeldelser__header__stats__content__element__line">
                                                <div className="anmeldelser__header__stats__content__element__line__active" style={{width: user.freelanceInformation.freelance__reviews.reviews__4star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                            </div>
                                            <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{user.freelanceInformation.freelance__reviews.reviews__4star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                        </div>
                                        <div className="anmeldelser__header__stats__content__element">
                                            <p className="anmeldelser__header__stats__content__element__p">3 stjerner</p>
                                            <div className="anmeldelser__header__stats__content__element__line">
                                                <div className="anmeldelser__header__stats__content__element__line__active" style={{width: user.freelanceInformation.freelance__reviews.reviews__3star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                            </div>
                                            <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{user.freelanceInformation.freelance__reviews.reviews__3star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                        </div>
                                        <div className="anmeldelser__header__stats__content__element">
                                            <p className="anmeldelser__header__stats__content__element__p">2 stjerner</p>
                                            <div className="anmeldelser__header__stats__content__element__line">
                                                <div className="anmeldelser__header__stats__content__element__line__active" style={{width: user.freelanceInformation.freelance__reviews.reviews__2star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                            </div>
                                            <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{user.freelanceInformation.freelance__reviews.reviews__2star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                        </div>
                                        <div className="anmeldelser__header__stats__content__element">
                                            <p className="anmeldelser__header__stats__content__element__p">1 stjerne</p>
                                            <div className="anmeldelser__header__stats__content__element__line">
                                                <div className="anmeldelser__header__stats__content__element__line__active" style={{width: user.freelanceInformation.freelance__reviews.reviews__1star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100 + "%"}}></div>
                                            </div>
                                            <p className="anmeldelser__header__stats__content__element__p anmeldelser__header__stats__content__element__p__procent">{user.freelanceInformation.freelance__reviews.reviews__1star / user.freelanceInformation.freelance__reviews.reviews__data.length * 100}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {createCase ? <form className="onboarding__portfolio__container" onSubmit={(e) => {
                            e.preventDefault()
                            const userDupli = {...user.freelanceInformation.freelance__pricing.pricing__packages}
                            const pakkerDupli = [...userDupli.freelanceInformation.freelance__pricing.pricing__packages]
                            const overskriftElement = document.getElementById("createpakke__overskrift")
                            const overskriftValue = (overskriftElement as HTMLInputElement).value
                            const prisElement = document.getElementById("createpakke__pris")
                            const prisValue = (prisElement as HTMLInputElement).value
                            const beskrivelseElement = document.getElementById("createpakke__beskrivelse")
                            const beskrivelseValue = (beskrivelseElement as HTMLInputElement).value

                            const data = {
                                navn: overskriftValue,
                                price: prisValue,
                                beskrivelse: beskrivelseValue,
                                antalTegn: 0,
                                maxTegn: 128,
                                inkluderet: []
                            }

                            pakkerDupli.push(data);
                            (overskriftElement as HTMLInputElement).value = "";
                            (prisElement as HTMLInputElement).value = "";
                            (beskrivelseElement as HTMLInputElement).value = "";
                            setUser(userDupli)
                            setCreateCase(false)
                        }}>
                            <div className="welcome__back__container" onClick={() => setCreateCase(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                                    <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                                </svg>
                                <p className="welcome__back__h1">Gå tilbage</p>
                            </div>
                            <div className="opretkonto__priser__element">
                                <input className="opretkonto__priser__element__h1" id={"createpakke__overskrift"} placeholder={"Giv din pakkeløsning en overskrift"} />
                                <div className="opretkonto__priser__element__price">
                                    <p className="opretkonto__priser__element__price__h1">DKK</p>
                                    <input type="number" className="opretkonto__priser__element__price__input" placeholder={"00,00"} id={"createpakke__pris"} />
                                </div>
                                <div className="welcome__selection__container">
                                    <p className="logind__form__element__heading">Hvad inkluderer denne pakke?</p>
                                    <div className="welcome__dropdown__element__container">
                                        <textarea className="welcome__dropdown__element__textarea" autoComplete={"off"} placeholder={"Skriv en beskrivelse til pakken..."} id={"createpakke__beskrivelse"} />
                                    </div>
                                </div>
                            {/*  <div className="welcome__selection__container">
                                    <p className="logind__form__element__heading">Inkluderet</p>
                                    <div className="welcome__dropdown__element__container">
                                        <ul className="welcome__list__ul">
                                            {pakke.inkluderet.map((pakkeInklude, pakkeInkludeIndex) => {
                                                return (<li key={pakkeInklude + "-" + pakkeInkludeIndex} className="welcome__list__li">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="welcome__list__li__svg">
                                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                                    </svg>
                                                    <p className="welcome__list__li__p">{pakkeInklude}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                                                        const questionsDupli = [...questions]
                                                        questionsDupli[question.id].sections[sectionIndex].pakker[pakkeIndex].inkluderet.splice(pakkeInkludeIndex, 1)
                                                        setQuestions(questionsDupli)
                                                    }} viewBox="0 0 24 24" className="welcome__list__li__svg__remove">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                                    </svg>
                                                </li>)
                                            })}
                                            <li className="welcome__list__li welcome__list__li__add">
                                                <form className="welcome__dropdown__element__dropdown__container" onSubmit={(e) => {
                                                        e.preventDefault()
                                                        const questionsDupli = [...questions]
                                                        const dataElement = document.getElementById("inkluderet-" + sectionIndex + "-add")
                                                        const dataValue = (dataElement as HTMLInputElement).value

                                                        questionsDupli[question.id].sections[sectionIndex].pakker[pakkeIndex].inkluderet.push(dataValue);
                                                        (dataElement as HTMLInputElement).value = "";
                                                        setQuestions(questionsDupli)
                                                    }}>
                                                    <input className="welcome__dropdown__element__dropdown__input" autoComplete={"off"} placeholder={"Tilføj punkt..."} />
                                                    <button type="submit" className="welcome__list__li__add__btn">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                                        </svg>
                                                    </button>
                                                </form>
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                            <div className="question__cta__container">
                                <button className="question__cta__btn__fill" type="submit">
                                    Opret Pakkeløsning
                                    <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                                        <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                                    </svg>
                                </button>
                                <button className="question__cta__btn__transparent" onClick={() => setCreateCase(false)}>
                                    Gå tilbage
                                </button>
                            </div>
                        </form> : 
                        <ul className="abonnement__cards__container">
                            {user.freelanceInformation.freelance__pricing.pricing__packages.map((pricePackage, pricePackageIndex) => {
                                return (<li key={"package-" + pricePackageIndex} className="opretkonto__priser__element">
                                    <p className="opretkonto__priser__element__h1">{pricePackage.package__name}</p>
                                    <p className="opretkonto__priser__element__h2">Denne pakke tilbydes af {user.userInformation.user__name}</p>
                                    <div className="opretkonto__priser__element__price">
                                        <p className="opretkonto__priser__element__price__h1">DKK</p>
                                        <p className="opretkonto__priser__element__price__input">{pricePackage.package__price}</p>
                                    </div>
                                    <div className="question__cta__container">
                                        <button className="abonnement__cta__btn__outline" onClick={() => {}}>
                                            Vælg pakke
                                            <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                                                <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="welcome__selection__container">
                                        <p className="logind__form__element__heading">Inkluderet</p>
                                        <div className="welcome__dropdown__element__container">
                                            <ul className="welcome__list__ul">
                                                {pricePackage.package__includes.map((inkluderet, inkluderetIndex) => {
                                                    return (<li key={"inkluderet-" + inkluderetIndex} className="welcome__list__li">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="welcome__list__li__svg">
                                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                                        </svg>
                                                        <p className="welcome__list__li__p">{inkluderet}</p>
                                                    </li>)
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </li>)
                            })}
                            <li className="onboarding__portfolio__element onboarding__portfolio__element__add" onClick={() => setCreateCase(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="onboarding__portfolio__element__add__icon" viewBox="0 0 24 24">
                                    <path d="M23,19H21V17a1,1,0,0,0-2,0v2H17a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V21h2a1,1,0,0,0,0-2Z"/><path d="M21,6H18A6,6,0,0,0,6,6H3A3,3,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5h9a1,1,0,0,0,0-2H5a3,3,0,0,1-3-3V9A1,1,0,0,1,3,8H6v2a1,1,0,0,0,2,0V8h8v2a1,1,0,0,0,2,0V8h3a1,1,0,0,1,1,1v5a1,1,0,0,0,2,0V9A3,3,0,0,0,21,6ZM8,6a4,4,0,0,1,8,0Z"/>
                                </svg>
                                <p className="onboarding__portfolio__element__add__h1">Tilføj ny Pakkeløsning</p>
                            </li>
                        </ul>}
                    </div>
                    <div className="profil__sidebar__container">
                        <div className="freelancer__sidebar__container">
                            <div className="freelancer__sidebar__banner">
                                <div className="freelancer__sidebar__banner__profilepicture">
                                    <img className="freelancer__sidebar__banner__profilepicture__image" src={user.userInformation.user__picture.picture__url} alt="" />
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="preview__top__right__edit" viewBox="0 0 24 24">
                                    <path d="m13.75,11.664l-3.457,3.457c-.559.559-1.332.879-2.121.879h-.172v-.172c0-.789.32-1.562.879-2.121l3.457-3.457,1.414,1.414Zm1.043-3.871l-1.043,1.043,1.414,1.414,1.043-1.043c.39-.39.39-1.024,0-1.414s-1.023-.391-1.414,0Zm9.207,4.207c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-6.379-5.621c-1.17-1.17-3.072-1.17-4.242,0l-5.914,5.914c-.944.944-1.465,2.2-1.465,3.535v1.172c0,.553.447,1,1,1h1.172c1.335,0,2.591-.521,3.535-1.465l5.914-5.914c1.17-1.17,1.17-3.072,0-4.242Z"/>
                                </svg>
                            </div>
                            <div className="freelancer__sidebar__info__container">
                                <div className="freelance__sidebar__tags__wrapper">
                                    {user.freelanceInformation.freelance__profile.profile__tags.map((tag) => {
                                        return (<div key={tag.tag__id} className="profil__tag__container" style={{backgroundColor: tag.tag_color}}>
                                            {tag.tag__id == "workflowVerified" && <svg xmlns="http://www.w3.org/2000/svg" className="profil__verified__icon" viewBox="0 0 16 16">
                                                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                            </svg>}
                                            {tag.tag__id == "topSeller" && <svg xmlns="http://www.w3.org/2000/svg" className="profil__verified__icon" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.18.18 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.18.18 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.18.18 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.18.18 0 0 1-.134-.098z"/>
                                            </svg>}
                                            <p className="profil__verified__heading">{tag.tag__name}</p>
                                            <div className="profil__tag__popup">
                                                <div className="profil__tag__popup__arrow"></div>
                                                <p className="profil__tag__popup__p">{user.userInformation.user__name} {tag.tag__description}</p>
                                            </div>
                                        </div>)
                                    })}
                                </div>
                                <div className="freelancer__sidebar__info__hero">
                                    <p className="freelancer__sidebar__info__hero__heading">{user.userInformation.user__name}</p>
                                    <p className="freelancer__sidebar__info__hero__location">{user.userInformation.user__location} &#183; {user.freelanceInformation.freelance__profile.profile__type}</p>
                                    <textarea className="freelancer__sidebar__info__hero__oneliner preview__freelancer__sidebar__info__hero__oneliner" placeholder={"Beskriv, hvem du er..."} value={user.freelanceInformation.freelance__profile.profile__about !== "" ? user.freelanceInformation.freelance__profile.profile__about : "Jeg hedder " + user.userInformation.user__name + ", og jeg kommer fra " + user.userInformation.user__location.charAt(0).toUpperCase() + user.userInformation.user__location.slice(1) + "."} onChange={(e) => {
                                        const freelancerDupli = {...user}
                                        freelancerDupli.freelanceInformation.freelance__profile.profile__about = e.target.value
                                        setUser(freelancerDupli)
                                    }} />
                                </div>
                                <div className="freelancer__sidebar__info__highlights">
                                    <div className="freelancer__sidebar__info__highlights__element">
                                        <div className="freelancer__sidebar__info__highlights__element__main">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="freelancer__sidebar__info__highlights__element__main__icon" viewBox="0 0 24 24">
                                                <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,21a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Z"/><path d="M10.5,11.055l-2.4,1.5a1.5,1.5,0,0,0-.475,2.068h0a1.5,1.5,0,0,0,2.068.475l2.869-1.8a2,2,0,0,0,.938-1.7V7.772a1.5,1.5,0,0,0-1.5-1.5h0a1.5,1.5,0,0,0-1.5,1.5Z"/>
                                            </svg>
                                            <p className="freelancer__sidebar__info__highlights__element__main__p">x min</p>
                                        </div>
                                        <p className="freelancer__sidebar__info__highlights__element__p">Gns. svartid</p>
                                    </div>
                                    <div className="freelancer__sidebar__info__highlights__element freelancer__sidebar__info__highlights__element__middle">
                                        <div className="freelancer__sidebar__info__highlights__element__main">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="freelancer__sidebar__info__highlights__element__main__icon" viewBox="0 0 24 24">
                                                <path d="M21.557,7.153L15.318,.964C14.547,.232,13.5-.105,12.447,.03L5.821,.905c-.821,.109-1.399,.862-1.291,1.684,.108,.822,.867,1.402,1.684,1.291l6.626-.875c.15-.02,.301,.028,.388,.112l6.201,6.152c.757,.773,.756,2.03,.007,2.793l-.512,.512c-.113-.145-.236-.285-.367-.419l-6.238-6.189c-.771-.732-1.819-1.07-2.871-.935l-6.626,.875c-.701,.093-1.242,.663-1.299,1.368l-.511,6.396c-.086,1.059,.307,2.086,1.054,2.795l6.086,6.035c.947,.967,2.214,1.5,3.567,1.501h.005c1.352,0,2.617-.53,3.564-1.494l3.278-3.333c.927-.944,1.401-2.178,1.421-3.421l1.579-1.579c1.896-1.929,1.898-5.072-.01-7.02Zm-5.13,9.917l-3.277,3.333c-.379,.386-.887,.598-1.428,.598-.542,0-1.049-.214-1.442-.616l-6.124-6.072c-.109-.104-.166-.25-.153-.402l.414-5.189,5.424-.716c.148-.024,.301,.028,.388,.112l6.201,6.152c.757,.773,.756,2.03-.002,2.802Zm-7.427-5.57c-.034,1.972-2.967,1.971-3,0,.034-1.972,2.967-1.971,3,0Z"/>
                                            </svg>
                                            <p className="freelancer__sidebar__info__highlights__element__main__p">xxxx kr.</p>
                                        </div>
                                        <p className="freelancer__sidebar__info__highlights__element__p">Gns. pris</p>
                                    </div>
                                    <div className="freelancer__sidebar__info__highlights__element">
                                        <div className="freelancer__sidebar__info__highlights__element__main">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="freelancer__sidebar__info__highlights__element__main__icon" viewBox="0 0 24 24">
                                                <path d="m20.697,14.025c-1.32-1.319-3.621-1.322-4.945-.005l-.411.404c-2.586-1.199-4.48-3.101-5.754-5.777l.388-.395c.661-.661,1.025-1.54,1.025-2.475s-.364-1.814-.986-2.436l-2.152-2.317c-1.309-1.309-3.583-1.326-4.908-.041,0,0-1.067.93-1.092.954C.662,3.138,0,4.758,0,6.5c0,7.523,9.977,17.5,17.5,17.5,1.743,0,3.363-.662,4.562-1.863.024-.024.954-1.091.954-1.091,1.323-1.367,1.309-3.557-.082-4.946l-2.237-2.074Zm.156,4.941c-.024.024-.948,1.083-.948,1.083-.629.613-1.481.95-2.405.95-5.51,0-14.5-8.101-14.5-14.5,0-.924.337-1.776.95-2.405,0,0,1.06-.924,1.084-.948.127-.128.276-.146.353-.146s.226.019.314.106l2.152,2.317c.127.128.146.276.146.354,0,.077-.019.226-.155.362l-1.108,1.126c-.418.425-.545,1.058-.323,1.61,1.694,4.221,4.632,7.153,8.732,8.719.55.21,1.169.079,1.587-.332,0,0,1.133-1.114,1.136-1.117.127-.128.276-.146.353-.146s.226.019.394.186l2.237,2.074c.195.195.195.512,0,.707Zm-6.559-14.473c-.267-.226-.364-.594-.243-.922.12-.328.432-.546.782-.546h2.501l.885-2.483c.121-.326.433-.542.781-.542s.66.216.781.542l.885,2.483h2.501c.35,0,.663.219.783.548.12.329.022.698-.246.923l-1.971,1.606.815,2.484c.112.336-.002.706-.282.922-.281.216-.667.231-.964.038l-2.295-1.495-2.257,1.51c-.14.094-.302.141-.464.141-.176,0-.352-.056-.5-.166-.283-.212-.401-.58-.295-.917l.784-2.513-1.981-1.612Z"/>
                                            </svg>
                                            <p className="freelancer__sidebar__info__highlights__element__main__p">xx</p>
                                        </div>
                                        <p className="freelancer__sidebar__info__highlights__element__p">Henvendelser</p>
                                    </div>
                                </div>
                            </div>
                            <div className="freelancer__sidebar__cta__container">
                                <button className="freelancer__sidebar__cta__btn__fill" onClick={() => kontaktfreelancer()}>
                                    {loading ? <div className="loader"></div> : "Kontakt Freelancer"}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="freelancer__sidebar__cta__icon" viewBox="0 0 24 24">
                                        <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/>
                                    </svg>
                                </button>
                                <button className="freelancer__sidebar__cta__btn__fill freelancer__sidebar__cta__btn__transparent">
                                    <p className="freelancer__sidebar__cta__btn__transparent__text">Sammenlign pakker</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}
