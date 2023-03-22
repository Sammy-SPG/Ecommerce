import { Spin } from "../organism/spin";
import { Target } from "../organism/target";
import useFetchGet from "../../hooks/useFetchGet";

const Products = () => {
    const { data, error, loading } = useFetchGet('v1/products');

    if (loading && !error) return <Spin />;
    if (error) return <h1>Error en la peticion</h1>;

    return (
        <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 content-center justify-items-center overflow-hidden h-max min-h-screen">
            {data?.map((product) => <Target key={product.id_product} id={product.id_product} id_price={product.id_price} name={product.name} price={product.price} description={product.description} img={product.images[0]} />)}
        </div>
    );
}

export default Products;