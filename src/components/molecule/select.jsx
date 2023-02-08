export const Select = ({ value, setValue, select}) => {

    const templateSelect = (label, options, i) => {
        return (
            <div className="flex flex-col items-center my-2 mx-1" key={i}>
                <label>{label}</label>
                <select name="select" value={value} onChange={(e) => setValue(e.target.value)} className="selectBody">
                    {options.map((opt, i) => <option key={i} value={opt.value}>{opt.leyenda}</option>)}
                </select>
            </div>
        )
    }

    return (
        <div>
            {select.map((element, i) => templateSelect(element.label, element.options, i))}
        </div>
    )
}
