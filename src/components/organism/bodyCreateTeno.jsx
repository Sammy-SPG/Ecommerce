import { Select } from "../molecule/select";

export const BodyCreateTeno = ({tecno, setTecno, Ram, setRam, Marca, setMarca, Almacenamiento, setAlmacenamiento, procesador, setProcesador }) => {

    const Telefonia = () => {
        return (
            <div className="w-full flex flex-wrap items-center justify-around">
                <Select value={Marca} setValue={setMarca} select={[{ label: "Marca", options: [{ value: "Xiaomi", leyenda: "Xiaom" }, { value: "Motorola", leyenda: "Motorola" }, { value: "Samsung", leyenda: "Samsung" }, {value: "OPPO", leyenda: "OPPO"}, {value: "Huawei", leyenda: "Huawei"}, {value: "Honor", leyenda: "Honor"}] }]} />
                <Select value={Ram} setValue={setRam} select={[{ label: "Ram", options: [{ value: "2GB", leyenda: "2GB de RAM" }, { value: "4GB", leyenda: "4GB de RAM" }, { value: "6GB", leyenda: "6GB de RAM" }] }]} />
                <Select value={Almacenamiento} setValue={setAlmacenamiento} select={[{ label: "Alamacenamiento", options: [{ value: "32GB", leyenda: "32GB de Almacenamiento" }, { value: "64GB", leyenda: "64GB de Almacenamiento" }, { value: "128GB", leyenda: "128GB de Almacenamiento" }] }]} />
            </div>
        );
    }

    const Computacion = () => {
        return (
            <div className="w-full flex flex-wrap items-center justify-around">
                <Select value={Marca} setValue={setMarca} select={[{ label: "Marca", options: [{ value: "Lenovo", leyenda: "Lenovo" }, { value: "huawei", leyenda: "Huawei" }, { value: "Acer", leyenda: "Acer" }, {value: "HP", leyenda: "HP"}] }]} />
                <Select value={Ram} setValue={setRam} select={[{ label: "Ram", options: [{ value: "4GB", leyenda: "4GB de RAM" }, { value: "8GB", leyenda: "8GB de RAM" }, { value: "16GB", leyenda: "16GB de RAM" }, {value: "32GB", leyenda: "32GB de Ram"}] }]} />
                <Select value={Almacenamiento} setValue={setAlmacenamiento} select={[{ label: "Alamacenamiento", options: [{ value: "64GB", leyenda: "64GB de Almacenamiento" }, { value: "128GB", leyenda: "128GB de Almacenamiento" }, { value: "256GB", leyenda: "256GB de Almacenamiento" }, {value: "500GB", leyenda: "500GB de Almacenamiento"}] }]} />
                <Select value={procesador} setValue={setProcesador} select={[{ label: "Procesador", options: [{ value: "AMD", leyenda: "Procesador AMD" }, { value: "Intel", leyenda: "Procesador Intel" }] }]} />
            </div>
        );
    }

    return (
        <div>
            <select name="select" onChange={(e) => setTecno(e.target.value)} value={tecno} className="selectBody">
                <option value="default">Tipo de Tecnologia</option>
                <option value="telefonia">Telefonia</option>
                <option value="computacion">Computacion</option>
                <option value="Juegos">Hogar</option>
            </select>
            {tecno === "telefonia" ? Telefonia() : null}
            {tecno === "computacion" ? Computacion() : null}
        </div>
    )
}
