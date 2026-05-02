interface ButtonProps{
    label: string;
    onClick?:() => void;
    type?: "button" | "submit"
}

export function Button({label, onClick, type = "button"}: ButtonProps)
{
    return(
        <button className="w-full bg-[#A69292]/86 hover:bg-[#A69292]/50 text-black text-2xl font-bodoni font-bold py-3 rounded-xl " onClick={onClick} type={type}>
            {label}     
        </button>
    )
}