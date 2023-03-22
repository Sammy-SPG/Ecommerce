import { useEffect, useState } from 'react';
import { Spin } from '../components/organism/spin';
import { API_URL } from '../constants/env';
import { getToken } from '../helpers/auth';
import DateUnix from '../helpers/date';
import { formatPrice } from '../helpers/number';

const ShoppingHistory = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}v1/shoppingHistory`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            const responseBody = await response.json();
            setData(responseBody);
        })();
    }, []);

    const ItemElement = ({ dataCheck, date, charge }) => {
        let amountTotal;
        if (dataCheck.length >= 1) {
            amountTotal = dataCheck.map((item) => item.amount_total);
        }

        return (
            <div className='w-11/12 m-auto'>
                <div className='p-2'>
                    <h4 className='ml-2 text-lg font-semibold tracking-wider'>{DateUnix(date)}</h4>
                    <div className='p-2 flex justify-between rounded-xl bg-white shadow-lg my-2 hover:shadow-xl hover:transform hover:scale-105 duration-200'>
                        <div className='m-2'>
                            <img src={dataCheck[0].image} alt="" className='rounded-xl w-40' />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <p className='text-gray-700 text-sm font-normal my-2'>{dataCheck.length <= 1 ? dataCheck[0].description : "Comopra de varios productos"}</p>
                            <span>Cantidad:  x{dataCheck.length}</span>
                        </div>
                        <div className='flex flex-col items-center justify-center w-96'>
                            <a href={charge} className='m-2 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 text-center'>Ver recibo</a>
                            <span>Total: {formatPrice(amountTotal.reduce((acc, key) => acc + key, 0))}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (data.length < 1) return <Spin />

    if (data?.message === "No items found") return <h1 className='py-36 text-center'>No haz realizado ninguna compra!</h1>

    return (
        <div className='pt-36 max-w-7xl m-auto'>
            {data.map((item) => <ItemElement key={item.id_session} date={item.created} dataCheck={item.data} charge={item.charge} />)}
        </div>
    )
}


export default ShoppingHistory;
