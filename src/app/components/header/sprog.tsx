"use client"
import { useState } from "react";
import Image from "next/image";

import Danmark from '../../assets/danmark.png';

export default function Sprog() {

    const [showDropdown, setShowDropdown] = useState(false)

    function changeShowProfile() {
        if (showDropdown) {
            setShowDropdown(false)
        } else {
            setShowDropdown(true)
        }
    }

    return (
        <div className="header__cta__icon__button" onClick={() => changeShowProfile()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="header__cta__icon" viewBox="0 0 24 24">
                <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm8.647,7H17.426a19.676,19.676,0,0,0-2.821-4.644A10.031,10.031,0,0,1,20.647,7ZM16.5,12a10.211,10.211,0,0,1-.476,3H7.976A10.211,10.211,0,0,1,7.5,12a10.211,10.211,0,0,1,.476-3h8.048A10.211,10.211,0,0,1,16.5,12ZM8.778,17h6.444A19.614,19.614,0,0,1,12,21.588,19.57,19.57,0,0,1,8.778,17Zm0-10A19.614,19.614,0,0,1,12,2.412,19.57,19.57,0,0,1,15.222,7ZM9.4,2.356A19.676,19.676,0,0,0,6.574,7H3.353A10.031,10.031,0,0,1,9.4,2.356ZM2.461,9H5.9a12.016,12.016,0,0,0-.4,3,12.016,12.016,0,0,0,.4,3H2.461a9.992,9.992,0,0,1,0-6Zm.892,8H6.574A19.676,19.676,0,0,0,9.4,21.644,10.031,10.031,0,0,1,3.353,17Zm11.252,4.644A19.676,19.676,0,0,0,17.426,17h3.221A10.031,10.031,0,0,1,14.605,21.644ZM21.539,15H18.1a12.016,12.016,0,0,0,.4-3,12.016,12.016,0,0,0-.4-3h3.437a9.992,9.992,0,0,1,0,6Z"/>
            </svg>
            {showDropdown && <div className="header__cta__profil__dropdown">
                <div className="header__cta__profil__dropdown__container">
                    <div className="language__container">
                        <div className="language__element">
                            <div className="language__element__icon">
                                <Image src={Danmark} className="language__element__icon__image" alt="Danmark" />
                            </div>
                            <p className="language__element__p">Dansk</p>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}
