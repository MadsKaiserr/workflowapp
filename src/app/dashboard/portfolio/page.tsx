"use client"
/* import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/firebase/config"
import { setDoc, doc } from "firebase/firestore"; */

import Sidebar from '../../components/sidebar';

export default function Portefolio() {

  /* const [loading, setLoading] = useState(false) */

  return (
    <>
      <div className="dashboard__container">
        <Sidebar />
        {/* <div className="dashboard__content">
          <div className="dashboard__content__header">
            <div className="dashboard__content__header__indhold">
              <p className="dashboard__content__heading">Min portefølje</p>
              <p className="dashboard__content__p">Øg troværdigheden ved at vise potentielle kunder, hvad du tidligere har præsteret af arbejde førhen.</p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
