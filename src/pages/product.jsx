import Slider from "../components/molecule/slider"
import Carousel from "../components/organism/carousel"
import { Spin } from "../components/organism/spin";
import useFetchGet from "../hooks/useFetchGet"
import { useParams } from 'react-router-dom';
import { formatPrice } from "../helpers/number";
import { useEffect, useState } from "react";
import { API_URL } from "../constants/env";
import { Target } from "../components/templates/target";
import { getToken } from "../helpers/auth";
import infoMessage from "../helpers/messageInfo";

export const Product = () => {
    const { id } = useParams();
    const { data, loading, error, setLoading } = useFetchGet(`v1/products/${id}`);
    const [dtaProducts, setDataProducts] = useState([]);
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        console.log(cantidad);
    }, [cantidad]);

    useEffect(() => {
        if (!loading && data) {
            if (getToken() === null) infoMessage('Inicia sesion para poder realizar la compra');
            (async () => {
                const query = await fetch(`${API_URL}v1/products/querysimilar`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ rating: data.metadata.rating })
                });
                const result = await query.json();
                setDataProducts(result);
            })();
        }
    }, [loading]);

    const handleClickCheckout = async () => {
        if (getToken !== null && data) {
            setLoading(true);
            const QueryUrl = await fetch(`${API_URL}v1/product/create-checkout-session/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ id: data.priceID })
            });

            const body = await QueryUrl.json();
            setLoading(false);
            localStorage.setItem('TokenSessionPayment', body.paymentIntent);
            location.href = body.url;
        }
    }

    const TableProduct = () => {
        return (
            <table className="table-fixed mt-3 w-full">
                <tbody>{Object.values(data.metadata).map((value, i) => (<tr key={i}>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{Object.keys(data.metadata)[i]}</th>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{value}</td></tr>))}
                </tbody>
            </table>
        );
    }

    const ImageProduct = () => {
        return (
            <div className="flex items-start justify-start w-full border-b border-inherit">
                <div className="flex flex-col w-14">
                    <div className="w-full h-16 my-1 border border-cyan-300 p-1 rounded-md"><img className="w-full h-full rounded-sm" src="https://http2.mlstatic.com/D_NQ_NP_834541-MLM49105948633_022022-O.webp" alt="" /></div>
                    <div className="w-full h-16 my-1 border border-cyan-300 p-1 rounded-md"><img className="w-full h-full rounded-sm" src="https://http2.mlstatic.com/D_NQ_NP_834541-MLM49105948633_022022-O.webp" alt="" /></div>
                    <div className="w-full h-16 my-1 border border-cyan-300 p-1 rounded-md"><img className="w-full h-full rounded-sm" src="https://http2.mlstatic.com/D_NQ_NP_834541-MLM49105948633_022022-O.webp" alt="" /></div>
                </div>
                <div className="w-full flex items-center justify-center"><img className="img-product" src={data.images[0]} /></div>
            </div>
        );
    }

    const ProductPayment = () => {
        return (
            <div className="border border-inherit rounded-lg w-3/5 p-5 ml-6">
                <p className="text-slate-500 text-sm text-ellipsis font-sans text-center my-1">Vendidos  |  <span>+1000</span></p>
                <div className="p-2">
                    <h3 className="text-slate-800 text-lg font-medium font-sans ">{data.name}</h3>
                    <p className="text-slate-900 text-3xl font-light my-8 mx-2.5">{formatPrice(data.price)}</p>

                    <div>
                        <div className="flex items-center mx-auto">
                            <p className="text-slate-800 text-md">Cantidad: </p>
                            <select className="mx-2 selectBody" onChange={(e) => setCantidad(e.target.value)} multiple={false} defaultValue={cantidad}>
                                <option value="1">1 unidad</option>
                                <option value="2">2 unidades</option>
                                <option value="3">3 unidades</option>
                            </select>
                        </div>
                        <div className="flex flex-col my-6">
                            <button className="mt-3 bg-blue-500 text-white py-2.5 px-6 rounded-md hover:bg-blue-600" onClick={handleClickCheckout}>Comprar ahora</button>
                            <button className="mt-4 bg-green-500 text-white py-2.5 px-6 rounded-md hover:bg-green-600">Agregar al carrito</button>
                        </div>
                    </div>

                    <div className="mt-12">
                        <p className="text-green-500">Metodos de Pago: </p>
                        <div className="flex items-center justify-between my-3 p-2">
                            <div className="w-4/5">
                                <div className="w-full">
                                    <img src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg" className="w-1/3" alt="Visa" /></div>
                            </div>
                            <div className="w-4/5">
                                <div className="w-full">
                                    <img src="https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg" className="w-1/2" alt="American Express" />
                                </div>
                            </div>
                            <div className="w-4/5">
                                <div className="w-full">
                                    <img src="https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg" className="w-1/2" alt="Mastercard" />
                                </div>
                            </div>
                            <div className="w-4/5">
                                <div className="w-full">
                                    <img decoding="async" src="https://http2.mlstatic.com/storage/logos-api-admin/91b830e0-f39b-11eb-9984-b7076edb0bb7-m.svg" className="w-1/2" alt="OXXO" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const ContainerCarousel = () => {
        return (
            <Carousel>
                {dtaProducts.map((product, i) => (
                    <Slider key={i}>
                        <Target img={product.image} name={product.name} price={product.price} description={product.description} id={product.id}></Target>
                    </Slider>
                ))}
            </Carousel>
        );
    }

    const MainProducst = () => {
        return (
            <div className="max-w-6xl m-auto">
                <div className="w-full m-auto flex p-4">
                    <ImageProduct />
                    <ProductPayment />
                </div>
                <div className="w-4/5 m-auto">
                    <div className="mt-8">
                        <h3 className="font-sans text-xl font-medium">Publicaciones similares</h3>
                        <div>
                            {dtaProducts.length > 0 && <ContainerCarousel />}
                        </div>
                    </div>
                    <div className="mt-8 p-2">
                        <h3 className="font-sans text-lg font-normal">Caracteristicas del producto</h3>
                        {dtaProducts.length > 0 && <TableProduct />}
                    </div>
                </div>
            </div>
        )
    }


    if (loading && !error) return <Spin />;
    if (error && !loading) return <h1>Error en la consulta</h1>;

    return (
        <MainProducst />
    )
}