export const ContinueButton = (props) => {
    const {onClick}=props

    return (
        <button className="bg-black text-white w-[410px] mx-auto rounded-lg p-3 font-bold" onClick={onClick}>Continue</button>
    )
}