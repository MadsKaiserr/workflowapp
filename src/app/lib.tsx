"use server"
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/firebase/config"
import { getDoc, doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { redirect } from 'next/navigation'

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);
const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//AUTH
export async function encrypt(payload: JWTPayload | undefined) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(key);
}

export async function decrypt(input: string) {
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
    let shouldRedirect = false

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, kodeord);
        const userAuth = {
            providerData: {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName
            }
        }
    
        const session = await encrypt({ userAuth, expires });
        (await cookies()).set("auth", session, { expires, httpOnly: true });

        const docSnap = await getDoc(doc(db, "users", userCredential.user.uid));
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

    let errorMessage = ""
    let shouldRedirect = false

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
            const userAuth = {
                providerData: {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    displayName: userCredential.user.displayName
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
export async function opretUser(questions: any) {
    const session: any = {...await getSession()}
    let shouldRedirect = false

    const user = {
        userInformation: {
            user__id: session.userAuth.providerData.uid,
            user__name: session.userAuth.providerData.displayName || "Anonym",
            user__email: session.userAuth.providerData.email,
            user__location: questions[3].svar.toLowerCase()
        },
        accountInformation: {
            account__status: "active",
            account__created: new Date().getTime(),
            account__type:  questions[0].svar[questions[0].svar.findIndex((item: any) => item.chosen == true)].code
        },
        freelanceInformation: {
            freelance__url: session.userAuth.providerData.displayName || session.userAuth.providerData.uid,
            freelance__reviews: {
                reviews__rating: 4.6,
                reviews__1star: 0,
                reviews__2star: 0,
                reviews__3star: 0,
                reviews__4star: 0,
                reviews__5star: 1,
                reviews__data: [
                    {
                        review__id: 0,
                        review__profileid: 0,
                        review__overskrift: "overskrift",
                        review__text: "text",
                        review__rating: 5
                    }
                ]
            },
            freelance__profile: {
                profile__type: questions[1].svar[questions[1].svar.findIndex((item: any) => item.chosen == true)].overskrift,
                profile__tags: [
                    {
                        tag__id: "workflowVerified",
                        tag__name: "Workflow Verificeret",
                        tag__description: "er blevet verificeret af Workflow administrationen. Freelanceren er derfor af høj kvalitet og troværdighed.",
                        tag_color: "rgba(var(--color))"
                    },
                    {
                        tag__id: "topSeller",
                        tag__name: "Top Sælger",
                        tag__description: "er førende indenfor sine kategorier. Vedkommende har solgt til mange, og har mange glade kunder.",
                        tag_color: "rgb(58, 110, 212)"
                    }
                ],
                profile__about: "Jeg tror på, at man kan skabe noget unikt og holdbart ved at fokusere på både form og funktion. Ascent's vision er at hjælpe virksomheder med at bygge en stærk online tilstedeværelse, som understøtter deres fremtidige vækst.",
                profile__branche: questions[4].svar.toLowerCase(),
                profile__underkategori: questions[5].svar.toLowerCase()
            },
            freelance__tags: [
                "Webdesign",
                "Grafisk design",
                "Shopify"
            ],
            freelance__overskrift: "Jeg designer hjemmesider for små virksomheder",
            freelance__beskrivelse: "Jeg hjælper virksomheder med at vokse, ikke kun ved at udvikle moderne hjemmesider, men ved udvikle deres brand og genkendelighed. Navnet Ascent, afspejler vores værdier – vi stræber altid efter at blive bedre, både som team og i de løsninger, vi leverer.",
            freelance__erfaring: {
                erfaring__text: questions[2].svar[questions[2].svar.findIndex((item: any) => item.chosen == true)].overskrift,
                erfaring__tid: questions[2].svar[questions[2].svar.findIndex((item: any) => item.chosen == true)].byline
            }
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

export async function updateUser(user: any) {
    try {
        await setDoc(doc(db, "users", user.userInformation.user__id), user)

        const userSession = await encrypt({ user, expires });
        (await cookies()).set("user", userSession, { expires, httpOnly: true });
    } catch (err) {
        console.error(err)
    }
}

//Freelancere
export async function getFreelancers(kategori: string, filters: any) {
    try {
        let lokation = where("accountInformation.account__type", "==", "freelancer")
        let underkategori = where("accountInformation.account__type", "==", "freelancer")
        
        if (filters.length >= 1) {
            if (filters.findIndex((item: any) => item.filter == "Lokation") >= 0) {
                lokation = where("userInformation.user__location", "in", filters[filters.findIndex((item: any) => item.filter == "Lokation")].items)
            }
            if (filters.findIndex((item: any) => item.filter == "Underkategori") >= 0) {
                underkategori = where("freelanceInformation.freelance__profile.profile__underkategori", "in", filters[filters.findIndex((item: any) => item.filter == "Underkategori")].items)
            }
        }

        const q = query(collection(db, "users"), where("accountInformation.account__type", "==", "freelancer"), where("freelanceInformation.freelance__profile.profile__branche", "==", kategori), lokation, underkategori);

        const querySnapshot = await getDocs(q);

        const freelancersArray: { [x: string]: any; }[] = []
        querySnapshot.forEach((doc) => {
            const freelancerData = {...doc.data()}
            freelancersArray.push(freelancerData)
        });
        
        return freelancersArray
    } catch (err) {
        console.error(err)
    }
}

export async function getFreelanceProfil(id: string) {
    try {
        const q = query(collection(db, "users"), where("freelanceInformation.freelance__url", "==", id));

        const querySnapshot = await getDocs(q);
        let userData = {}
        querySnapshot.forEach((doc) => {
            userData = doc.data()
        });
        return userData
    } catch (err) {
        console.error(err)
    }
}