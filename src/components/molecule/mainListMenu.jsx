import { Link } from "react-router-dom"

const MainListMenu = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/Products">Productos</Link></li>
                <li><Link to="/offers">Ofertas</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
            </ul>
        </nav>
    )
}

export default MainListMenu