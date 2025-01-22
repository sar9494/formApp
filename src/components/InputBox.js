
export const InputBox = (props) => {
    const { text, placeholder, onChange ,type} = props

    return (
        <div className="flex flex-col ">
            <label className="font-semibold">{text} <b className="text-red-500">*</b></label>
            <input className="p-2 border-gray-400 border-solid rounded-md outline-blue-600 border rouded-md w-[416px]" placeholder={placeholder} onChange={onChange} type={type}/>
        </div>
    )
}