// Definition de ce que le bouton accepte comme parametre
interface ButtonProps{
    label: string;
    onClick?:() => void;
    type?: "button" | "submit"
}

// Creation du composant

export function Button({label, onClick, type = "button"}: ButtonProps)
{
    return(
        <button className="w-full bg-[#A69292]/86 text-black text-2xl font-bodini font-bold py-3 rounded-xl hover:opacity-90" onClick={onClick} type={type}>
            {label} 
            
        </button>
    )
}