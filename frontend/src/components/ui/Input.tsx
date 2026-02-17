interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label: string;
    error?: string;
    icon?: React.ReactNode;
}

export function Input({label, error, icon, className, ...props }: InputProps)
{
    const inputId = props.id || props.name; 
    return(
        <div className={`w-full ${className}`}>
            {label && <label htmlFor={inputId} className="block text-sm font-sans font-medium text-gray-700 mb-1">{label}</label>}
            <div className="relative">
                <input id={inputId} className={`w-full bg-white border ${error ? 'border-accent' : 'border-gray-200'} rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-400`}
            {...props}
                />
            {/* ajouter l'icône si besoin */}
            </div>
            {error && <p className="text-accent font-sans text-xs mt-1 pl-1">{error}</p>}
        </div>
  );
}