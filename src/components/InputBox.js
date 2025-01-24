
export const InputBox = (props) => {
    const { texts, onChange, value, errors } = props
    const { text, placeholder, type,name } = texts

    return (
        <div className="flex flex-col ">
            <label className="font-semibold">{text} <b className="text-red-500" >*</b></label>
            <input name={name} className={!errors ? ("p-3 outline-blue-600 border rounded-md") : ("p-3 border-red-500 border rounded-md")} placeholder={placeholder} onChange={onChange} type={type} value={value} />
            <p className="text-red-500">{errors}</p>
        </div>
    )
}