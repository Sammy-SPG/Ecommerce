import { useEffect, useState } from "react";
import { Spin } from "../../../components/organism/spin";
import { API_URL } from "../../../constants/env";
import { getToken } from "../../../helpers/auth";
import ChevronRightIcon from 'react-feather/dist/icons/chevron-right';
import { ChevronDown } from "react-feather";
import Pedido from "../../../components/templates/Pedido";

const getCustomerData = async () => {
    try {
        const resCustomer = await fetch(`${API_URL}v1/admin/customers/`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        });

        const customer = await resCustomer.json();
        return customer;

    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

const getCheckoutCustomer = async (customerID) => {
    console.log(customerID);
    try {
        const responseCheckout = await fetch(`${API_URL}v1/admin/checkout/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ customer: customerID })
        });

        const checkout = await responseCheckout.json();
        return checkout;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

const Customers = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null); // Estado para rastrear el cliente seleccionado
    const [customerData, setCustomerData] = useState([]);
    const [checkout, setCheckout] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                setCustomerData(await getCustomerData());
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleSelectedCustomer = async (customer) => {
        setCheckout(await getCheckoutCustomer(customer.idStripe));
        setSelectedCustomer(customer)
    }

    if (loading) return <Spin />

    return (
        <div className="max-w-screen-md mx-auto">
            <h2 className="text-lg font-medium mb-4">Clientes</h2>
            <ul className="divide-y divide-gray-200">
                {customerData.map((customer) => (
                    <li key={customer.idStripe} className="py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium text-lg">{customer.name[0]}</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-lg font-medium text-gray-900">{customer.name}</p>
                                    <p className="text-gray-500">{customer.phone}</p>
                                    <p className="text-gray-500">{customer.address.city}, {customer.address.state}. CP: {customer.address.postal_code}</p>
                                </div>
                            </div>
                            <button
                                className="text-indigo-500 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
                                onClick={() => handleSelectedCustomer(customer)}
                            >
                                <span className="sr-only">Ver pedidos</span>
                                {!selectedCustomer ? <ChevronRightIcon className="h-8 w-8" aria-hidden="true" /> : <ChevronDown className="h-8 w-8" aria-hidden="true" />}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedCustomer && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">{selectedCustomer.name}</h3>
                    <p className="text-gray-500">Contacto: {selectedCustomer.phone}</p>
                    <p className="text-gray-500">Lugar de envio: {selectedCustomer.address.line1}</p>
                    <div className="overflow-auto max-w-lg my-6 max-h-80">{checkout.map((item, i) => <Pedido key={i} charge={item.charge} created={item.created} data={item.data} />)}</div>
                    <button
                        className="mt-4 text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 px-4 py-2 rounded-md"
                        onClick={() => setSelectedCustomer(null)}
                    >
                        Cerrar
                    </button>
                </div>
            )}
        </div>
    );
}

export default Customers;