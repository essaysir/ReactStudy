// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    GithubAuthProvider
} from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();

// 구글 로그인과 깃허브 로그인 둘다 실행되도록 해놓음
export  function login(brand){
    if ( brand === 'Google')  return signInWithPopup(auth, provider).catch(console.error);
    if ( brand === 'Github') return signInWithPopup(auth,githubProvider).catch(console.error);
}

export  function logout(){
    return signOut(auth).catch(console.error);
}

export function  onUserStateChange(callback){
    onAuthStateChanged(auth,(user)=>{
        callback(user);
    });
}

const db = getDatabase(app);
const dbRef = ref(db);
export  async function getRead() {
    await get(child(dbRef, "/admin"))
        .then(snapshot => {
            if (snapshot.exists()) {
                // console.log(snapshot.val().id);
                return snapshot.val().id ;
            } else {
                console.log("No data available");
            }
        })
        .catch(error => {
            console.error(error);
        });
}
