
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./FirebaseConfig";
import { getDoc, doc, setDoc } from "firebase/firestore";

export async function signIn(email: string, password: string, router: any) {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        const userRef = await getDoc(doc(db, "users", user.uid));
        if (userRef.exists()) {
            router.push("/");
        } else {
            router.push("/signUp");
            console.log("The provided account details could not be assigned to an existing user! Sign up first!");
        }
    } catch (error) {
        console.error("Error signing in user: ", error);
    }
}

export async function signUp(email: string, password: string, router: any) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            user: user.uid
        });
        router.push("/signIn");
    } catch (error) {
        console.error("Error while registering your account: ", error);
    }
}

export const signOutUser = async () => {
    try {
        await signOut(auth);
        location.reload();
    } catch (error) {
        console.error("Error signing out:", error);
    }
};
