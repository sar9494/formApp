
export const InputBox = (props) => {
    const { texts,  onChange ,value,errors} = props
    const {text, placeholder ,type}=texts

    return (
        <div className="flex flex-col ">
            <label className="font-semibold">{text} <b className="text-red-500">*</b></label>
            <input className={!errors?("p-3 outline-blue-600 border rounded-md") :("p-3 border-red-500 border rounded-md")} placeholder={placeholder} onChange={onChange} type={type} value={value}/>
        </div>
    )
}