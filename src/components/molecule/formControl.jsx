const FormControl = ({label, typeInput, nameInput, placeholder}) => {
    return (
        <div className="my-3 w-4/5">
            <label htmlFor="" className="block">{label}</label>
            <input type={typeInput} name={nameInput} placeholder={placeholder} required className="form-input" />
        </div>
    )
}

export default FormControl