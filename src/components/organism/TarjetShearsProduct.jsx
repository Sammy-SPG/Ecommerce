import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers/number";
import AddToCartButton from "../atoms/AddToCartButton";

const TarjetShearsProduct = ({ id, id_price, name, img, description, price }) => {
    return (
        <div className="py-6 flex flex-col items-center justify-center">
            <div className="flex max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                <Link to={`/product/${id}`} className="w-full"><div style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', width: '100%', height: '100%' }}></div></Link>
                <div className="w-2/3 p-4">
                    <h1 className="text-gray-900 font-semibold text-xl">{name}</h1>
                    <p className="mt-2 text-gray-600 text-sm truncate">{description}</p>
                    <div className="flex item-center mt-2">
                        <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                        <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                        <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                        <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                        <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                    </div>
                    <div className="flex item-center justify-between mt-3">
                        <h1 className="text-gray-700 font-bold text-xl">{formatPrice(price)}</h1>
                        <AddToCartButton id={id} id_price={id_price} image={img} name={name} price={price} description={description}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TarjetShearsProduct;