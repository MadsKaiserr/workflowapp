"use server"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/firebase/config"
import { getDoc, doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { redirect } from 'next/navigation'

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);
const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//AUTH
export async function encrypt(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
}

export async function getSession() {
    const session = (await cookies()).get("auth")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function getUser() {
    const userSession = (await cookies()).get("user")?.value;
    if (!userSession) return null;
    return await decrypt(userSession);
}

//Login/Signup
export async function login(prevState: { error: undefined | string }, formData: FormData) {

    const email = formData.get("email") as string
    const kodeord = formData.get("password") as string
    var shouldRedirect = false

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, kodeord);
        userCredential
        var userAuth = {
            providerData: {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName
            }
        }
    
        const session = await encrypt({ userAuth, expires });
        (await cookies()).set("auth", session, { expires, httpOnly: true });

        const docSnap = await getDoc(doc(db, "users", email));
        if (docSnap.exists()) {
            const user = docSnap.data()
            const userSession = await encrypt({ user, expires });
            (await cookies()).set("user", userSession, { expires, httpOnly: true });
        }

        shouldRedirect = true
    } catch(err) {
        console.error(err)
        return { error: "Forkerte oplysninger" }
    } finally {
        if (shouldRedirect) {
            redirect("/")
        }
    }
}

export async function signup(prevState: { error: undefined | string }, formData: FormData) {

    const fuldeNavn = formData.get("name") as string
    const email = formData.get("email") as string
    const kodeord = formData.get("password") as string

    var errorMessage = ""
    var shouldRedirect = false

    if (!fuldeNavn || fuldeNavn.trim().length < 2) {
        errorMessage = "Navnet skal være mindst 2 tegn.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errorMessage = "Indtast en gyldig email-adresse.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!kodeord || !passwordRegex.test(kodeord)) {
        errorMessage = "Kodeordet skal være mindst 6 tegn langt, indeholde et stort bogstav og et tal.";
    }

    if (errorMessage == "") {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, kodeord);
            userCredential
            var userAuth = {
                providerData: {
                    ...userCredential.user.providerData
                }
            }

            const session = await encrypt({ userAuth, expires });
            (await cookies()).set("auth", session, { expires, httpOnly: true });
            shouldRedirect = true
        } catch(err) {
            console.error(err)
            return { error: errorMessage }
        } finally {
            if (shouldRedirect) {
                redirect("/dashboard/onboarding")
            }
        }
    } else {
        return { error: errorMessage }
    }
}

export async function logout() {
    (await cookies()).set("auth", "", { expires: new Date(0) });
    (await cookies()).set("user", "", { expires: new Date(0) });
    redirect("/")
}

//Opret user document
export async function opretUser(questions) {
    const session = await getSession()
    var shouldRedirect = false

    var user = {
        userInformation: {
            user__id: session.userAuth.providerData.uid,
            user__name: session.userAuth.providerData.displayName || "Anonym",
            user__email: session.userAuth.providerData.email,
            user__location: questions[3].svar.toLowerCase()
        },
        accountInformation: {
            account__status: "active",
            account__created: new Date().getTime(),
            account__type:  questions[0].svar[questions[0].svar.findIndex((item) => item.chosen == true)].code
        },
        freelanceInformation: {
            freelance__url: session.userAuth.providerData.displayName || session.userAuth.providerData.uid,
            freelance__type: questions[1].svar[questions[1].svar.findIndex((item) => item.chosen == true)].overskrift,
            freelance__erfaring: {
                erfaring__text: questions[2].svar[questions[2].svar.findIndex((item) => item.chosen == true)].overskrift,
                erfaring__tid: questions[2].svar[questions[2].svar.findIndex((item) => item.chosen == true)].byline
            },
            freelance__location: questions[3].svar.toLowerCase(),
            freelance__branche: questions[4].svar.toLowerCase(),
            freelance__underkategori: questions[5].svar.toLowerCase()
        }
    };
  
    try {
        await setDoc(doc(db, "users", session.userAuth.providerData.uid), user);

        const userSession = await encrypt({ user, expires });
        (await cookies()).set("user", userSession, { expires, httpOnly: true });

        shouldRedirect = true
    } catch (err) {
        console.error(err)
    } finally {
        if (shouldRedirect) {
            redirect("/dashboard/profil")
        }
    }
}

export async function updateUser(userData) {
    const userDocData = await getUser()

    const user = {
      accountInformation: {
        ...userDocData.user.accountInformation
      },
      freelanceInformation: {
        ...userDocData.user.freelanceInformation,
        ...userData.freelanceInformation
      },
      userInformation: {
        ...userDocData.user.userInformation,
        ...userData.userInformation
      }
    }
  
    try {
        await setDoc(doc(db, "users", userDocData.user.userInformation.user__id), {...user})

        const userSession = await encrypt({ user, expires });
        (await cookies()).set("user", userSession, { expires, httpOnly: true });
    } catch (err) {
        console.error(err)
    }
}

//Freelancere
export async function getFreelancers(kategori, filters) {
    try {
        var lokation = where("accountInformation.account__type", "==", "freelancer")
        var underkategori = where("accountInformation.account__type", "==", "freelancer")
        
        if (filters.length >= 1) {
            if (filters.findIndex((item) => item.filter == "Lokation") >= 0) {
                lokation = where("freelanceInformation.freelance__location", "in", filters[filters.findIndex((item) => item.filter == "Lokation")].items)
                //q = query(collection(db, "users"), where("accountInformation.account__type", "==", "freelancer"), where("freelanceInformation.freelance__branche", "==", kategori), where("freelanceInformation.freelance__location", "in", filters[filters.findIndex((item) => item.filter == "Lokation")].items));
            }
            if (filters.findIndex((item) => item.filter == "Underkategori") >= 0) {
                underkategori = where("freelanceInformation.freelance__underkategori", "in", filters[filters.findIndex((item) => item.filter == "Underkategori")].items)
                //q = query(collection(db, "users"), where("accountInformation.account__type", "==", "freelancer"), where("freelanceInformation.freelance__branche", "==", kategori), where("freelanceInformation.freelance__location", "in", filters[filters.findIndex((item) => item.filter == "Lokation")].items));
            }
        }

        var q = query(collection(db, "users"), where("accountInformation.account__type", "==", "freelancer"), where("freelanceInformation.freelance__branche", "==", kategori), lokation, underkategori);

        const querySnapshot = await getDocs(q);

        const freelancersArray = []
        querySnapshot.forEach((doc) => {
            const freelancerData = {...doc.data()}
            freelancersArray.push(freelancerData)
        });
        return freelancersArray
    } catch (err) {
        console.error(err)
    }
}

export async function getFreelanceProfil(id) {
    try {
        const q = query(collection(db, "users"), where("freelanceInformation.freelance__url", "==", id));

        const querySnapshot = await getDocs(q);
        var userData = {}
        querySnapshot.forEach((doc) => {
            userData = doc.data()
        });
        return userData
    } catch (err) {
        console.error(err)
    }
}