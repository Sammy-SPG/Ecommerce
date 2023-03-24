import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Carousel from "../components/organism/carousel";
import Comments from "../components/templates/Comments";
import FormatText from "../components/atoms/formatText";
import Slider from "../components/molecule/slider";
import { Spin } from "../components/organism/spin";
import { Target } from "../components/organism/target";
import TbodyCaracteristicas from "../components/molecule/tbody";
import { getToken } from "../helpers/auth";
import infoMessage from "../helpers/messageInfo";
import getProductDataByID from "../helpers/getProductDataByID";
import getSimilarProducts from "../helpers/getSimilarProducts";
import getComments from "../helpers/getComments";
import TemplateProductModa from "../components/templates/templateProductModa";
import TemplateProductGeneral from "../components/templates/templateProductGeneral";

export const Product = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataProductsSimilar, setDataProductsSimilar] = useState([]);
    const [imgSelected, setImageSelected] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setLoading(true);

        if (getToken() === null) infoMessage('Inicia sesion para poder realizar la compra');
        (async () => {
            try {
                const dataProduct = await getProductDataByID(id);
                const comments = await getComments(id);
                const productsSimilar = await getSimilarProducts(dataProduct?.metadata?.rating);

                setComments(comments);
                setData(dataProduct);
                setImageSelected(dataProduct.images[0]);
                setDataProductsSimilar(productsSimilar);

            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                window.scroll(0, 0);
                setLoading(false);
            }
        })();
    }, [id]);

    const TableProduct = () => {
        return (Object.values(data.metadata).map((value, i) => i != 0 && <TbodyCaracteristicas key={i} value={value} Caracteristica={Object.keys(data.metadata)[i]} />));
    }

    const ImageProduct = () => {
        return (
            <div className="col-span-2 flex items-start justify-center">
                <div className="grid grid-cols-1 gap-4 m-4 p-4">
                    {data.images.map((url, i) => (
                        <div
                            key={i}
                            className="w-20 h-20 border border-cyan-300 p-1 rounded-md cursor-pointer hover:border-cyan-500"
                            onClick={() => setImageSelected(url)}
                        >
                            <img className="w-full h-full rounded-md" src={url} alt="" />
                        </div>
                    ))}
                </div>
                <div className="p-8" style={{ width: '480px', maxHeight: '500px' }}>
                    <img className="img-product rounded-md shadow-lg" src={imgSelected} alt="" />
                </div>
            </div>
        );
    };

    const CharacteristicsProduct = () => {
        return (
            <div className="col-span-2">
                <div className="p-2">
                    <div className="my-6">
                        <h3 className="font-sans text-base font-normal my-4">Caracteristicas del producto: </h3>
                        {dataProductsSimilar.length > 0 && <table><TableProduct /></table>}
                    </div>
                </div>
            </div>
        );
    }

    const ContainerCarousel = () => {
        return (
            <Carousel>
                {dataProductsSimilar.map((product, i) => (
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

                    {data.metadata.rating === 'moda' && <TemplateProductModa data={data} />}
                    {data.metadata.rating != 'moda' && <TemplateProductGeneral data={data} />}

                    <div className="col-span-2">
                        <h4 className="my-6 text-xl font-medium">Descripcion</h4>
                        <div className="my-2 text-md font-light text-justify">
                            <FormatText text={data.description} />
                        </div>
                    </div>
                    <CharacteristicsProduct />
                </div>
                <div>
                    <div className="mt-8">
                        <h3 className="font-sans text-xl font-medium">Publicaciones similares</h3>
                        <div>
                            {dataProductsSimilar.length > 0 && <ContainerCarousel />}
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