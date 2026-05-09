import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import React, { useState } from "react";
// import { Heart } from "lucide-react";
import { loginSchema } from "../../utils/validation";
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from "../../components/layout/AuthLayout";

export function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

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

        const url = "/api/auth/login";
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

        // TODO: Appel API /api/auth/login + gestion token
        console.log("Login avec :", formData);
    };
    return(
            <AuthLayout>
                <h1 className="text-4xl font-bodoni font-bold mb-8"> Welcome back </h1>
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {/* Username & Email */}
                    <Input label="Username" name="username" value={formData.username} onChange={handleChange} error={errors.username} placeholder="johndoe123" type="text"/>
                {/* Mots de passe */}
                    <Input label="Password" name="password" value={formData.password} onChange={handleChange} error={errors.password} placeholder="••••••••" type="password"/>
                {/* Bouton Submit */}
                <div className="underline decoration-solid text center">
                    <Link to="/auth/password" className="hover:text-black transition-colors">I forgot my password</Link>
                </div>
                <div className="pt-6">
                    <Button label="Login" type="submit" />
                </div>
                <div className="underline decoration-solid text-center">
                    <Link to="/auth/register" className="hover:text-black transition-colors">I want to create an account</Link>
                </div>
                </form>
            </AuthLayout>
    );
}
