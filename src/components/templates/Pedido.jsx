import React from 'react'

const Pedido = ({created, charge, data}) => {

    return (
        <div className="max-w-md mx-auto my-2 bg-white rounded-md shadow-md overflow-hidden">
            <div className="p-4 bg-gray-100">
                <h3 className="text-lg font-medium text-gray-900">Detalles del pedido</h3>
                <p className="mt-1 text-sm text-gray-600">
                    Fecha de creación: {new Date(created * 1000).toLocaleDateString()}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    Cargado en: <a href={charge}>Ver Recibo</a>
                </p>
            </div>
            <div className="p-4 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-900">
                    Productos ({data.length})
                </h4>
                <ul className="mt-2 text-sm text-gray-600">
                    {data.map((producto) => (
                        <li className="flex items-center justify-between" key={producto.id_product}>
                            <div className="flex items-center">
                                <img src={producto.image} alt={producto.description} className="w-12 h-12 object-cover mr-4" />
                                <div>
                                    <p className="font-medium">{producto.description}</p>
                                    <p className="text-xs text-gray-500">{producto.quantity} x ${producto.amount_total / 100}</p>
                                </div>
                            </div>
                            <p className="font-medium">${producto.amount_total / 100}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between text-md font-medium text-gray-900">
                    <p>Total</p>
                    <p>${data.reduce((total, producto) => total + producto.amount_total, 0) / 100}</p>
                </div>
            </div>
        </div>
    )
}

export default Pedido