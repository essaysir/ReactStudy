import {  Link} from 'react-router-dom';
import {PiCakeBold} from 'react-icons/pi'
import {BsFillPencilFill} from 'react-icons/Bs'
import { AiOutlineMenu} from 'react-icons/ai'
import User from "./User.jsx";
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
    const [ isVisible , setIsVisible] = useState(false);
    const handleLogin =  (event)=>{
        // console.log(event.currentTarget.textContent);
        login(event.currentTarget.textContent);
        // 클릭한 타켓의 textContent 를 가져와서 , github 와 google 로그인이 되도록 하였다. 
    };
    const { user, login, logout } = useAuthContext();
    const showMenu = ()=>{
        setIsVisible(!isVisible);
    };
    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <section className='flex items-center'>
            <div>
            <AiOutlineMenu className='cursor-pointer' onClick={showMenu}/>
            { isVisible && 
            <section className=''>
                <ul>
                    <li> 케이크 </li>
                    <li> 떡케이크 </li>
                    <li> 수제케이크 </li>
                    <li> 주문제작케이크 </li>
                    <li> 케이크 </li>
                </ul>
            </section>
            }
            </div>
            <Link to='/' className='flex items-center text-4xl mx-2 text-brand'>
                <PiCakeBold/>
                <h1 className=''>Cakeit</h1>
            </Link>
            </section>
            
           
            <nav className='flex items-end gap-4 font-semibold'> {/* align-items: flex-end 추가 */}
                <Link to='/products'>
                    <p className='cursor-pointer mb-1'>Products</p> {/* mb-1을 추가하여 아래로 조금 띄움 */}
                </Link>
                { user && 
                <Link to='/carts'>
                    <p className='cursor-pointer mb-1'>Cakes</p> {/* mb-1을 추가하여 아래로 조금 띄움 */}
                </Link>}
                { user && user.isAdmin && <Link to='/products/new' className='cursor-pointer mb-2'>
                    <BsFillPencilFill/>
                </Link>}
                {/* login 인자가 없으니 생략가능  */}
                {user && <User user={user}/>}
                { user && <Button text={'logout'} onClick={logout} />}
                { !user && <p onClick={handleLogin} className='cursor-pointer mb-1'>Google</p>} {/* mb-1을 추가하여 아래로 조금 띄움 */}
                { !user && <p onClick={handleLogin} className='cursor-pointer mb-1'>Github</p>}
            </nav>
        </header>
    );
}

