import { Link } from "react-router-dom"

const MainListMenu = () => {
    return (
        <nav className="w-3/5">
            <ul className="flex justify-around items-cente">
                <li className="text-gray-100"><Link to="/">Inicio</Link></li>
                <li className="text-gray-100"><Link to="/Products">Productos</Link></li>
                <li className="text-gray-100"><Link to="/offers">Ofertas</Link></li>
                <li className="text-gray-100"><Link to="/contact">Contacto</Link></li>
            </ul>
        </nav>
    )
}

export default MainListMenu;