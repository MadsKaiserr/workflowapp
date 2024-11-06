"use client"
import Kategorier from '../kategorier';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
    const pathname = usePathname()

    const [udenKategorier, setUdenKategorier] = useState(false)

    useEffect(() => {
        if (pathname.includes("/dashboard") || pathname.includes("/logind") || pathname.includes("/opretkonto")) {
            setUdenKategorier(true)
        } else {
            setUdenKategorier(false)
        }
    })

    return (<>
        {!udenKategorier && <div className="kategorier__main">
            <Kategorier />
        </div>}
    </>);
}
