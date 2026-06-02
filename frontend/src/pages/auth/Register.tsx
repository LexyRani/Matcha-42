import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import React,{ useState } from "react";
import { registerSchema } from "../../utils/validation"
import { Link } from 'react-router-dom';
import { AuthLayout } from "../../components/layout/AuthLayout";

export function Register()
{
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword:"",
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
    }

    return(
            <AuthLayout>
                    <h1 className="text-4xl font-bodoni font-bold mb-8"> Create your account </h1>
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
                    <div className="underline decoration-solid text-center">
                        <Link to="/auth/login" className="hover:text-black transition-colors">I already have a account</Link>
                    </div>
                    </form>
            </AuthLayout>    
    );
}