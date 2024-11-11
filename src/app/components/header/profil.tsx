"use client"
import Link from "next/link";
import { useState } from 'react'
import { logout } from "../../lib"

export default function Profil() {

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
            {showProfileDropdown && <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__profil__menu" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>}
            {!showProfileDropdown && <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__profil__menu" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>}
            <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__profil__image" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            </svg>
            {showProfileDropdown && <div className="header__cta__profil__dropdown">
                <div className="header__cta__profil__dropdown__container">
                    <Link href="/dashboard" className="header__cta__profil__dropdown__element">Dashboard</Link>
                    <Link href="/dashboard/profil" className="header__cta__profil__dropdown__element">Profilindstillinger</Link>
                    <Link href="/dashboard/konto" className="header__cta__profil__dropdown__element">Kontoindstillinger</Link>
                    <button className="header__cta__profil__dropdown__element" onClick={() => logout()}>Log ud</button>
                </div>
            </div>}
        </div>
    );
}
