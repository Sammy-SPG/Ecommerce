import useFetchGet from "../../../hooks/useFetchGet";
import { useEffect, useState, useRef } from "react";
import { Spin } from "../../../components/organism/spin";
import { BodyCreateModa } from "../../../components/organism/bodyCreateModa";
import { BodyCreateTeno } from "../../../components/organism/bodyCreateTeno";
import { Submit } from "../../../components/molecule/submit";
import { API_URL } from "../../../constants/env";
import { getToken } from "../../../helpers/auth";
import FormControl from "../../../components/molecule/formControl";
import Success from '../../../helpers/messageSuccess';
import ErrorMessage from '../../../helpers/messageError';
import evtFile from "../../../hooks/uploadFile";

export const Update = () => {
    const ref = useRef(null);
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    const id = urlParams.get('id');
    const { data, error, loading } = useFetchGet(`v1/admin/products/${id}`);

    const [selectedFile, setSelectedFile] = useState([]);

    const [talla, setTalla] = useState([]);

    const [tecno, setTecno] = useState([]);
    const [Ram, setRam] = useState([]);
    const [Marca, setMarca] = useState([]);
    const [Almacenamiento, setAlmacenamiento] = useState([]);
    const [procesador, setProcesador] = useState([]);


    useEffect(() => {
        if (!loading && !error) {
            const currentRef = ref.current;
            currentRef.src = data.images[0];
            if (data?.metadata.rating === "tecnologia") {
                setAlmacenamiento(data.metadata.almacenamiento);
                setMarca(data.metadata.marca);
                setTecno(data.metadata.tecno);
            }
        }
    }, [loading]);

    useEffect(() => {
        const currentRef = ref.current;
        if (selectedFile.length > 0) {
            currentRef.setAttribute("src", URL.createObjectURL(selectedFile[0]));
        }
    }, [selectedFile]);

    useEffect(() => {
        if (!loading && error) {
            if (error.message === "jwt malformed") {
                ErrorMessage('Sesion expirada, por favor vuelve a ingresar', error.message);
            }
        }
    }, [loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let metadata = {};

        if (data.metadata.rating === 'moda') metadata = {
            rating: 'moda',
            color: e.target.color.value,
            talla: talla.toString()
        }

        if (data.metadata.rating === 'tecnologia') {
            if (tecno === "telefonia") metadata = {
                rating: 'tecnologia',
                tecno: 'telefonia',
                marca: Marca,
                Ram: Ram,
                almacenamiento: Almacenamiento
            }
            else if (tecno === "computacion") metadata = {
                rating: 'tecnologia',
                tecno: 'computacion',
                marca: Marca,
                Ram: Ram,
                almacenamiento: Almacenamiento,
                procesador: procesador
            }
        }

        let dataUpdate = {
            price: e.target.price.value,
            description: e.target.description.value,
            metadata
        }

        if (selectedFile.length > 0) {
            const arrayResponseImages = await evtFile(selectedFile);
            const arrayUrlImages = arrayResponseImages?.map((dataImage) => dataImage.url);
            dataUpdate = { ...dataUpdate, images: arrayUrlImages }
        }

        try {
            const query = await fetch(`${API_URL}v1/admin/update/product/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(dataUpdate)
            });
            const res = await query.json();
            if (!res.message) {
                if (res.status === 'success') {
                    Success('Producto Actualizado Exitosamente', '/admin/');
                }
                else ErrorMessage('Error al actualizar el producto', "error");
            } else {
                ErrorMessage('La sesion a expirado, favor de volver a iniciar', "Sesion expirada");
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (loading && !error) return <Spin />;
    if (error && !loading) return <h1>Error al intentar Acceder</h1>;

    return (
        <div className="w-4/5 m-auto flex justify-center py-6 px-6">
            <form className="w-full p-6" onSubmit={handleSubmit}>
                <h2 className="text-center mb-3">Actualizar producto</h2>
                <select name="select" value={data?.metadata?.rating} className="select">
                    <option>Tipo de producto</option>
                    <option value={data.metadata.rating}>{data.metadata.rating}</option>
                </select>

                <div className="flex">
                    <FormControl label="Nombre del producto:" typeInput="text" nameInput="productName" placeholder={data.name} diseable={true} />
                    <FormControl label="Precio:" typeInput="number" nameInput="price" placeholder={data.price} />
                </div>

                {data.metadata.rating === "moda" ? <BodyCreateModa talla={talla} setTalla={setTalla} /> : null}
                {data.metadata.rating === "tecnologia" ? <BodyCreateTeno Ram={Ram} setRam={setRam} Marca={Marca} setMarca={setMarca} Almacenamiento={Almacenamiento} setAlmacenamiento={setAlmacenamiento} procesador={procesador} setProcesador={setProcesador} tecno={tecno} setTecno={setTecno} /> : null}

                <div className="my-2 mr-1 w-full">
                    <label htmlFor="">Descripcion: </label>
                    <textarea name="description" className="form-input" rows={5}>{data.description}</textarea>
                </div>
                <input type="file" className="inputFile" multiple onChange={(e) => setSelectedFile(e.target.files)} />
                <Submit title="Actualizar Product" />
            </form>
            <div className="w-4/5 px-3 flex flex-col items-center border-l-4 border-indigo-500">
                <h1 className="py-4 text-center">Imagenes seleccionadas</h1>
                <div className="min-w-md max-w-md">
                    <img ref={ref} className="img-selected" />
                </div>
            </div>
        </div>
    )
}
