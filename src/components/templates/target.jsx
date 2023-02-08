import { useState } from "react"
import { Link } from "react-router-dom"
import { formatPrice } from "../../helpers/number"

export const Target = ({ img, name, description, price, id }) => {
    const [isShown, setIsShown] = useState(false);

    return (
        <div className="rounded-xl bg-white shadow-lg my-2 hover:shadow-xl hover:transform hover:scale-105 duration-200" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
            <div className="max-h-56 overflow-hidden">
                <Link to={`/product/${id}`}><img className="rounded-t-xl img-target" src={img} alt="Imagen del producto" /></Link>
            </div>
            <div className="p-5">
                <div className="">
                    <p className="my-3 mt-2 text-zinc-600 truncate">{name}</p>
                    <div className="flex items-center justify-between my-2">
                        <span className="block mt-1 text-lg leading-tight font-medium text-black hover:underline text-green-500">{formatPrice(price)}</span>
                        <button className="text-sm rounded-lg bg-blue-500 p-1.5 text-white duration-100 hover:bg-blue-600">Añadir al carrito</button>
                    </div>
                </div>
            </div>
            <div className="relative min-h-max">
                <div className={isShown ? "absolute border-b border-x border-solid border-inherit rounded-b-xl text-slate-500 text-xs text-ellipsis p-3 bg-target" : "absolute text-slate-500"}>{isShown ? description?.substr(0, 55) + "..." : null}</div>
            </div>
        </div>
    )
}
