"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { getKategorier, getFilters } from "../../assets/lister/lister";
import { getFreelancers } from "../../lib"

import dotWave from '../../assets/dotwave.png';
import profilBillede from '../../assets/madskaiser.jpg';

export default function Home() {
    const searchParams  = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const [loading, setLoading] = useState(true)

    const [kategorier, setKategorier] = useState(getKategorier())
    const [currentKategori, setCurrentKategori] =  useState(decodeURIComponent(pathname.substring(22).replace("-", " ")))

    const [isHovedKategori, setIsHovedKategori] = useState(true)
    const [harUnderKategorier, setHarUnderKategorier] = useState(false)

    const [freelancers, setFreelancers] = useState([])

    async function handleFreelancers(filters) {
        if (currentKategori && currentKategori !== "") {
            const freelancere = await getFreelancers(currentKategori.toLowerCase(), filters)
            if (freelancere) {
                setFreelancers(freelancere)
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        handleFreelancers([])
    }, [])

    useEffect(() => {
        if (kategorier.length >= 1 && kategorier[kategorier.findIndex((item) => item.navn.toLowerCase() == currentKategori.toLowerCase())].underkategorier) {
            if (kategorier[kategorier.findIndex((item) => item.navn.toLowerCase() == currentKategori.toLowerCase())].underkategorier.length >= 1) {
                setHarUnderKategorier(true)
            }
        }

        if (searchParams.get("kategori")) {
            setIsHovedKategori(false)
        }

        /* if (searchParams.get("kategori")) {
            setIsHovedKategori(false)
            const getFreelancers = async () => {
                const q = query(collection(db, "users"), where("accountInformation.account__type", "==", "freelancer"), where("freelanceInformation.freelance__branche", "==", searchParams.get("kategori")));
                const querySnapshot = await getDocs(q);
    
                const freelancersArray = []
                querySnapshot.forEach((doc) => {
                    const freelancerData = {...doc.data()}
                    freelancersArray.push(freelancerData)
                });
                setFreelancers(freelancersArray)
            }
            getFreelancers()
        } else {
            setIsHovedKategori(true)
            const getFreelancers = async () => {
                const q = query(collection(db, "users"), where("accountInformation.account__type", "==", "freelancer"));
                const querySnapshot = await getDocs(q);
    
                const freelancersArray = []
                querySnapshot.forEach((doc) => {
                    const freelancerData = {...doc.data()}
                    freelancersArray.push(freelancerData)
                });
                setFreelancers(freelancersArray)
            }
            getFreelancers()
        } */
    }, [])


    //Filters
    /* useEffect(() => {
        searchParams.forEach((value, key) => {
            const filterIndex = filtre.findIndex((filter) => filter.filter__sektioner[filter.filter__sektioner.findIndex((sektion) => sektion.sektion__navn == key)])
            console.log(filterIndex)
            const sektionIndex = filtre[filterIndex].filter__sektioner.findIndex((sektion) => sektion.sektion__navn == key)

            const filterNavn = filtre[filterIndex].filter__navn

            for (var i in value.split(",")) {
                const itemIndex = filtre[filterIndex].filter__sektioner[sektionIndex].sektion__list.findIndex((list) => list.list__navn == value[i])

                const item = {
                    list__chosen: true,
                    list__id: currentKategori + "/" + filterNavn + "/" + key + "/" + value[i],
                    list__navn: value[i].replace("-", " "),
                    list__parent: key.replace("-", " ")
                }
    
                selectedFilters.push({
                    ...item, 
                    access: {
                        filterNavn: filterNavn,
                        sektionNavn: key.replace("-", " "),
                        filterIndex: filterIndex,
                        sektionIndex: sektionIndex,
                        itemIndex: itemIndex
                    }
                })
    
                filtre[filterIndex].filter__sektioner[sektionIndex].sektion__list[itemIndex].list__chosen = true
                if (document.getElementById(key.replace("-", " ") + "-" + itemIndex)) {
                    document.getElementById(key.replace("-", " ") + "-" + itemIndex)?.classList.add("filter__dropdown__section__boxtick__element__box__active")
                }
            }
            console.log(value.split(","))
        })
    }, []) */

    const [filtre, setFiltre] = useState([])
    const [selectedFilters, setSelectedFilters] = useState([])

    useEffect(() => {
        if (getFilters().findIndex((item) => item.navn.toLowerCase() == currentKategori.toLowerCase()) >= 0) {
            setFiltre(getFilters()[getFilters().findIndex((item) => item.navn.toLowerCase() == currentKategori.toLowerCase())].filtre)
        }
    }, [])

    function selectFilter(item, filterNavn: string, sektionNavn: string, filterIndex: number, sektionIndex: number, itemIndex: number) {
        if (!filtre[filterIndex].filter__sektioner[sektionIndex].sektion__list[itemIndex].list__chosen) {
            selectedFilters.push({
                ...item, 
                access: {
                    filterNavn: filterNavn,
                    sektionNavn: sektionNavn,
                    filterIndex: filterIndex,
                    sektionIndex: sektionIndex,
                    itemIndex: itemIndex
                }
            })

            filtre[filterIndex].filter__sektioner[sektionIndex].sektion__list[itemIndex].list__chosen = true
            if (document.getElementById(sektionNavn + "-" + itemIndex)) {
                document.getElementById(sektionNavn + "-" + itemIndex)?.classList.add("filter__dropdown__section__boxtick__element__box__active")
            }
        } else if (filtre[filterIndex].filter__sektioner[sektionIndex].sektion__list[itemIndex].list__chosen) {
            selectedFilters.splice(selectedFilters.findIndex((findItem) => findItem.list__id == item.list__id), 1)

            filtre[filterIndex].filter__sektioner[sektionIndex].sektion__list[itemIndex].list__chosen = false
            if (document.getElementById(sektionNavn + "-" + itemIndex)) {
                document.getElementById(sektionNavn + "-" + itemIndex)?.classList.remove("filter__dropdown__section__boxtick__element__box__active")
            }
        }
    }

    function removeFilter(item, filterNavn: string, sektionNavn: string, filterIndex: number, sektionIndex: number, itemIndex: number) {
        selectedFilters.splice(selectedFilters.findIndex((findItem) => findItem.list__id == item.list__id), 1)

        filtre[filterIndex].filter__sektioner[sektionIndex].sektion__list[itemIndex].list__chosen = false
        if (document.getElementById(sektionNavn + "-" + itemIndex)) {
            document.getElementById(sektionNavn + "-" + itemIndex)?.classList.remove("filter__dropdown__section__boxtick__element__box__active")
        }
    }

    function toggleFilter(filterNavn: string, filterIndex: number) {
        if (filtre[filterIndex].filter__active) {
            document.getElementById(filterNavn + "-" + filterIndex + "-dropdown").style.display = "none"
            filtre[filterIndex].filter__active = false
        } else {
            document.getElementById(filterNavn + "-" + filterIndex + "-dropdown").style.display = "block"
            filtre[filterIndex].filter__active = true
        }
    }

    function closeFilter(filterNavn: string, filterIndex: number) {
        document.getElementById(filterNavn + "-" + filterIndex + "-dropdown").style.display = "none"
        filtre[filterIndex].filter__active = false
    }

    function removeSelected(filterNavn: string, filterIndex: number) {
        for (var i in selectedFilters) {
            if (selectedFilters[i].list__parent == filterNavn) {
                selectedFilters.splice(Number(i), 1)
            }

            for (var k in filtre[filterIndex].filter__sektioner) {
                for (var l in filtre[filterIndex].filter__sektioner[k].sektion__list) {
                    filtre[filterIndex].filter__sektioner[k].sektion__list[l].list__chosen = false

                    if (document.getElementById(filtre[filterIndex].filter__sektioner[k].sektion__navn + "-" + l)) {
                        document.getElementById(filtre[filterIndex].filter__sektioner[k].sektion__navn + "-" + l)?.classList.remove("filter__dropdown__section__boxtick__element__box__active")
                    }
                }
            }
        }
    }

    function anvendFilters(filterNavn: string, filterIndex: number) {
        setLoading(true)
        var query = "/freelance-kategorier/" + currentKategori + "?"

        var activeFiltersArray = []

        for (var i in selectedFilters) {
            if (activeFiltersArray.findIndex((item) => item.filter == selectedFilters[i].list__parent) < 0) {
                activeFiltersArray.push({
                    filter: selectedFilters[i].list__parent,
                    items: [selectedFilters[i].list__navn.toLowerCase()]
                })
            } else {
                activeFiltersArray[activeFiltersArray.findIndex((item) => item.filter == selectedFilters[i].list__parent)].items.push(selectedFilters[i].list__navn.toLowerCase())
            }
        }
        
        for (var i in activeFiltersArray) {
            var filterQuery = "&" + activeFiltersArray[i].filter.replace(" ", "-") + "="
            for (var k in activeFiltersArray[i].items) {
                if (Number(k) >= 1) {
                    filterQuery = filterQuery + "," + activeFiltersArray[i].items[k].replace(" ", "-")
                } else {
                    filterQuery = filterQuery + activeFiltersArray[i].items[k].replace(" ", "-")
                }
            }
            query = query + filterQuery
        }
        router.push(query)
        handleFreelancers(activeFiltersArray)
        closeFilter(filterNavn, filterIndex)
    }

    function removeFilterHandler(filter) {
        removeFilter(filter, filter.access.filterNavn, filter.access.sektionNavn, filter.access.filterIndex, filter.access.sektionIndex, filter.access.itemIndex)
        anvendFilters(filter.access.filterNavn, filter.access.filterIndex)
    }

    return (
        <>
            <div className="search__hero__container">
                <div className="priser__hero__indhold">
                    <div className="search__where__container">
                        <Link href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" className="search__where__icon">
                                <path d="M22,5.724V2c0-.552-.447-1-1-1s-1,.448-1,1v2.366L14.797,.855c-1.699-1.146-3.895-1.146-5.594,0L2.203,5.579c-1.379,.931-2.203,2.48-2.203,4.145v9.276c0,2.757,2.243,5,5,5h3c.553,0,1-.448,1-1V15c0-.551,.448-1,1-1h4c.552,0,1,.449,1,1v8c0,.552,.447,1,1,1h3c2.757,0,5-2.243,5-5V9.724c0-1.581-.744-3.058-2-4Zm0,13.276c0,1.654-1.346,3-3,3h-2v-7c0-1.654-1.346-3-3-3h-4c-1.654,0-3,1.346-3,3v7h-2c-1.654,0-3-1.346-3-3V9.724c0-.999,.494-1.929,1.322-2.487L10.322,2.513c1.02-.688,2.336-.688,3.355,0l7,4.724c.828,.558,1.322,1.488,1.322,2.487v9.276Z"/>
                            </svg>
                        </Link>
                        <p className="search__where__divider">»</p>
                        <Link className="search__where__p" href="/freelance-kategorier">Find freelancer</Link>
                        <p className="search__where__divider">»</p>
                        <Link className="search__where__p" href={"/freelance-kategorier/" + currentKategori}>{currentKategori}</Link>
                    </div>
                    <h1 className="search__hero__h1">Du søger nu i <span className="search__hero__h1__span">{isHovedKategori ? currentKategori : searchParams.get("kategori")?.replace("-", " ")}</span> hos Workflow</h1>
                    <p className="search__hero__p">Workflow forbinder danske virksomheder med de perfekte freelancere, så idéer kan blive til virkelighed.</p>
                    <div className="home__hero__cta">
                        <div className="component__howitworks__container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="component__howitworks__icon" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                        </svg>
                        <p className="component__howitworks__p">Hvordan virker Workflow?</p>
                        </div>
                    </div>
                </div>
                <div className="home__hero__background">
                    <Image src={dotWave} className="home__hero__background__image" alt="" width={1200} />
                </div>
            </div>
            {isHovedKategori && harUnderKategorier && <>
                {/* <h2 className="cards__heading">Populære underkategorier</h2> */}
                <div className="cards__container">
                    <div className="cards__wrapper">
                        <div className="kategorier__slider" id="kategorierSlider">
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="kategorier__slider__icon__left kategorier__slider__icon__off" viewBox="0 0 24 24">
                                    <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => slideKategorier("right")} className="kategorier__slider__icon" viewBox="0 0 24 24">
                                    <path d="m10.279,18.342l-.707-.707,5.281-5.281c.094-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Z"/>
                                </svg>
                            </>
                        </div>
                        {kategorier[kategorier.findIndex((item) => item.navn.toLowerCase() == currentKategori.toLowerCase())].underkategorier.map((underkategori) => {
                            return (<Link key={underkategori.navn} href={"/freelance-kategorier/" + currentKategori + "?kategori=" + underkategori.navn.replace(" ", "-")} className="cards__element">
                                <div className="cards__element__icon__container">
                                    {underkategori.svg}
                                </div>
                                <div className="cards__element__indhold">
                                    <p className="cards__element__indhold__heading">{underkategori.navn}</p>
                                </div>
                            </Link>)
                        })}
                    </div>
                </div>
            </>}
            <div className="salecard__container">
                <div className="filter__container">
                    {filtre.map((filter, filter_index) => {
                        return (
                            <div className="filter__element" key={filter.filter__navn + "-" + filter_index}>
                                <div className="filter__element__header" onClick={() => toggleFilter(filter.filter__navn, filter_index)}>
                                    <p className="filter__element__heading">{filter.filter__navn}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="filter__element__icon" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                </div>
                                <div className="filter__dropdown" id={filter.filter__navn + "-" + filter_index + "-dropdown"}>
                                    <div className="filter__dropdown__wrapper">
                                        {filter.filter__sektioner.map((sektion, sektion_index) => {
                                            return (
                                                <div className="filter__dropdown__section" key={sektion.sektion__navn + "-" + sektion_index}>
                                                    <p className="filter__dropdown__section__heading">{sektion.sektion__navn} <span>({sektion.sektion__list.length})</span></p>
                                                    <div className="filter__dropdown__section__boxtick__container">
                                                        {sektion.sektion__list.slice(0, 6).map((item, item_index) => {
                                                            return (
                                                                <button className="filter__dropdown__section__boxtick__element" key={item.list__id} onClick={() => selectFilter(item, filter.filter__navn, sektion.sektion__navn, filter_index, sektion_index, item_index)}>
                                                                    <div className={selectedFilters.findIndex((filteritem) => filteritem.list__id == item.list__id) >= 0 ? "filter__dropdown__section__boxtick__element__box filter__dropdown__section__boxtick__element__box__active" : "filter__dropdown__section__boxtick__element__box"} id={sektion.sektion__navn + "-" + item_index}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="filter__dropdown__section__boxtick__element__box__icon" viewBox="0 0 16 16">
                                                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                                                                        </svg>
                                                                    </div>
                                                                    <p className="filter__dropdown__section__boxtick__element__p">{item.list__navn} <span>({Math.round(Math.random() * 100)})</span></p>
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                    {sektion.sektion__list.length >= 7 && <p className="filter__dropdown__section__more">Se {sektion.sektion__list.length - 6} mere</p>}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="filter__dropdown__cta">
                                        <button className="header__cta__btn__transparent filter__dropdown__cta__secondary" onClick={() => removeSelected(filter.filter__navn, filter_index)}>Fjern alt</button>
                                        <button className="header__cta__btn__fill" onClick={() => anvendFilters(filter.filter__navn, filter_index)}>Anvend</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="filter__overblik__container">
                    <div className="filter__overblik__wrapper">
                        {selectedFilters.map((filter) => {
                            return (
                                <button className="filter__overblik__element" key={"overblik-" + filter.list__id} onClick={() => removeFilterHandler(filter)}>
                                    <p className="filter__overblik__element__p"><span>{filter.list__parent}:</span> {filter.list__navn}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="filter__overblik__element__icon" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                </button>
                            )
                        })}
                    </div>
                    <p className="filter__overblik__resultater">{freelancers.length >= 2 || freelancers.length == 0 ? freelancers.length + " Freelancere matcher" : freelancers.length + " Freelancer matcher"}</p>
                </div>
                {loading ? <div className="filter__loading__container">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div> : <>
                    {freelancers.length >= 1 ? <div className="salecard__section">
                        {freelancers.map((freelancer) => {
                            return (
                                <Link href={"/freelancer/profil?id=" + freelancer.freelanceInformation.freelance__url} className="salecard__section__element" key={freelancer.userInformation.user__email}>
                                    <div className="salecard__element__image__container"></div>
                                    <div className="salecard__element__indhold">
                                        <div className="salecard__element__indhold__seller__container">
                                            <div className="salecard__element__indhold__seller__wrapper">
                                                <div className="salecard__element__indhold__seller__image">
                                                    <Image className="salecard__element__indhold__seller__image__pic" src={profilBillede} alt="" />
                                                </div>
                                                <div className="salecard__element__indhold__seller__indhold">
                                                    <p className="salecard__element__indhold__seller__heading">{freelancer.userInformation.user__name}</p>
                                                    <p className="salecard__element__indhold__seller__p">{freelancer.freelanceInformation.freelance__branche}</p>
                                                </div>
                                            </div>
                                            <div className="salecard__element__indhold__seller__reviews">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="salecard__element__indhold__seller__reviews__icon" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg>
                                                <p className="filter__dropdown__section__boxtick__element__p">4,8 <span>({Math.round(Math.random() * 100)})</span></p>
                                            </div>
                                        </div>
                                        <p className="salecard__element__indhold__heading">{freelancer.freelanceInformation.freelance__overskrift}</p>
                                        <p className="salecard__element__indhold__p">Ekspert - Fast pris - Est. budget: 8000 kr.</p>
                                        <div className="profil__tags__wrapper">
                                            <div className="profil__tag__container profil__verified__container">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="profil__verified__icon" viewBox="0 0 16 16">
                                                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                                </svg>
                                                <p className="profil__verified__heading">Workflow Verificeret</p>
                                                <div className="profil__tag__popup">
                                                    <div className="profil__tag__popup__arrow"></div>
                                                    <p className="profil__tag__popup__p">Mads Kaiser er blevet verificeret af Workflow administrationen. Freelanceren er derfor af høj kvalitet og troværdighed.</p>
                                                </div>
                                            </div>
                                            <div className="profil__tag__container profil__top__container">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="profil__verified__icon" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.18.18 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.18.18 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.18.18 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.18.18 0 0 1-.134-.098z"/>
                                                </svg>
                                                <p className="profil__verified__heading">Top Sælger</p>
                                                <div className="profil__tag__popup">
                                                    <div className="profil__tag__popup__arrow"></div>
                                                    <p className="profil__tag__popup__p">Mads Kaiser er førende indenfor sine kategorier. Vedkommende har solgt til mange, og har mange glade kunder.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div> : <div className="salecard__section">
                        Der blev ikke fundet nogen freelancere, der matcher dine søgeresultater
                    </div>}
                </>}
            </div>
        </>
    );
}
