import { useNavigate } from "react-router-dom";

export function Login()
{
    const navigate = useNavigate();
    return(
        <div className="min-h-screen flex flex-col p-6 max-w-md mx-auto">
            <button onClick={() => navigate(-1)} className="mb-8 text-2xl self-start">←</button>
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-8"> Login </h1>
                <div className="w-full max-w-sm space-y-4">
                </div>
            </div>
        </div>
    );
}