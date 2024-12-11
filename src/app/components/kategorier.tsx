"use client"
import Link from "next/link";
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getKategorier } from "../assets/lister/lister";

export default function Kategorier() {

    const pathname = usePathname()

    const [slided, SetSlided] = useState(false);

    function slideKategorier(side: string) {
        if (side == "right") {
            document.getElementById("kategorierWrapper")!.style.transform = "translateX(-70%)";
            document.getElementById("kategorierSlider")!.style.justifyContent = "flex-start";
            document.getElementById("kategorierSlider")!.style.left = "0";
            document.getElementById("kategorierSlider")!.style.right = "auto";
            document.getElementById("kategorierSlider")!.style.background = "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%)";
            SetSlided(true);
        } else {
            document.getElementById("kategorierWrapper")!.style.transform = "translateX(0%)";
            document.getElementById("kategorierSlider")!.style.justifyContent = "flex-end";
            document.getElementById("kategorierSlider")!.style.left = "auto";
            document.getElementById("kategorierSlider")!.style.right = "0";
            document.getElementById("kategorierSlider")!.style.background = "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 80%, rgba(255,255,255,1) 100%)";
            SetSlided(false);
        }
    }

    useEffect(() => {
        setCurrentKategori(pathname.replace("/freelance-kategorier/", ''))
    })

    const [kategoriList] = useState(getKategorier())
    const [currentKategori, setCurrentKategori] = useState("")

    return (
        <div className="kategorier__padding">
            <div className="kategorier__container">
                <div className="kategorier__slider" id="kategorierSlider">
                    {!slided && <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="kategorier__slider__icon__left kategorier__slider__icon__off" viewBox="0 0 24 24">
                            <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => slideKategorier("right")} className="kategorier__slider__icon" viewBox="0 0 24 24">
                            <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                        </svg>
                    </>}
                    {slided && <>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => slideKategorier("left")} className="kategorier__slider__icon__left" viewBox="0 0 24 24">
                            <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="kategorier__slider__icon kategorier__slider__icon__off" viewBox="0 0 24 24">
                            <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                        </svg>
                    </>}
                </div>
                <div className="kategorier__wrapper" id="kategorierWrapper">
                    {currentKategori !== "" && kategoriList.map((kategori, index) => {
                        if (kategori.navn == "Andet") {
                            return (<Link key={"kategori-" + index} href={"/freelance-kategorier/" + kategori.navn.replace(" ", "-")} className={currentKategori == kategori.navn.replace(" ", "-") ? "kategorier__element kategorier__element__other" : "kategorier__element kategorier__element__other kategorier__element__off"}>
                                {kategori.svg}
                                <p className="kategorier__element__p">{kategori.navn}</p>
                            </Link>)
                        } else {
                            return (<Link key={"kategori-" + index} href={"/freelance-kategorier/" + kategori.navn.replace(" ", "-")} className={currentKategori == kategori.navn.replace(" ", "-") ? "kategorier__element" : "kategorier__element kategorier__element__off"}>
                                {kategori.svg}
                                <p className="kategorier__element__p">{kategori.navn}</p>
                            </Link>)
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
