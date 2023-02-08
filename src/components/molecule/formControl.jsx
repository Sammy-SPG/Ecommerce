const FormControl = ({ label, typeInput, nameInput, placeholder, diseable }) => {
    return (
        <div className="my-2 mr-1 w-full">
            <label htmlFor="" className="block">{label}</label>
            {diseable ? <input type={typeInput} name={nameInput} placeholder={placeholder} required className="form-input disabled:bg-slate-50" disabled /> : <input type={typeInput} name={nameInput} placeholder={placeholder} required className="form-input" />}
        </div>
    )
}

export default FormControl