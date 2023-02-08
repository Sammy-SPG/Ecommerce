import FormControl from "../molecule/formControl";

export const BodyCreateModa = ({talla, setTalla}) => {
    return (
        <div>
            <FormControl label="Color:" typeInput="text" nameInput="color" placeholder="Color" />
            <div>
                <label htmlFor="">Talla: </label>
                <div className="flex items-center justify-around my-2">
                    <label><input onClick={(e)=> e.target.checked ? setTalla([...talla, e.target.value]) : setTalla(talla.filter(t => t!= e.target.value))} type="checkbox" id="cbox1" value="XCH" className="mx-2" />XCH</label>
                    <label><input onClick={(e)=> e.target.checked ? setTalla([...talla, e.target.value]) : setTalla(talla.filter(t => t!= e.target.value))} type="checkbox" id="cbox1" value="CH" className="mx-2" />CH</label>
                    <label><input onClick={(e)=> e.target.checked ? setTalla([...talla, e.target.value]) : setTalla(talla.filter(t => t!= e.target.value))} type="checkbox" id="cbox1" value="M" className="mx-2" />M</label>
                    <label><input onClick={(e)=> e.target.checked ? setTalla([...talla, e.target.value]) : setTalla(talla.filter(t => t!= e.target.value))} type="checkbox" id="cbox1" value="G" className="mx-2" />G</label>
                    <label><input onClick={(e)=> e.target.checked ? setTalla([...talla, e.target.value]) : setTalla(talla.filter(t => t!= e.target.value))} type="checkbox" id="cbox1" value="XG" className="mx-2" />XG</label>
                    <label><input onClick={(e)=> e.target.checked ? setTalla([...talla, e.target.value]) : setTalla(talla.filter(t => t!= e.target.value))} type="checkbox" id="cbox1" value="XL" className="mx-2" />XL</label>
                </div>
            </div>
        </div>
    )
}
