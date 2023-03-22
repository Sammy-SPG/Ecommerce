import { useEffect, useState } from "react";
import { API_URL } from "../constants/env";
import { getToken } from "../helpers/auth";
import { Spin } from "../components/organism/spin";
import { Link } from "react-router-dom";

const ProductSuccess = () => {

    const [dataPayment, setDataPayment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const res = await fetch(`${API_URL}v1/product/succeeded/${localStorage.getItem('TokenSessionPayment')}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            });
            const body = await res.json();
            const amount_total = body.data.map((item) => item.amount_total);
            setTotal(amount_total);
            setDataPayment(body);
            setLoading(false);
            console.log(body);
        })();

        return () => { localStorage.removeItem('TokenSessionPayment') }
    }, []);

    const handleClick = () => {
        localStorage.removeItem('TokenSessionPayment');
        location.href = '/';
    }

    if (loading) return <Spin />

    if (!loading) return (
        <div className="pt-36 width-screen-main">
            <div className="w-1/2 m-auto rounded-xl bg-white shadow-lg my-2 hover:shadow-xl p-8">
                <div className="flex flex-col items-center bg-green-500 rounded-xl p-6">
                    <h4 className="text-4xl font-light tracking-wide text-slate-100 my-3 text-center">Excelente compra!</h4>
                    <div className="relative w-80 h-60">
                        {dataPayment.data.map((item, i) => <img key={item.id_product} src={item.image} className={`rounded-full w-60 h-60 absolute right-${i*3}`} />)}
                    </div>
                </div>
                <div className="p-3">
                    <h4 className="text-base font-semibold">Detalles de la compra:</h4>
                    <div className="my-2">
                        <p className="text-center my-2">{dataPayment.data.length <= 1 ? dataPayment.data[0].description : "Compra de varios productos"}</p>
                        <div>
                            <div><p className="text-base font-semibold inline">Cantidad</p>: x{dataPayment.data.length}</div>
                            <div><p className="text-base font-semibold inline">Total</p>: ${total.reduce((acc, key) => acc + key, 0)}</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-evenly items-center">
                    <Link to={'/shoppingHistory'} className="w-48 text-sm rounded-lg bg-blue-500 p-1.5 text-white duration-100 hover:bg-blue-600 mx-2">Ver historial de compras</Link>
                    <a href={dataPayment.charge} className="w-48 text-center text-sm rounded-lg bg-blue-500 p-1.5 text-white duration-100 hover:bg-blue-600 mx-2">Ver recibo de compra</a>
                    <button className="w-48 text-sm rounded-lg bg-blue-500 p-1.5 text-white duration-100 hover:bg-blue-600 mx-2" onClick={handleClick}>Volver al inicio</button>
                </div>
            </div>
        </div>
    )
}

export default ProductSuccess;