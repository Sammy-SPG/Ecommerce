import Swal from 'sweetalert2'
import { Spin } from "../../../components/organism/spin";
import { formatPrice } from "../../../helpers/number";
import useFetchGet from "../../../hooks/useFetchGet";
import FormControl from "../../../components/molecule/formControl";
import { API_URL } from "../../../constants/env";
import { getToken } from "../../../helpers/auth";
import { Link } from "react-router-dom";
import DateUnix from '../../../helpers/date';
import ErrorMessage from '../../../helpers/messageError';
import { useEffect, useState } from 'react';

const ProductsTable = () => {
    const { data, error, loading, setData, setLoading } = useFetchGet('v1/admin/products/');
    const [dataAux, setDataAux] = useState([]);

    useEffect(() => {
        if (!loading && error) {
            if (error.message === "jwt malformed") {
                ErrorMessage('Sesion expirada, por favor vuelve a ingresar', error.message);
            }
        }
    }, [loading]);

    const deleteProduct = (product) => {
        Swal.fire({
            title: '¿Estas seguro de eliminar?',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const query = await fetch(`${API_URL}v1/admin/disabled/product/${product.id}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json',
                            Authorization: `Bearer ${getToken()}`
                        }
                    });
                    const result = await query.json();
                    data?.map((product, i) => result.id === data[i].id ? data.splice(i, 1) : null);
                    setData(data);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            } else return;
        });
    }

    const handleCheckProduct = (e) => {
        if (e.target.checked) {
            setDataAux(data);
            const newDataModa = data?.filter((product) => product.metadata.rating === e.target.value);
            setData(newDataModa);
        } else {
            setData(dataAux);
        }
    }

    if (loading && !error) return <Spin />;
    if (error) return <h1>Error en la peticion</h1>;

    return (
        <div className="w-full max-w-screen-xl m-auto p-6">
            <h3>Productos existentes</h3>

            <div className="flex items-center justify-between p-6">
                <form className="w-4/5">
                    <FormControl label="Buscar producto" typeInput="text" placeholder="buscar un producto" />
                </form>
                <Link to="/admin/products/create" className="text-sm rounded-lg bg-blue-500 p-1.5 text-white duration-100 hover:bg-blue-600">Agregar producto</Link>
            </div>

            <div className='flex items-start'>
                <div className='w-2/6'>
                    <div className='my-2'>
                        <h4>Tipo de producto</h4>
                        <div className='flex flex-col mx-3'>
                            <label className='my-1'><input type="checkbox" className='mx-1' value="todos" />Todos</label>
                            <label className='my-1'><input type="checkbox" className='mx-1' value="moda" onClick={handleCheckProduct} />Moda</label>
                            <label className='my-1'><input type="checkbox" className='mx-1' value="tecnologia" onClick={handleCheckProduct} />Tecnologia</label>
                            <label className='my-1'><input type="checkbox" className='mx-1' value="hogar" onClick={handleCheckProduct} />Hogar</label>
                            <label className='my-1'><input type="checkbox" className='mx-1' value="juegos" onClick={handleCheckProduct} />Jugueteria</label>
                        </div>
                    </div>
                    <div className='my-2'>
                        <h4>Ordenar por:</h4>
                        <div className='flex flex-col mx-3'>
                            <label className='my-1'><input type="checkbox" className='mx-1' />Fecha de creacion</label>
                            <label className='my-1'><input type="checkbox" className='mx-1' />Fecha de actualizacion</label>
                            <label className='my-1'><input type="checkbox" className='mx-1' />Vistas</label>
                            <label className='my-1'><input type="checkbox" className='mx-1' />Precio</label>
                        </div>
                    </div>
                </div>
                {data.length > 0 ? <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Nombre</th>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Precio</th>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Fecha de creacion</th>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Actualizado</th>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((product) => (
                            <tr key={product.id}>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 truncate">{product.name?.substr(0, 45)}</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{formatPrice(product.price)}</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{DateUnix(product.create)}</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{DateUnix(product.update)}</td>
                                <td><button className="bg-red-500 p-1.5 text-sm rounded-lg text-white mx-2" data-product-id={product.id} onClick={() => deleteProduct(product)}>Eliminar</button><Link className="bg-amber-500 p-1.5 text-sm rounded-lg text-white" to={`/admin/products/update?id=${product.id}`}>Actualizar</Link></td>
                            </tr>))}
                    </tbody>
                </table> : <div>No hay productos en existencia <Link to="/admin/products/create" className="text-sm rounded-lg bg-blue-500 p-1.5 text-white duration-100 hover:bg-blue-600">Agrege un producto</Link></div>}
            </div>
        </div>
    )
}

export default ProductsTable;