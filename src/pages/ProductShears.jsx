import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TarjetShearsProduct from "../components/organism/TarjetShearsProduct";
import { API_URL } from "../constants/env";

const ProductShears = () => {
    const { name, rating } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}v1/shearsProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, rating })
            });
            const responseData = await response.json();
            console.log(responseData);
            setData(responseData);
        })();
    }, [name, rating]);

    return (
        <div className="pt-32 w-full">{data?.map((item, i)=> <div key={i}><TarjetShearsProduct id={item.id_product} id_price={item.id_price} name={item.name} description={item.description} img={item.images[0]} price={item.price}/></div>)}</div>
    )
}

export default ProductShears;