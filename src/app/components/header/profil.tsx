"use client"
import Link from "next/link";
import { useState } from 'react'
import { logout } from "../../lib"

export default function Profil(props) {

    const [showProfileDropdown, setShowProfileDropdown] = useState(false)

    function changeShowProfile() {
        if (showProfileDropdown) {
            setShowProfileDropdown(false)
        } else {
            setShowProfileDropdown(true)
        }
    }

    return (
        <div className="header__cta__profil__container" onClick={() => changeShowProfile()}>
            {props.user.userInformation.user__picture ? <>
                {props.user.userInformation.user__picture.picture__custom ? <div className="chat__wrapper__element__sidebar__profile">
                    <img src={props.user.userInformation.user__picture.picture__url} className="chat__wrapper__element__sidebar__profile__image" />
                </div> : <div className="chat__wrapper__element__sidebar__profile">
                    {props.user.userInformation.user__name.slice(0,1)}
                </div>}
            </> : <div className="chat__wrapper__element__sidebar__profile">
                {props.user.userInformation.user__name.slice(0,1)}
            </div>}
            {showProfileDropdown && <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__profil__menu" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>}
            {!showProfileDropdown && <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__profil__menu" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>}
            {showProfileDropdown && <div className="header__cta__profil__dropdown">
                {props.user.createduser ? <div className="header__cta__profil__dropdown__container">
                    <div className="header__cta__profil__dropdown__profile">
                        <p className="header__cta__profil__dropdown__profile__heading">{props.user.userInformation.user__name}</p>
                        <p className="header__cta__profil__dropdown__profile__p">{props.user.userInformation.user__email}</p>
                    </div>
                    <Link href="/dashboard/oversigt" className="header__cta__profil__dropdown__element">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="header__cta__profil__dropdown__element__icon">
                            <path d="M19,24H5c-2.757,0-5-2.243-5-5V9.724c0-1.665,.824-3.215,2.204-4.145L9.203,.855c1.699-1.146,3.895-1.146,5.594,0l7,4.724c1.379,.93,2.203,2.479,2.203,4.145v9.276c0,2.757-2.243,5-5,5ZM12,1.997c-.584,0-1.168,.172-1.678,.517L3.322,7.237c-.828,.558-1.322,1.487-1.322,2.486v9.276c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V9.724c0-.999-.494-1.929-1.321-2.486L13.678,2.514c-.51-.345-1.094-.517-1.678-.517Z"/>
                        </svg>
                        Oversigt
                    </Link>
                    <Link href="/dashboard/profil" className="header__cta__profil__dropdown__element">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="header__cta__profil__dropdown__element__icon">
                            <path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/>
                        </svg>
                        Profil
                    </Link>
                    <Link href="/dashboard/konto" className="header__cta__profil__dropdown__element">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="header__cta__profil__dropdown__element__icon">
                            <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/><path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z"/>
                        </svg>
                        Indstillinger
                    </Link>
                    <button className="header__cta__profil__dropdown__element" onClick={() => logout()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="header__cta__profil__dropdown__element__icon">
                            <path d="M22.829,9.172,18.95,5.293a1,1,0,0,0-1.414,1.414l3.879,3.879a2.057,2.057,0,0,1,.3.39c-.015,0-.027-.008-.042-.008h0L5.989,11a1,1,0,0,0,0,2h0l15.678-.032c.028,0,.051-.014.078-.016a2,2,0,0,1-.334.462l-3.879,3.879a1,1,0,1,0,1.414,1.414l3.879-3.879a4,4,0,0,0,0-5.656Z"/><path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z"/>
                        </svg>
                        Log ud
                    </button>
                    {props.user.accountInformation.account__type == "freelancer" && <>
                        {!props.user.accountInformation.account__type.abonnement__status && <Link href="/bliv-freelancer" className="header__cta__profil__dropdown__btn">
                            Opgrader til Partner
                        </Link>}
                    </>}
                </div> : <div className="header__cta__profil__dropdown__container">
                    <div className="header__cta__profil__dropdown__profile">
                        <p className="header__cta__profil__dropdown__profile__heading">{props.user.userInformation.user__name}</p>
                        <p className="header__cta__profil__dropdown__profile__p">{props.user.userInformation.user__email}</p>
                    </div>
                    <div className="header__cta__profil__dropdown__linkcontainer header__cta__profil__dropdown__linkcontainer__top">
                        <p className="header__cta__profil__dropdown__element header__cta__profil__dropdown__element__off">
                            Beskeder
                        </p>
                        <p className="header__cta__profil__dropdown__element header__cta__profil__dropdown__element__off">
                            Portefølje
                        </p>
                    </div>
                    <div className="header__cta__profil__dropdown__linkcontainer header__cta__profil__dropdown__linkcontainer__bottom">
                        <div className="header__cta__profil__dropdown__element header__cta__profil__dropdown__element__off">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="header__cta__profil__dropdown__element__icon">
                                <path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/>
                            </svg>
                            Profil
                        </div>
                        <div className="header__cta__profil__dropdown__element header__cta__profil__dropdown__element__off">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="header__cta__profil__dropdown__element__icon">
                                <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/><path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z"/>
                            </svg>
                            Indstillinger
                        </div>
                        <button className="header__cta__profil__dropdown__element" onClick={() => logout()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="header__cta__profil__dropdown__element__icon">
                                <path d="M22.829,9.172,18.95,5.293a1,1,0,0,0-1.414,1.414l3.879,3.879a2.057,2.057,0,0,1,.3.39c-.015,0-.027-.008-.042-.008h0L5.989,11a1,1,0,0,0,0,2h0l15.678-.032c.028,0,.051-.014.078-.016a2,2,0,0,1-.334.462l-3.879,3.879a1,1,0,1,0,1.414,1.414l3.879-3.879a4,4,0,0,0,0-5.656Z"/><path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z"/>
                            </svg>
                            Log ud
                        </button>
                    </div>
                    <Link href="/dashboard/onboarding" className="header__cta__profil__dropdown__btn">
                        Færdiggør oprettelse
                        <svg xmlns="http://www.w3.org/2000/svg" className="login__cta__main__icon" viewBox="0 0 24 24">
                            <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                        </svg>
                    </Link>
                </div>}
            </div>}
        </div>
    );
}
