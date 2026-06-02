import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";

export function Password() {
    const [formData, setFormData] = useState({
        identifier: "",
    });

    const [message, setMessage] = useState("");
    const [errors, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({...formData, [e.target.name]: e.target.value,});
        };

    const handleSubmit = async (e: React.SyntheticEvent) => {e.preventDefault();
        setMessage("");
        setError("");

        if (!formData.identifier.trim()) {
            setError("Please enter your email or username");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/auth/forgot-password",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json",},
                    body: JSON.stringify({identifier: formData.identifier,}),
                }
            );
            if (!res.ok) {
                throw new Error("Request failed");  }
            setMessage("If an account exists, an email has been sent.");} 
            catch {
            setError("Something went wrong. Please try again.")
            } 
            finally {
            setLoading(false);
            }
    };

    return (
        <AuthLayout>
            <h1 className="text-3xl font-bodoni font-bold mb-8 text-center">
                Send a recovery email
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <Input
                    label="Email/Username" name="identifier" value={formData.identifier} onChange={handleChange} error={errors}/>
                <div className="pt-6" >
                    <Button label={loading ? "Loading..." : "Submit"} type="submit" disabled={!!message} />
                </div>
                    {message && <p className="text-green-600 text-sm text-center">{message}</p>}
                <div className="underline decoration-solid text-center">
                    <Link to="/auth/register" className="hover:text-black transition-colors">
                        I want to create an account
                    </Link>
                </div>

            </form>
        </AuthLayout>
    );
}