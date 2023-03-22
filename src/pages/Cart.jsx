import { useContext, useEffect, useState } from "react";
import FormatText from "../components/atoms/formatText";
import CheckOunt from "../components/organism/checkOunt";
import { CartContex } from "../context/cartContext";
import { formatPrice } from "../helpers/number";

const Cart = () => {

    const { state, dispatch } = useContext(CartContex);
    const [ValuesCart, setValuesCart] = useState([]);
    const [Total, setTotal] = useState([0]);
    const [productsCheckOut, setProductsCheckOut] = useState([]);

    useEffect(() => {
        const arrayValuesCart = Object.values(state.cart);

        setValuesCart(arrayValuesCart);
        setTotal(arrayValuesCart.map((product) => product.price * product.quantity));
        setProductsCheckOut(arrayValuesCart.map(({ id_price, quantity }) => ({ price: id_price, quantity })));
        console.log(arrayValuesCart);
    }, [state]);

    const addItem = (id) => {
        dispatch({
            type: 'Add',
            body: { id }
        });
    }

    const removeItem = (id) => {
        dispatch({
            type: 'Remove',
            body: { id }
        });
    }

    const TargetItemCart = ({ id, img, name, price, quantity, description }) => {
        return (
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src={img} alt="product-image" className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900 truncate w-72 max-w-xs">{name}</h2>
                        <div className="mt-1 text-xs text-gray-700 max-w-sm"><FormatText text={description} limit={2} /></div>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => removeItem(id)}> - </span>
                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" min="1" placeholder={quantity} />
                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => addItem(id)}> + </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <p className="text-sm">{formatPrice(price)}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (ValuesCart.length < 1) return <h3 className="h-screen w-full text-center bg-gray-100 pt-36">Aun no agregas nada al carrito, !Empieza a comprar!</h3>

    return (
        <div className="h-screen bg-gray-100 pt-36">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {ValuesCart.map((product) => <TargetItemCart key={product.id} id={product.id} name={product.name} img={product.image} price={product.price} quantity={product.quantity} description={product.description} />)}
                </div>
                <CheckOunt total={Total.reduce((acc, key) => acc + key, 0)} products={productsCheckOut} price={[0]} />
            </div>
        </div>
    )
}

export default Cart;