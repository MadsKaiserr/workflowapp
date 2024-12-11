"use server"
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "@/app/firebase/config"
import { getDoc, doc, setDoc, getDocs, collection, query, where, addDoc, updateDoc } from "firebase/firestore";
import { redirect } from 'next/navigation'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

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
    let redirectUrl = "/"

    try {
        console.log("API Auth - Signin")
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

        console.log("API Get - Get user")
        const docSnap = await getDoc(doc(db, "users", userCredential.user.uid));
        if (docSnap.exists()) {
            const user = docSnap.data()
            const clientUserData = {
                userInformation: {
                    user__id: user.userInformation.user__id,
                    user__name: user.userInformation.user__name,
                    user__email: user.userInformation.user__email,
                    user__location: user.userInformation.user__location,
                    user__picture: {
                        picture__updated: user.userInformation.user__picture.picture__updated,
                        picture__custom: user.userInformation.user__picture.picture__custom,
                        picture__url: user.userInformation.user__picture.picture__url
                    }
                },
                accountInformation: {
                    account__status: user.accountInformation.account__status,
                    account__created: user.accountInformation.account__created,
                    account__type: user.accountInformation.account__type,
                    account__abonnement: {
                        abonnement__status: user.accountInformation.account__abonnement.abonnement__status,
                        abonnement__navn: user.accountInformation.account__abonnement.abonnement__navn,
                        abonnement__exp: user.accountInformation.account__abonnement.abonnement__exp,
                        abonnement__issued: user.accountInformation.account__abonnement.abonnement__issued,
                    }
                }
            }
            if (user.accountInformation.account__type == "freelancer") {
                redirectUrl = "/dashboard/oversigt"
            }
            const userSession = await encrypt({ clientUserData, expires });
            (await cookies()).set("user", userSession, { expires, httpOnly: true });
        }

        shouldRedirect = true
    } catch(err) {
        console.error(err)
        return { error: "Forkerte oplysninger" }
    } finally {
        if (shouldRedirect) {
            redirect(redirectUrl)
        }
    }
}

export async function loginWithGoogleComplete(user: any) {
    let redirectUrl = "/"
    try {
        const userAuth = {
            providerData: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            }
        }
    
        const session = await encrypt({ userAuth, expires });
        (await cookies()).set("auth", session, { expires, httpOnly: true });

        console.log("API Get - Get user")
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
            const user = docSnap.data()
            const clientUserData = {
                userInformation: {
                    user__id: user.userInformation.user__id,
                    user__name: user.userInformation.user__name,
                    user__email: user.userInformation.user__email,
                    user__location: user.userInformation.user__location,
                    user__picture: {
                        picture__updated: user.userInformation.user__picture.picture__updated,
                        picture__custom: user.userInformation.user__picture.picture__custom,
                        picture__url: user.userInformation.user__picture.picture__url
                    }
                },
                accountInformation: {
                    account__status: user.accountInformation.account__status,
                    account__created: user.accountInformation.account__created,
                    account__type: user.accountInformation.account__type,
                    account__abonnement: {
                        abonnement__status: user.accountInformation.account__abonnement.abonnement__status,
                        abonnement__navn: user.accountInformation.account__abonnement.abonnement__navn,
                        abonnement__exp: user.accountInformation.account__abonnement.abonnement__exp,
                        abonnement__issued: user.accountInformation.account__abonnement.abonnement__issued,
                    }
                }
            }
            if (user.accountInformation.account__type == "freelancer") {
                redirectUrl = "/dashboard/oversigt"
            }
            const userSession = await encrypt({ clientUserData, expires });
            (await cookies()).set("user", userSession, { expires, httpOnly: true });
        }
    } catch(err) {
        console.error(err)
    } finally {
        redirect(redirectUrl)
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
            console.log("API Auth - Create user")
            const userCredential = await createUserWithEmailAndPassword(auth, email, kodeord);

            console.log("API Auth - Set displayname")
            updateProfile(userCredential.user, {
                displayName: fuldeNavn
            }).then(() => {
            }).catch((error) => {
                console.error(error)
                return
            });

            const userAuth = {
                providerData: {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    displayName: fuldeNavn
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

export async function singupWithGoogleComplete(user: any) {
    try {
        const userAuth = {
            providerData: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            }
        }
    
        console.log("Setting cookie")
        const session = await encrypt({ userAuth, expires });
        (await cookies()).set("auth", session, { expires, httpOnly: true });
    } catch(err) {
        console.error(err)
    }
}

export async function logout() {
    (await cookies()).set("auth", "", { expires: new Date(0) });
    (await cookies()).set("user", "", { expires: new Date(0) });
    redirect("/")
}

//Opret user document
export async function opretUser(questions: any, type: string, profilePicture: string) {
    if (type == "freelancer") {
        const session: any = {...await getSession()}
        let shouldRedirect = false
    
        let user = {
            userInformation: {
                user__id: session.userAuth.providerData.uid,
                user__name: session.userAuth.providerData.displayName || "Anonym",
                user__email: session.userAuth.providerData.email,
                user__location: questions[3].sections[1].selected.toLowerCase(),
                user__picture: {
                    picture__updated: new Date().getTime(),
                    picture__custom: false,
                    picture__url: ""
                }
            },
            accountInformation: {
                account__status: "active",
                account__created: new Date().getTime(),
                account__type:  questions[0].sections[0].svar[questions[0].sections[0].svar.findIndex((item: any) => item.chosen == true)].code,
                account__abonnement: {
                    abonnement__status: false,
                }
            },
            freelanceInformation: {
                freelance__url: session.userAuth.providerData.displayName.toLowerCase().replace(" ", "-") || session.userAuth.providerData.uid,
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
                    profile__type: questions[1].sections[0].svar[questions[1].sections[0].svar.findIndex((item: any) => item.chosen == true)].overskrift,
                    profile__tags: [
                        {
                            tag__id: "workflowVerified",
                            tag__name: "Workflow Verificeret",
                            tag__description: "er blevet verificeret af Workflow administrationen. Freelanceren er derfor af høj kvalitet og troværdighed.",
                            tag_color: "rgba(var(--primary-300))"
                        },
                        {
                            tag__id: "topSeller",
                            tag__name: "Top Sælger",
                            tag__description: "er førende indenfor sine kategorier. Vedkommende har solgt til mange, og har mange glade kunder.",
                            tag_color: "rgb(58, 110, 212)"
                        }
                    ],
                    profile__oneliner: "",
                    profile__about: "",
                    profile__branche: questions[2].sections[1].selected.toLowerCase(),
                    profile__underkategori: questions[2].sections[2].selected.toLowerCase(),
                },
                freelance__tags: [],
                freelance__overskrift: "",
                freelance__beskrivelse: "",
                freelance__erfaring: {
                    erfaring__text: questions[4].sections[0].svar[questions[4].sections[0].svar.findIndex((item: any) => item.chosen == true)].overskrift,
                    erfaring__tid: questions[4].sections[0].svar[questions[4].sections[0].svar.findIndex((item: any) => item.chosen == true)].byline
                },
                freelance__pricing: {
                    pricing__packages: []
                },
                freelance__portfolio: [],
                freelance__tips: [
                    /* {
                        tip__navn: "Gør din profil klar til kunder",
                        tip__beskrivelse: "En udfyldt profil gør dig mere attraktiv for potentielle kunder – vis, hvad du kan, og gør det nemt at vælge dig.",
                        tip__list: [
                            {
                                element__navn: "Skriv en overskrift og beskrivelse",
                                element__url: "/dashboard/profil",
                                element__complete: questions[5].sections[0].text != "" && questions[5].sections[1].text != "" ? true : false
                            },
                            {
                                element__navn: "Angiv, hvor du arbejder fra, og hvor din erfaring",
                                element__url: "/dashboard/profil",
                                element__complete: questions[3].sections[2].selected != "" && questions[4].sections[0].svar[questions[4].sections[0].svar.findIndex((item: any) => item.chosen == true)].byline != "" ? true : false
                            },
                            {
                                element__navn: "Marker dine kompetencer, og vælg de relevante kategorier og underkategorier",
                                element__url: "/dashboard/profil",
                                element__complete: questions[2].sections[1].selected != "" && questions[2].sections[2].selected != "" ? true : false
                            },
                            {
                                element__navn: "Tilbyd gennemsigtige pakkeløsninger med priser",
                                element__url: "/dashboard/priser",
                                element__complete: questions[6].sections[0].pakker.length >= 1 ? true : false
                            },
                            {
                                element__navn: "Fremvis dine cases fra din portefølje",
                                element__url: "/dashboard/portfolio",
                                element__complete: false
                            }
                        ]
                    }, */
                    {
                        tip__navn: "Kom godt i gang med din første kunde",
                        tip__beskrivelse: "Den første kunde er vejen til flere – få din første henvendelse, levér en fantastisk service, og modtag en stærk anmeldelse.",
                        tip__list: [
                            {
                                element__navn: "Få din første henvendelse",
                                element__url: "/dashboard/samtaler",
                                element__complete: false
                            },
                            {
                                element__navn: "Tilbyd din service til et projekt",
                                element__url: "/projektopslag",
                                element__complete: false
                            },
                            {
                                element__navn: "Få din første anmeldelse",
                                element__url: "/dashboard/anmeldelser",
                                element__complete: false
                            }
                        ]
                    }
                ]
            }
        };
        
        questions[2].sections[0].svar.forEach((item: { chosen: boolean; overskrift: string; }) => {
            if (item.chosen) {
                user.freelanceInformation.freelance__tags.push(item.overskrift)
            }
        })

        if (profilePicture != "") {
            user.userInformation.user__picture.picture__custom = true
            user.userInformation.user__picture.picture__url = profilePicture
        }
      
        try {
            console.log("API Update - Set user")
            await setDoc(doc(db, "users", session.userAuth.providerData.uid), user);
    
            const clientUserData = {
                userInformation: {
                    user__id: user.userInformation.user__id,
                    user__name: user.userInformation.user__name,
                    user__email: user.userInformation.user__email,
                    user__location: user.userInformation.user__location,
                    user__picture: {
                        picture__updated: user.userInformation.user__picture.picture__updated,
                        picture__custom: user.userInformation.user__picture.picture__custom,
                        picture__url: user.userInformation.user__picture.picture__url
                    }

                },
                accountInformation: {
                    account__status: user.accountInformation.account__status,
                    account__created: user.accountInformation.account__created,
                    account__type: user.accountInformation.account__type,
                    account__abonnement: {
                        abonnement__status: user.accountInformation.account__abonnement.abonnement__status,
                    }
                }
            }
            const userSession = await encrypt({ clientUserData, expires });
            (await cookies()).set("user", userSession, { expires, httpOnly: true });
    
            shouldRedirect = true
        } catch (err) {
            console.error(err)
        } finally {
            if (shouldRedirect) {
                redirect("/dashboard/onboarding/profil")
            }
        }
    } else if (type == "klient") {
        const session: any = {...await getSession()}
    
        const clientUserData = {
            userInformation: {
                user__id: session.userAuth.providerData.uid,
                user__name: session.userAuth.providerData.displayName || "Anonym",
                user__email: session.userAuth.providerData.email
            },
            accountInformation: {
                account__status: "active",
                account__created: new Date().getTime(),
                account__type: type
            }
        };
      
        try {
            console.log("API Update - Set user")
            await setDoc(doc(db, "users", session.userAuth.providerData.uid), clientUserData);
    
            const userSession = await encrypt({ clientUserData, expires });
            (await cookies()).set("user", userSession, { expires, httpOnly: true });
        } catch (err) {
            console.error(err)
        } finally {
            redirect("/")
        }
    }
}

export async function updateUser(user: any) {
    try {
        console.log("API Update - Set user")
        await setDoc(doc(db, "users", user.userInformation.user__id), user)

        const clientUserData = {
            userInformation: {
                user__id: user.userInformation.user__id,
                user__name: user.userInformation.user__name,
                user__email: user.userInformation.user__email,
                user__location: user.userInformation.user__location,
                user__picture: {
                    picture__updated: user.userInformation.user__picture.picture__updated,
                    picture__custom: user.userInformation.user__picture.picture__custom,
                    picture__url: user.userInformation.user__picture.picture__url
                }
            },
            accountInformation: {
                account__status: user.accountInformation.account__status,
                account__created: user.accountInformation.account__created,
                account__type: user.accountInformation.account__type,
                account__abonnement: {
                    abonnement__status: user.accountInformation.account__abonnement.abonnement__status,
                }
            }
        }
        const userSession = await encrypt({ clientUserData, expires });
        (await cookies()).set("user", userSession, { expires, httpOnly: true });
    } catch (err) {
        console.error(err)
    }
}

export async function uploadProfilePicture(file: any, uid: string) {
    try {
        const imageRef = ref(storage, uid + '/profile/' + file.name);

        console.log("API Post - Upload image")
        let downloadUrlString = undefined
        await uploadBytes(imageRef, file).then(async (snapshot) => {
            console.log("Uploaded file")
            await getDownloadURL(snapshot.ref).then(downloadUrl => {
                downloadUrlString = downloadUrl
            })
        })
        return downloadUrlString
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

        console.log("API Get - Get freelancers")
        const querySnapshot = await getDocs(q);

        const freelancersArray: { [x: string]: any; }[] = []
        querySnapshot.forEach(async (doc) => {
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

        console.log("API Get - Get Freelancer")
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

export async function getFreelancerInformation(userId: string) {
    try {
        const q = query(collection(db, "users"), where("userInformation.user__id", "==", userId));

        console.log("API Get - Get Freelancer information")
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

//Samtaler
export async function getUserPart(id: string) {
    try {
        const q = query(collection(db, "users"), where("userInformation.user__id", "==", id));

        console.log("API Get - Get user")
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

export async function getSamtaler(id: string) {
    try {
        const q = query(collection(db, "samtaler"), where("samtale__medlemmer", "array-contains", id));
        console.log("API Get - Get samtaler")
        const querySnapshot = await getDocs(q);

        const samtaleArray: { [x: string]: any; }[] = []
        querySnapshot.forEach(async (doc) => {
            const samtaleData = {...doc.data()}
            samtaleData.id = doc.id
            samtaleData.samtale__modpart = {}

            samtaleArray.push(samtaleData)
        });
        if (samtaleArray[0].samtale__medlemmer[0] == id) {
            samtaleArray[0].samtale__modpart = await getUserPart(samtaleArray[0].samtale__medlemmer[1])
        } else if (samtaleArray[0].samtale__medlemmer[1] == id) {
            samtaleArray[0].samtale__modpart = await getUserPart(samtaleArray[0].samtale__medlemmer[0])
        }
        return samtaleArray
    } catch (err) {
        console.error(err)
    }
}

export async function opretSamtale(sender: string, receiver: string) {
    try {
        console.log("API Post - Post samtale")
        await addDoc(collection(db, "samtaler"), {
            samtale__beskeder: [
            ],
            samtale__medlemmer: [
                sender,
                receiver
            ],
            samtale__data: {
                data__created: new Date().getTime()
            }
        })
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export async function sendBesked(currentSamtaleObject: any, sender: string, modtager: string, besked: string) {
    try {
        currentSamtaleObject.samtale__beskeder.push({
            besked: besked,
            metaData: {
                data__created: new Date().getTime(),
                data__sender: sender,
                data__modtager: modtager
            }
        })
        console.log("API Update - Update samtale")
        await setDoc(doc(db, "samtaler", currentSamtaleObject.id), currentSamtaleObject)

        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

//Portfolio
export async function uploadPortfolioImage(file: any, uid: string) {
    try {
        const imageRef = ref(storage, uid + '/cases/' + file.name);

        console.log("API Post - Upload image")
        let downloadUrlString = undefined
        await uploadBytes(imageRef, file).then(async (snapshot) => {
            console.log("Uploaded file")
            await getDownloadURL(snapshot.ref).then(downloadUrl => {
                downloadUrlString = downloadUrl
            })
        })
        return downloadUrlString
    } catch (err) {
        console.error(err)
    }
}

export async function handleOnboardingPortfolioUpdate(cases: any, user: any) {
    try {
        const caseArray: { portfolio__image: string; portfolio__overskrift: string; portfolio__beskrivelse: string; }[] = []
        cases.forEach((myCase: any) => {
            caseArray.push({
                portfolio__image: myCase.image,
                portfolio__overskrift: myCase.overskrift,
                portfolio__beskrivelse: myCase.beskrivelse
            })
        })

        console.log("API Update - Set user")
        const userRef = doc(db, "users", user.userInformation.user__id)
        await updateDoc(userRef, {
            "freelanceInformation.freelance__portfolio": caseArray
        })
    } catch (err) {
        console.error(err)
    } finally {
        redirect("/dashboard/onboarding/abonnement")
    }
}

export async function handlePortfolioUpdate(cases: any, user: any) {
    try {
        const caseArray: { portfolio__image: string; portfolio__overskrift: string; portfolio__beskrivelse: string; }[] = []
        cases.forEach((myCase: any) => {
            caseArray.push({
                portfolio__image: myCase.portfolio__image,
                portfolio__overskrift: myCase.portfolio__overskrift,
                portfolio__beskrivelse: myCase.portfolio__beskrivelse
            })
        })

        console.log("API Update - Set user")
        const userRef = doc(db, "users", user.userInformation.user__id)
        await updateDoc(userRef, {
            "freelanceInformation.freelance__portfolio": caseArray
        })
    } catch (err) {
        console.error(err)
    }
}

//Abonnement
export async function handleAbonnementUpdate(type: string, user: any) {
    try {
        let abonnementData = {}
        const dateMonthForward = new Date()
        const dateToday = new Date()
        if (type == "gratis") {
            abonnementData = {
                abonnement__status: true,
                abonnement__navn: "Gratis prøveperiode",
                abonnement__exp: new Date((dateMonthForward).setMonth(dateMonthForward.getMonth() + 1)).getTime(),
                abonnement__issued: dateToday.getTime()
            }
        }

        console.log("API Update - Set user")
        const userRef = doc(db, "users", user.userInformation.user__id)
        await updateDoc(userRef, {
            "accountInformation.account__abonnement": abonnementData
        })

        const clientUserData = {
            userInformation: {
                user__id: user.userInformation.user__id,
                user__name: user.userInformation.user__name,
                user__email: user.userInformation.user__email,
                user__location: user.userInformation.user__location,
                user__picture: {
                    picture__updated: user.userInformation.user__picture.picture__updated,
                    picture__custom: user.userInformation.user__picture.picture__custom,
                    picture__url: user.userInformation.user__picture.picture__url
                }
            },
            accountInformation: {
                account__status: user.accountInformation.account__status,
                account__created: user.accountInformation.account__created,
                account__type: user.accountInformation.account__type,
                account__abonnement: {
                    abonnement__status: abonnementData.abonnement__status,
                    abonnement__navn: abonnementData.abonnement__navn,
                    abonnement__exp: abonnementData.abonnement__exp,
                    abonnement__issued: abonnementData.abonnement__issued,
                }
            }
        }
        const userSession = await encrypt({ clientUserData, expires });
        (await cookies()).set("user", userSession, { expires, httpOnly: true });
    } catch (err) {
        console.error(err)
    } finally {
        redirect("/dashboard/oversigt")
    }
}

//Tips
export async function getTips(user: any) {
    try {
        console.log("API Get - Get Tips")
        const userData = await getDoc(doc(db, "users", user.userInformation.user__id))
        
        return userData.data().freelanceInformation.freelance__tips
    } catch (err) {
        console.error(err)
    }
}

//Pakker
export async function getPakker(user: any) {
    try {
        console.log("API Get - Get Pakker")
        const userData = await getDoc(doc(db, "users", user.userInformation.user__id))
        
        return userData.data().freelanceInformation.freelance__pricing.pricing__packages
    } catch (err) {
        console.error(err)
    }
}