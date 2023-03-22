import { useState, useRef, useEffect } from "react";
import { Submit } from "../../../components/molecule/submit";
import { BodyCreateModa } from "../../../components/organism/bodyCreateModa";
import { BodyCreateTeno } from "../../../components/organism/bodyCreateTeno";
import { Spin } from "../../../components/organism/spin";
import { API_URL } from "../../../constants/env";
import { getToken } from "../../../helpers/auth";
import evtFile from '../../../hooks/uploadFile';
import FormControl from '../../../components/molecule/formControl';
import Success from "../../../helpers/messageSuccess";
import ErrorMessage from "../../../helpers/messageError";
import infoMessage from "../../../helpers/messageInfo";

export const Form = () => {
    const ref = useRef(null);
    const [selectedFile, setSelectedFile] = useState([]);
    const [typeProduct, setTypeProduct] = useState();
    const [loading, setLoading] = useState(false);

    const [talla, setTalla] = useState([]);

    const [tecno, setTecno] = useState([]);
    const [Ram, setRam] = useState([]);
    const [Marca, setMarca] = useState([]);
    const [Almacenamiento, setAlmacenamiento] = useState([]);
    const [procesador, setProcesador] = useState([]);

    useEffect(() => {
        const currentRef = ref.current;
        if (selectedFile.length > 0) {
            currentRef.setAttribute("src", URL.createObjectURL(selectedFile[0]));
        }
    }, [selectedFile]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (typeProduct !== undefined) {
            let metadata = {};

            if (typeProduct === 'moda') metadata = {
                rating: 'moda',
                color: e.target.color.value,
                talla: talla.toString()
            }

            if (typeProduct === 'juegos') metadata = {
                rating: 'juegos'
            }

            if (typeProduct === 'tecnologia') {
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

            try {
                if (selectedFile.length > 0) {
                    setLoading(true);
                    const arrayResponseImages = await evtFile(selectedFile);
                    const arrayUrlImages = arrayResponseImages?.map((dataImage) => dataImage.url);

                    const data = {
                        product_name: e.target.productName.value,
                        price: Number(e.target.price.value),
                        images: arrayUrlImages,
                        description: e.target.description.value,
                        metadata
                    }

                    const query = await fetch(`${API_URL}v1/admin/create/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${getToken()}`,
                        },
                        body: JSON.stringify(data)
                    });
                    const res = await query.json();
                    if (res.status === "success") {
                        setLoading(false);
                        Success('Producto creado exitosamente', '/admin/');
                    }
                    else {
                        setLoading(false);
                        ErrorMessage('Error al Crear Producto', res.error.raw.message);
                    }
                } else infoMessage('Selecciona una imagen del producto');

            } catch (error) {
                console.log(error);
            }
        } else infoMessage('Selcciona el tipo de producto y sus caracteristicas');

    }

    if (loading) return <Spin />;

    return (
        <div className="w-4/5 m-auto flex justify-center py-6 px-6">
            <form onSubmit={handleSubmit} className="w-full p-6">
                <h2 className="text-center mb-3">Crear producto</h2>
                <select name="select" value={typeProduct} onChange={(e) => setTypeProduct(e.target.value)} className="select">
                    <option>Tipo de producto</option>
                    <option value="moda">Moda</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="juegos">Juegos y juguetes</option>
                </select>

                <div className="flex">
                    <FormControl label="Nombre del producto:" typeInput="text" nameInput="productName" placeholder="Nombre del Producto" />
                    <FormControl label="Precio:" typeInput="number" nameInput="price" placeholder="0.00" />
                </div>

                {typeProduct === "moda" ? <BodyCreateModa talla={talla} setTalla={setTalla} /> : null}
                {typeProduct === "tecnologia" ? <BodyCreateTeno Ram={Ram} setRam={setRam} Marca={Marca} setMarca={setMarca} Almacenamiento={Almacenamiento} setAlmacenamiento={setAlmacenamiento} procesador={procesador} setProcesador={setProcesador} tecno={tecno} setTecno={setTecno} /> : null}

                <div className="my-2 mr-1 w-full">
                    <label htmlFor="">Descripcion: </label>
                    <textarea name="description" className="form-input" rows={10}></textarea>
                </div>
                <input type="file" onChange={(e) => setSelectedFile(e.target.files)} multiple className="inputFile" />
                <Submit title="Crear Producto" />
            </form>
            <div className="w-4/5 px-3 flex flex-col items-center border-l-4 border-indigo-500">
                <h1 className="py-4 text-center">Imagenes seleccionadas</h1>
                <div className="min-w-md max-w-md">
                    <img ref={ref} className="img-selected rounded-lg my-3" />
                </div>
            </div>
        </div>
    );
}