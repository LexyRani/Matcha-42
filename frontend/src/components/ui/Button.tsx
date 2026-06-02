interface ButtonProps{
    label: string;
    onClick?:() => void;
    type?: "button" | "submit"
    disabled?: boolean;
}

export function Button({label, onClick, type = "button",disabled}: ButtonProps)
{
    return(
        <button className={`w-full bg-[#A69292]/86 hover:bg-[#A69292]/50 text-black text-2xl font-bodoni font-bold py-3 rounded-xl ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={onClick} 
            disabled={disabled} 
            type={type}>
            {label}     
        </button>
    )
}