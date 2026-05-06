    import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { loginSchema } from "../../utils/validation";

export function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // État pour les erreurs globales
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setErrors({});

        // Validation spécifique Login
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                newErrors[field] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        // TODO: Appel API /api/auth/login + gestion token
        console.log("Login avec :", formData);
    };
    return(
        <div className="flex flex-col md:flex-row md:gap-8 bg-linear-to-br  rounded-2xl p-6 from-pink-50 to-rose-50">
            {/* Element Gauche */}
            <div className="hidden md:flex md:flex-col md:flex-1 md:min-h-screen md:items-center md:justify-center md:bg-[#EBB3B8]/40 md:p-16 md:space-y-16">
                {/* Titre Roocol */}
                <div className="text-center">
                    <h1 className="text-5xl font-bodoni font-bold text-black mb-8"> Roocool </h1>
                    <h2 className="text-2xl font-bodoni text-mist-700">Inscris toi et ... </h2>
                    <h2 className="text-2xl font-bodoni text-mist-700">Viens roocooler à deux! </h2>
                </div>
                {/*  Ceur sautant */}
                <div className="mb-8 animate-bounce" >
                    <Heart className="w-48 h-48 text-accent/50  fill-current"/>      
                </div>
            </div>
            {/* Element Droite */}
            <div className="w-full flex flex-col md:flex-1 md:min-h-screen min-h-screen items-center justify-center md:p-16 p-2 bg-[#EBB3B8]/40 rounded-2xl">
                <h1 className="text-4xl font-bodoni font-bold mb-8"> Welcome back </h1>
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {/* Username & Email */}
                    <Input label="Username" name="username" value={formData.username} onChange={handleChange} error={errors.username} placeholder="johndoe123" type="text"/>
                {/* Mots de passe */}
                    <Input label="Password" name="password" value={formData.password} onChange={handleChange} error={errors.password} placeholder="••••••••" type="password"/>
                {/* Bouton Submit */}
                <div className="pt-6">
                    <Button label="Login" type="submit" />
                </div>
                <div className="underline decoration-solid text-center">
                    <a href="./register">I want to create an account</a>
                </div>
                </form>
            </div>
        </div>
    );
}