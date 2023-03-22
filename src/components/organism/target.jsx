import { useState } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../../constants/env";
import { getToken } from "../../helpers/auth";
import infoMessage from "../../helpers/messageInfo";
import Success from "../../helpers/messageSuccess";

import { formatPrice } from "../../helpers/number";
import AddToCartButton from "../atoms/AddToCartButton";

export const Target = ({ img, name, description, price, id, id_price }) => {
    const [isShown, setIsShown] = useState(false);

    const addFavorite = async (id) => {
        const response = await fetch(`${API_URL}v1/favorites/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ product: id })
        });

        const responseBody = await response.json();
        if (!responseBody.acknowledged) return infoMessage(responseBody.message);
        return Success(responseBody.message);
    }

    return (
        <div className="max-w-sm xl:80 lg:w-72 md:w-60 sm:w-56 rounded-xl shadow-box hover:transform hover:scale-105 duration-200" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} >
            <div className="max-h-56 overflow-hidden">
                <Link to={`/product/${id}`}>
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="rounded-t-xl" style={{ backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', width: '100%', height: '200px' }} ></div>
                    </div>
                </Link>
                <img style={{ display: isShown ? 'block' : 'none', position: 'absolute', left: '88%', top: '0', cursor: 'pointer', zIndex: '1000' }} src="https://img.icons8.com/ios-glyphs/36/3498DB/like--v1.png" onClick={() => addFavorite(id)} />
            </div>
            <div className="p-5">
                <div>
                    <p className="my-3 mt-2 text-zinc-600 truncate">{name}</p>
                    <div className="flex items-center justify-between my-2">
                        <span className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ">{formatPrice(price)}</span>
                        <AddToCartButton id={id} id_price={id_price} image={img} name={name} price={price} description={description} />
                    </div>
                </div>
            </div>
            <div className="relative max-w-sm xl:80 lg:w-72 md:w-60 sm:w-56" style={{ display: isShown ? 'block' : 'none' }}>
                <div className={"absolute border-b border-x border-solid border-inherit rounded-b-xl text-slate-500 text-xs text-ellipsis p-3 bg-target"} style={{ width: "100%" }}>
                    {isShown ? description?.substr(0, 55) + "..." : null}
                </div>
            </div>
        </div>
    );
}