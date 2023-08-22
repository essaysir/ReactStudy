import {  Link} from 'react-router-dom';
import {PiCakeBold} from 'react-icons/pi'
import {BsFillPencilFill} from 'react-icons/Bs'
import {login, logout, onUserStateChange, getRead} from '../api/firebase';
import {useEffect, useState} from "react";
import User from "./User.jsx";

export default function Navbar() {
    const [user, setUser] = useState('');
    const [isAdmin , setIsAdmin] = useState(false);
    console.log(user);
    const handleLogin =  async (event)=>{
        // console.log(event.currentTarget.textContent);
        login(event.currentTarget.textContent);
        // 로그인을 함과 동시에 관리자인지 아닌지 파악해보려고 하는데, 해당 정보를 빼오려고 하면
        // undefined 가 발생한다. 이는 비동기적 처리로 인한 문제 같은데 이에 대해 알아보자.
        const loginId = login.email ;
        const adminId = await getRead();
        console.log (loginId, adminId);
    };

    // 로그인 된 정보를 세션에 저장하지 않으면, 새로고침 후 component 가 새로 생기면서
    // 값이 날라가므로, 이를 유지해줘야 한다.
    useEffect(()=>{
        onUserStateChange(setUser);
    },[])

    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <PiCakeBold/>
                <h1 className=''>Cakeit</h1>
            </Link>
            <nav className='flex items-end gap-4 font-semibold'> {/* align-items: flex-end 추가 */}
                <Link to='/products'>
                    <p className='cursor-pointer mb-1'>Products</p> {/* mb-1을 추가하여 아래로 조금 띄움 */}
                </Link>
                
                <Link to='/carts'>
                    <p className='cursor-pointer mb-1'>Cakes</p> {/* mb-1을 추가하여 아래로 조금 띄움 */}
                </Link>
                { isAdmin && <Link className='cursor-pointer mb-2'>
                    <BsFillPencilFill/>
                </Link>}
                {/* login 인자가 없으니 생략가능  */}
                {user && <User user={user}/>}
                { user && <p onClick={logout} className='cursor-pointer mb-1'>Logout</p>}
                { !user && <p onClick={handleLogin} className='cursor-pointer mb-1'>Google</p>} {/* mb-1을 추가하여 아래로 조금 띄움 */}
                { !user && <p onClick={handleLogin} className='cursor-pointer mb-1'>Github</p>}
            </nav>
        </header>

    );
}

