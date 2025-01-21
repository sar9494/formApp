import { Logo } from "./"
export const Header = () => {
    return (
        <div className="w-[400px] h-fit bg-gray-400 rounded-xl bg-white flex flex-col gap-2.5">
            <Logo />
            <p className="text-3xl font-bold">Join Us 😎</p>
            <p className="text-[#8E8E8E] font-normal text-[18px]">Please provide all current information accurately.</p>
        </div>
    )
}