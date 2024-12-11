"use client"
import { useState, useEffect } from 'react'
import { getUser } from "../../lib"


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

export default function Oversigt() {

  const [user, setUser] = useState<User | any>(null)

  async function getUserSession() {
    const userData: any = {...await getUser()}
    setUser(userData.clientUserData)
  }

  useEffect(() => {
      getUserSession()
  }, []);

  return (
    <>
      <div className="dashboard__container">
        <Sidebar />
        <div className="dashboard__content">
          <div className="dashboard__content__header">
            <div className="dashboard__content__header__indhold">
              <p className="dashboard__content__heading">Velkommen{user && ", " + user.userInformation.user__name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
