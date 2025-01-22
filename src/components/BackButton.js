export const BackButton = (props) =>{
    const {setStep,step} =props

    const onClick = () => {
        setStep(step-1)
    }

    return (
        <button className="border border-[#CBD5E1] w-[128px] h=[44px] rounded-md" onClick={onClick}>{`< Back`}</button>
    )
}