import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Root() {
    return (
        <div className='p-3'>
            <Navbar/>
            <Outlet/>
        </div>
    );
}

