import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import React, { useState } from "react";
import { ArrowLeft } from 'lucide-react'

import { registerSchema } from "../../utils/validation"


export function Register() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
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
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setErrors({})
        const result = registerSchema.safeParse(formData);
        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                newErrors[field] = issue.message;
            });

            setErrors(newErrors);
            return;
        }
        const url = "/api/auth/register";
        try {
            const reponse = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!reponse.ok) {
                throw new Error("Registration failed");
            }

            const data = await reponse.json();
            console.log("Success:", data);
            navigate("/login"); // ou là où tu veux rediriger

        } catch (error) {
            console.error("Registration failed:", error);
        }
        // //[ ]TODO: call API endpoint
    }

    return (
        <div className="min-h-screen flex flex-col p-6 max-w-md mx-auto bg-[#EBB3B8]/40">
            <button onClick={() => navigate(-1)} className="mb-8 p-2 hover:bg-gray-100 rounded-full transition-colors self-start" aria-label="Go back"> <ArrowLeft className="w-6 h-6 text-gray-700" /></button>
            <h1 className="text-3xl font-bodoni font-bold mb-8"> Create your account </h1>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {/* Identité */}
                <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} error={errors.first_name} placeholder="John" type="text" />
                    <Input label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} error={errors.last_name} placeholder="Doe" type="text" />
                </div>
                {/* Username & Email */}
                <Input label="Username" name="username" value={formData.username} onChange={handleChange} error={errors.username} placeholder="johndoe123" type="text" />
                <Input label="Email Address" name="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="john@example.com" type="email" />
                {/* Mots de passe */}
                <Input label="Password" name="password" value={formData.password} onChange={handleChange} error={errors.password} placeholder="••••••••" type="password" />
                <Input label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="••••••••" type="password" />
                {/* Bouton Submit */}
                <div className="pt-6">
                    <Button label="Create Account" type="submit" />
                </div>
            </form>
        </div>
    );
}
