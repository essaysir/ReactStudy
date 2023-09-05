import { createContext, useContext, useState , useEffect} from 'react';
import { onUserStateChange, login , logout } from '../../api/firebase';
const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [user, setUser] = useState('');
    // 로그인 된 정보를 세션에 저장하지 않으면, 새로고침 후 component 가 새로 생기면서
    // 값이 날라가므로, 이를 유지해줘야 한다.
    useEffect(()=>{
        onUserStateChange(user=>{
            setUser(user);
            // console.log(user);
            // console.log(user.isAdmin);
        });
    },[])
    return <AuthContext.Provider value={{user, login , logout}}>{children}</AuthContext.Provider>    
}
export function useAuthContext(){
    return useContext(AuthContext);
}