import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export function Home()
{
    const navigate = useNavigate();
    return(
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-8"> Roocool </h1>
            <div className="w-full max-w-sm space-y-4">
            <Button label="Login" onClick={()=> navigate("auth/login")}/>
            <Button label = "Sign up" onClick={()=> navigate("auth/register")}/>
            </div>
        </div>
    );
}