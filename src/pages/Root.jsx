import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContextProvider } from '../components/context/AuthContext';

export default function Root() {
    return (
        <div className='p-3'>
            <AuthContextProvider>
                <Navbar/>
                <Outlet/>
            </AuthContextProvider>
        </div>
    );
}

