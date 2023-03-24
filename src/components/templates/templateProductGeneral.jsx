import { useState } from "react"
import AddToCartButton from "../atoms/AddToCartButton";
import CheckOunt from "../organism/checkOunt";

const TemplateProductGeneral = ({ data }) => {

    const [cantidad, setCantidad] = useState(1);

    return (
        <div className="border p-4 rounded-lg h-max">
            <div>
                <p className="text-slate-500 text-sm text-ellipsis font-sans text-center my-1">Vendidos  |  <span>+1000</span></p>
                <h3 className="text-slate-800 text-lg font-medium font-sans text-start">{data.name}</h3>
            </div>
            <div className="my-4 flex items-center">
                <div className="flex items-center">
                    <p className="text-base font-normal">Cantidad: </p>
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
    );
}

export default TemplateProductGeneral;