import { Link } from "react-router-dom"
import { deleToken, getToken } from "../../helpers/auth"

const MainListMenu = () => {

    const CloseSesion = () => {
        deleToken();
        location.href = "/";
    }

    return (
        <nav className="w-3/4">
            <ul className="flex justify-around items-cente">
                <li className="text-gray-100"><Link to="/">Inicio</Link></li>
                <li className="text-gray-100"><Link to="/offers">Ofertas</Link></li>
                {getToken() && <li className="text-gray-100"><Link to="/shoppingHistory">Historial de compras</Link></li>}
                {getToken() && <li className="text-gray-100"><Link to="/cart">Carrito</Link></li>}
                <li className="text-gray-100"><Link to="/contact">Contacto</Link></li>
                {!getToken() ? <li className="text-gray-100"><Link to="/login" className="cursor-pointer">Iniciar sesion</Link></li> : <li className="text-gray-100"><a onClick={CloseSesion} className="cursor-pointer">Cerrar sesion</a></li>}
            </ul>
        </nav>
    )
}

export default MainListMenu;