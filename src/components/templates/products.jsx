import { Spin } from "../organism/spin";
import { Target } from "./target";
import useFetchGet from "../../hooks/useFetchGet";

const Products = () => {
    const { data, error, loading } = useFetchGet('v1/products');

    if (loading && !error) return <Spin />;
    if (error) return <h1>Error en la peticion</h1>;

    return (
        <div className="grid gap-7 grid-cols-4 w-4/5 max-w-screen-xl m-auto p-5">
            {data?.map((product) => <Target key={product.id} id={product.id} name={product.name} price={product.price} description={product.description} img={product.images[0]} />)}
        </div>
    )
}

export default Products;