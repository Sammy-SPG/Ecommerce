import { Link } from "react-router-dom"
import { deleToken, getToken } from "../../helpers/auth"

const MainListMenuAdmin = () => {

    const CloseSesion = () => {
        deleToken();
        location.href = "/login/admin";
    }

    return (
        <nav className="w-3/5">
            <ul className="flex justify-around items-cente">
                <li className="text-gray-100"><Link to="/admin">Inicio</Link></li>
                <li className="text-gray-100"><Link to="/admin/customers">Clientes</Link></li>
                <li className="text-gray-100"><Link to="/admin/charges">Pagos</Link></li>
                <li className="text-gray-100"><Link to="/contact">Ayuda</Link></li>
                {!getToken()? <li className="text-gray-100"><Link to="/login" className="cursor-pointer">Iniciar sesion</Link></li> : <li className="text-gray-100"><a onClick={CloseSesion} className="cursor-pointer">Cerrar sesion</a></li>}
            </ul>
        </nav>
    )
}

export default MainListMenuAdmin;