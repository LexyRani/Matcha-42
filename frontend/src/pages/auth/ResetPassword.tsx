import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import React, { useState } from "react";
import { resetPasswordSchema } from "../../utils/validation";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { useSearchParams, useNavigate } from "react-router-dom";

export function Reset() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    if (!token) {
    return (
        <AuthLayout>
            <h1 className="text-3xl text-center font-bodoni font-bold mb-8"> Invalid link </h1>
            <p className="text-center text-gray-500 mb-6"> This password reset link is invalid or has expired.</p>
            <Button label="Request a new link" onClick={() => navigate("/auth/forgotpassword")}/>
        </AuthLayout>
    );
}
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

    const result = resetPasswordSchema.safeParse(formData);
    if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
            const field = issue.path[0] as string;
            newErrors[field] = issue.message;
        });
        setErrors(newErrors);
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token,
                password: formData.password,
            }),
        });

        if (!res.ok) throw new Error("Request failed");

        navigate("/auth/login");  // redirection après succès
    } catch {
        setErrors({ global: "Something went wrong. Please try again." });
    }
};
    return(
            <AuthLayout>
                <h1 className="text-3xl text-center font-bodoni font-bold mb-8"> Choose your new password </h1>
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {/* Mots de passe */}
                    <Input label="NewPassword" name="password" value={formData.password} onChange={handleChange} error={errors.password} placeholder="••••••••" type="password"/>
                {/* Confirmation Mots de passe */}
                    <Input label="Confirm Password " name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="••••••••" type="password"/>
                {/* Bouton Submit */}
                <div className="pt-6">
                    <Button label="Submit" type="submit" />
                </div>
                </form>
            </AuthLayout>
    );
}
