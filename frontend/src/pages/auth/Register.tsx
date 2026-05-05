import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import React,{ useState } from "react";
import {ArrowLeft} from 'lucide-react'
import { Heart } from "lucide-react";
import { registerSchema } from "../../utils/validation"


export function Register()
{

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
    };
    // etat pour les erreurs
    const [errors, setErrors] = useState<Record<string, string>>({});
    // Fonction de soummission
    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        setErrors({})
        const result = registerSchema.safeParse(formData);
        if (!result.success)
        {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
            const field = issue.path[0] as string;
            newErrors[field] = issue.message;
            });

            setErrors(newErrors);
            return;
        } 
        // const url = "http://localhost:3000/backend/server.ts/";
        // try{
        //     const reponse = await fetch(url);
        //     if(!reponse.ok)
        //     {
        //         throw 
        //     }
        // }
        // //[ ]TODO: call API endpoint
    }

    return(
        <div className="flex flex-col md:flex-row md:gap-8 bg-linear-to-br  rounded-2xl p-6 from-pink-50 to-rose-50">
            {/* Element Gauche */}
            <div className="hidden md:flex md:flex-col md:flex-1 md:min-h-screen md:items-center md:justify-center md:bg-[#EBB3B8]/40 md:p-16 md:space-y-16 rounded-2xl">
                {/* Titre Roocol */}
                <div className="text-center">
                    <h1 className="text-5xl font-bodoni font-bold text-black mb-8"> Roocool </h1>
                    <h2 className="text-2xl font-bodoni text-mist-700 mb-2">Inscrit toi et ... </h2>
                    <h2 className="text-2xl font-bodoni text-mist-700">Viens roocooler à deux! </h2>
                </div>
                {/*  Ceur sautant */}
                <div className="mb-8 animate-bounce" >
                    <Heart className="w-48 h-48 text-accent/50  fill-current"/>      
                </div>
            </div>
            {/* Element Droite */}
             {/* <div className="min-h-screen flex-1 flex-col p-6 w-full bg-[#EBB3B8]/30"></div> */}
            <div className="w-full flex flex-col md:flex-1 md:min-h-screen min-h-screen items-center justify-center md:p-6 p-2 bg-[#EBB3B8]/40 rounded-2xl">
                <button onClick={() => navigate(-1)} className="mb-8 p-2 hover:bg-gray-100 rounded-full transition-colors self-start" aria-label="Go back"> <ArrowLeft className="w-6 h-6 text-gray-700" /></button>
                <h1 className="text-3xl font-bodoni font-bold mb-8"> Create your account </h1>
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {/* Identité */}
                <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} placeholder="John" type="text"/>
                    <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} placeholder="Doe" type="text" />
                </div>
                {/* Username & Email */}
                    <Input label="Username" name="username" value={formData.username} onChange={handleChange} error={errors.username} placeholder="johndoe123" type="text"/>
                    <Input label="Email Address" name="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="john@example.com" type="email" />
                {/* Mots de passe */}
                    <Input label="Password" name="password" value={formData.password} onChange={handleChange} error={errors.password} placeholder="••••••••" type="password"/>
                    <Input label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="••••••••" type="password" />
                {/* Bouton Submit */}
                <div className="pt-6">
                    <Button label="Create Account" type="submit" />
                </div>
                </form>
            </div>
        </div>
    );
}