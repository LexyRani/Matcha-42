import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import React, { useState } from "react";
// import { Heart } from "lucide-react";
import { registerSchema } from "../../utils/validation"
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from "../../components/layout/AuthLayout";

export function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

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
            
            const data = await reponse.json();

            if (!reponse.ok) {
                setErrors({ form: data.error || "Registration failed" });
                return;
            }

            console.log("Success:", data);
            navigate("/auth/login"); // ou là où tu veux rediriger

        } catch (error) {
            console.error("Registration failed:", error);
        }
        // //[ ]TODO: call API endpoint
    }

    return (
        <AuthLayout>
            {/* <div className="w-full flex flex-col md:flex-1 md:min-h-screen min-h-screen items-center justify-center md:p-16 p-2 bg-[#EBB3B8]/40 rounded-2xl"> */}
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
                <div className="underline decoration-solid text-center">
                    <Link to="/auth/login" className="hover:text-black transition-colors">I already have a account</Link>
                </div>
            </form>
            {/* </div> */}
        </AuthLayout>
    );
}
