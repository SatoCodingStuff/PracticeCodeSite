import { collection, query, where, addDoc, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from "../firebaseInit.js"


export async function sha256(message) {
    const msgUint8 = new TextEncoder().encode(message); 
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}

export async function findUserById(userId) {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            return docSnap;
        }
    } catch (e) {
        console.error("Error finding user: ", e);
    }
}

export async function findUserByUsername(username) {
    try {
        const userQuery = query(collection(db, "users"), where("username" , "==", username));
        const querySnap = await getDocs(userQuery);

        if(querySnap.empty) {
            return null;
        }

        return querySnap.docs[0];
    } catch (e) {
        console.error("Error finding user: ", e);
    }
}

export async function addNewUser(username, pass) {
    try {
        const hashedPass = await sha256(pass);

        const docRef = await addDoc(collection(db, "users"), {
            username: username,
            password: hashedPass
        });

        console.log("user created seccussfully: " + docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}