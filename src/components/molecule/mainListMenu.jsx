import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContex } from "../../context/cartContext";
import { UserContex } from '../../context/userContext';
import { deleToken, getToken } from "../../helpers/auth";
import Accunt from "./Accunt";

const MainListMenu = () => {

    const { state } = useContext(CartContex);
    const { dispatch } = useContext(UserContex);
    const [valuesCart, setValuesCart] = useState(0);

    useEffect(() => {
        const arrayKeyCart = Object.values(state);
        const arrayValuesCart = Object.values(arrayKeyCart[0]);
        if (arrayValuesCart.length > 0) setValuesCart(arrayValuesCart.length);
    }, [state])


    const CloseSesion = () => {
        dispatch({
            type: 'SignOff'
        });
        deleToken();
        location.href = "/";
    }

    return (
        <nav className="w-3/4">
            <ul className="flex justify-around items-cente">
                <li className="text-gray-100"><Link to="/">Inicio</Link></li>
                <li className="text-gray-100"><Link to="/offers">Ofertas</Link></li>
                {getToken() && <li className="text-gray-100"><Link to="/cart">Carrito{valuesCart > 0 && <span className="relative -top-2 bg-red-600 p-1 rounded-lg">{valuesCart}</span>}</Link></li>}
                <li className="text-gray-100"><Link to="/contact">Contacto</Link></li>
                {getToken() && <li className="text-gray-100"><Accunt /></li>}
                {!getToken() ? <li className="text-gray-100"><Link to="/login" className="cursor-pointer">Iniciar sesion</Link></li> : <li className="text-gray-100"><a onClick={CloseSesion} className="cursor-pointer">Cerrar sesion</a></li>}
            </ul>
        </nav>
    );
}

export default MainListMenu;