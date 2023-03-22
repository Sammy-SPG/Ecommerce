import { useEffect } from 'react'
import CheckoutPayment from '../../helpers/checkOunt';
import { formatPrice } from '../../helpers/number'

const CheckOunt = ({ total, products, price }) => {

    useEffect(() => {
        if (localStorage.getItem('TokenSessionPayment')) localStorage.removeItem('TokenSessionPayment');
    }, []);

    const renderPrice = (label, price) => (
        <div className="flex justify-between my-1">
            <p className="text-gray-700">{label}</p>
            <p className="text-gray-700">{formatPrice(price)}</p>
        </div>
    );

    return (
        <div className="w-full max-w-lg mt-6 h-full max-h-64 rounded-lg border bg-white p-4 shadow-md md:mt-0">
            {renderPrice('Precio:', price)}
            {renderPrice('Subtotal', total)}
            {renderPrice('Envio', 0)}
            <hr className="my-4" />
            <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                    <p className="mb-1 text-lg font-bold">{formatPrice(total)} USD</p>
                    <p className="text-sm text-gray-700">Incluye IVA</p>
                </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={() => CheckoutPayment(products)}>Check out</button>
        </div>
    );
}

export default CheckOunt;