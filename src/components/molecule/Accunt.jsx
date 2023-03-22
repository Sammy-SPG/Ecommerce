import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../constants/env';
import { getToken } from '../../helpers/auth';
import { UserContex } from '../../context/userContext';

const Accunt = () => {
    const [optionsNav, setOptionsNav] = useState(false);
    const [data, setData] = useState();
    const { dispatch } = useContext(UserContex);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}v1/perfil/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            const responseData = await response.json();
            dispatch({
                type: 'login',
                body: {
                    id: responseData.idStripe,
                    email: responseData.email,
                    name: responseData.name,
                    phone: responseData.phone,
                    address: responseData.address
                }
            });
            setData(responseData);
        })();
    }, []);

    return (
        <div onClick={() => setOptionsNav(!optionsNav)} onMouseEnter={() => setOptionsNav(true)} onMouseLeave={() => setOptionsNav(false)}>
            <div className='flex items-center justify-center'>{data?.name.split(' ').slice(0, 2).join(' ')} <img className='mx-1' src="https://img.icons8.com/ios-glyphs/22/eeeeee/chevron-down.png" /></div>
            <nav className='absolute bg-gray-100 text-gray-700 p-3 z-50 rounded-lg' style={{ display: optionsNav ? 'block' : 'none' }}>
                <ul className='flex flex-col'>
                    <div className='my-2'>
                        <Link to="/profile/">Perfil</Link>
                    </div>
                    <div className='my-2'>
                        <Link to="/shoppingHistory">Historial de compras</Link>
                    </div>
                    <div className='my-2'>
                        <Link to="/favorites">Favoritos</Link>
                    </div>
                </ul>
            </nav>
        </div>
    );
}

export default Accunt;