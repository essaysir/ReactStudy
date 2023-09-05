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
import { getDatabase, ref,  get } from "firebase/database";

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
const database = getDatabase(app);

// 구글 로그인과 깃허브 로그인 둘다 실행되도록 해놓음
export  function login(brand){
    if ( brand === 'Google')  return signInWithPopup(auth, provider).catch(console.error);
    if ( brand === 'Github') return signInWithPopup(auth,githubProvider).catch(console.error);
}

export  function logout(){
    return signOut(auth).catch(console.error);
}

export function  onUserStateChange(callback){
    onAuthStateChanged(auth, async (user)=>{
        // 1. 사용자가 있는 경우에 ( 로그인한 경우 )
        // 2. 사용자가 어드민 권한을 가지고 있는 지 확인 ! 
        // 3. {...user , isAdmin : true / false }
        // console.log(user);
        
        const updatedUser = user ? await adminUser(user) : null ;
        callback(updatedUser);
    });
}

async function adminUser(user){
    return get(ref(database,'admins'))
    .then((snapshot)=>{
        if ( snapshot.exists()){
            const admins = snapshot.val();
            // console.log(admins);
            const isAdmin = admins.includes(user.uid);
            return {...user, isAdmin }
        }
        return user; 
    })
}

