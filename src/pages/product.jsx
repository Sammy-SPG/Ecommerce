import Slider from "../components/molecule/slider"
import Carousel from "../components/organism/carousel"
import { Spin } from "../components/organism/spin";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { API_URL } from "../constants/env";
import { Target } from "../components/organism/target";
import { getToken } from "../helpers/auth";
import infoMessage from "../helpers/messageInfo";
import CheckOunt from "../components/organism/checkOunt";
import TbodyCaracteristicas from "../components/molecule/tbody";
import AddToCartButton from "../components/atoms/AddToCartButton";
import FormatText from "../components/atoms/formatText";
import Comments from "../components/templates/Comments";

export const Product = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dtaProducts, setDataProducts] = useState([]);
    const [cantidad, setCantidad] = useState(1);
    const [imgSelected, setImageSelected] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const query = await fetch(`${API_URL}v1/products/${id}`);
                const result = await query.json();
                setData(result);
                setImageSelected(result.images[0]);

                const response = await fetch(`${API_URL}v1/getComments/${id}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                });
                const responseBody = await response.json();
                if (responseBody.acknowledged) setComments(responseBody.coments);
                else setComments([]);

            } catch (error) {
                setError(error);
            } finally {
                window.scroll(0, 0);
                setLoading(false);
            }
        })();
    }, [id]);

    useEffect(() => {
        if (loading && !data) return;

        if (getToken() === null) infoMessage('Inicia sesion para poder realizar la compra');

        (async () => {
            const query = await fetch(`${API_URL}v1/products/querysimilar`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ rating: data?.metadata?.rating })
            });
            const result = await query.json();
            setDataProducts(result);
        })();
    }, [loading]);

    const TableProduct = () => {
        return (Object.values(data.metadata).map((value, i) => i != 0 && <TbodyCaracteristicas key={i} value={value} Caracteristica={Object.keys(data.metadata)[i]} />));
    }

    const ImageProduct = () => {
        return (
            <div className="col-span-2 flex items-stretch justify-evenly">
                <div className="m-4 p-4">
                    {data.images.map((url, i) => (<div key={i} className="w-14 h-14 my-1 border border-cyan-300 p-1 rounded-md"><img className="w-full h-full rounded-sm" src={url} onClick={() => setImageSelected(url)} alt="" /></div>))}
                </div>
                <div className="p-8"><img className="img-product" src={imgSelected} /></div>
            </div>
        );
    }

    const ProductPayment = () => {
        return (
            <div className="col-span-2">
                <div className="p-2">
                    <div>
                        <div className="my-6">
                            <h3 className="font-sans text-base font-normal my-4">Caracteristicas del producto: </h3>
                            {dtaProducts.length > 0 && <table><TableProduct /></table>}
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
                        <Target img={product.image} name={product.name} price={product.price} description={product.description} id={product.id_product}></Target>
                    </Slider>
                ))}
            </Carousel>
        );
    }

    const MainProducst = () => {
        return (
            <div className="pt-36 width-screen-main">
                <div className="grid grid-cols-3 gap-2 content-center">
                    <ImageProduct />
                    <div className="border p-4 rounded-lg h-max">
                        <div>
                            <p className="text-slate-500 text-sm text-ellipsis font-sans text-center my-1">Vendidos  |  <span>+1000</span></p>
                            <h3 className="text-slate-900 text-lg font-normal font-sans text-start">{data.name}</h3>
                        </div>
                        <div className="my-4 flex items-center">
                            <div className="flex items-center">
                                <p className="text-slate-800 text-md">Cantidad: </p>
                                <select className="mx-2 selectBody" onChange={(e) => setCantidad(e.target.value)} multiple={false} defaultValue={cantidad}>
                                    <option value="1">1 unidad</option>
                                    <option value="2">2 unidades</option>
                                    <option value="3">3 unidades</option>
                                </select>
                            </div>
                            <AddToCartButton id={data.id_product} id_price={data.id_price} name={data.name} image={data.images[0]} price={data.price} description={data.description} />
                        </div>
                        <CheckOunt total={data.price * cantidad} price={data.price} products={[{ price: data.id_price, quantity: cantidad }]} />
                        <div>
                            <p className="my-4 text-green-500">Metodos de Pago: </p>
                            <div className="flex items-center justify-between">
                                <div className="w-4/5">
                                    <div className="w-full">
                                        <img src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg" className="w-1/3" alt="Visa" />
                                    </div>
                                </div>
                                <div className="w-4/5">
                                    <div className="w-full">
                                        <img src="https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg" className="w-1/3" alt="American Express" />
                                    </div>
                                </div>
                                <div className="w-4/5">
                                    <div className="w-full">
                                        <img src="https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg" className="w-1/3" alt="Mastercard" />
                                    </div>
                                </div>
                                <div className="w-4/5">
                                    <div className="w-full">
                                        <img decoding="async" src="https://http2.mlstatic.com/storage/logos-api-admin/91b830e0-f39b-11eb-9984-b7076edb0bb7-m.svg" className="w-1/3" alt="OXXO" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <h4 className="my-6 text-xl font-medium">Descripcion</h4>
                        <div className="my-2 text-md font-light text-justify">
                            <FormatText text={data.description} />
                        </div>
                    </div>
                    <ProductPayment />
                </div>

                <div>
                    <div className="mt-8">
                        <h3 className="font-sans text-xl font-medium">Publicaciones similares</h3>
                        <div>
                            {dtaProducts.length > 0 && <ContainerCarousel />}
                        </div>
                    </div>
                </div>

                <Comments idPublication={id} commentsPublication={comments} />
            </div>
        )
    }

    if (loading && !error) return <Spin />;
    if (error && !loading) return <h1>Error en la consulta</h1>;

    return (
        <MainProducst />
    )
}