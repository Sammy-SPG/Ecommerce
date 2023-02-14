import { useEffect, useState } from "react";
import { API_URL } from "../constants/env";
import { getToken } from "../helpers/auth";
import { Spin } from "../components/organism/spin";

const ProductSuccess = () => {

    const [dataPayment, setDataPayment] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const res = await fetch(`${API_URL}v1/product/succeeded/${localStorage.getItem('TokenSessionPayment')}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            });
            const body = await res.json();
            setDataPayment(body);
            setLoading(false);
        })();
    }, []);

    const handleClick = () => {
        localStorage.removeItem('TokenSessionPayment');
        location.href = '/';
    }

    if (loading) return <Spin />

    if (!loading) return (
        <div className="w-full">
            <div className="w-1/2 m-auto rounded-xl bg-white shadow-lg my-2 hover:shadow-xl p-8">
                <div className="flex flex-col items-center bg-green-500 rounded-xl p-6">
                    <h4 className="text-4xl font-light tracking-wide text-slate-100 my-3 text-center">Excelente compra!</h4>
                    <img src={dataPayment.image} className="rounded-full w-80" />
                </div>
                <div className="p-3">
                    <h4 className="text-base font-semibold">Detalles de la compra:</h4>
                    <div className="my-2">
                        <p className="text-center my-2">{dataPayment.description}</p>
                        <div>
                            <div><p className="text-base font-semibold inline">Cantidad</p>: x{dataPayment.quantity}</div>
                            <div><p className="text-base font-semibold inline">Total</p>: ${dataPayment.amount_total / 100}</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-evenly items-center">
                    <button className="w-48 text-sm rounded-lg bg-blue-500 p-1.5 text-white duration-100 hover:bg-blue-600 mx-2">Ver historial de compras</button>
                    <a href={dataPayment.charge} className="w-48 text-center text-sm rounded-lg bg-blue-500 p-1.5 text-white duration-100 hover:bg-blue-600 mx-2">Ver recibo de compra</a>
                    <button className="w-48 text-sm rounded-lg bg-blue-500 p-1.5 text-white duration-100 hover:bg-blue-600 mx-2" onClick={handleClick}>Volver al inicio</button>
                </div>
            </div>
        </div>
    )
}

export default ProductSuccess;