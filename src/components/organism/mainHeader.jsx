
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../molecule/logo";
import MainListMenu from "../molecule/mainListMenu";

const MainHeader = () => {

    const navigate = useNavigate();

    const [rating, setRating] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        navigate(`/products/shears/${event.target.name.value}/${rating}`, { replace: true, relative: true });
    }

    return (
        <div className="fixed w-full bg-gradient z-50 p-2">
            <header className="w-full max-w-screen-lg m-auto flex items-center justify-between py-1">
                <Logo />
                <MainListMenu />
            </header>
            <div className="w-full max-w-screen-lg m-auto flex items-center justify-center bg-gradient">
                <div className="h-12">
                    <select className="h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4" onChange={(e) => setRating(e.target.value)}>
                        <option defaultValue={'todos'} >Categoria</option>
                        <option>Tecnologia</option>
                        <option>Moda</option>
                    </select>
                </div>
                <div className="w-4/5 h-12">
                    <form className="w-full h-full" onSubmit={handleSubmit}>
                        <label className="text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                        <div className="relative w-full h-full">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none w-full">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input autoComplete="off" type="search" name="name" className="h-full block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500" placeholder="Buscar productos..." required />
                            <button type="submit" className="text-white absolute right-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MainHeader;