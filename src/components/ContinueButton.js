export const ContinueButton = (props) => {
    const { onClick, text } = props

    return (
        <button className="bg-black text-white w-[280px] mx-auto rounded-lg p-3 font-bold cursor-pointer hover:opacity-85" onClick={onClick}>{text}</button>
    )
}