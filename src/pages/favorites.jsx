import { useEffect, useState } from "react"
import { Spin } from "../components/organism/spin";
import { API_URL } from "../constants/env";
import { getToken } from "../helpers/auth";
import ErrorMessage from "../helpers/messageError";
import Success from "../helpers/messageSuccess";
import { formatPrice } from "../helpers/number";

const Favorites = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${API_URL}v1/getFavorites/`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                });
                const responseBody = await response.json();
                console.log(responseBody.products);
                setData(responseBody.products);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        )();
    }, []);

    const deleteFavorite = async (id) => {
        try {
            const response = await fetch(`${API_URL}v1/favorites/`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({ product: id })
            });

            const responseBody = await response.json();
            const newData = data.filter((item) => item.id_product !== id);
            setData(newData);

            if (!responseBody.acknowledged) return ErrorMessage('Eliminar de favoritos', responseBody.message);
            return Success(responseBody.message);
        } catch (error) {
            console.log(error);
        } finally {
            console.log(data);
        }
    }

    if (loading) return <Spin />

    return (
        <div className="pt-36 width-screen-main grid gap-4 grid-cols-1 content-center justify-items-center">
            {
                data?.map((item, i) => <div key={i} className="p-2 flex border-b border-gray-300">
                    <div style={{ backgroundImage: `url('${item.images[0]}')`, borderRadius: "15px", backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', width: '120px', height: '160px' }}></div>
                    <div className="p-4 flex flex-col justify-center max-w-xs">
                        <p className="my-2">{item.name}</p>
                        <p className="my-2">{formatPrice(item.price)}</p>
                    </div>
                    <button className="text-sky-700" onClick={() => deleteFavorite(item.id_product)}>Delete</button>
                </div>
                )}
        </div>
    )
}

export default Favorites;