import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export function Home()
{
    const navigate = useNavigate();
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#EBB3B8]/40 space-y-8 p-6">
            <div className="text-center space-y-2 mt-16">
                <h1 className="text-5xl font-bodoni font-bold text-black mb-8"> Roocool </h1>
            </div>
            <div className="mb-8 animate-bounce" >
                <Heart className="w-48 h-48 text-accent/50  fill-current"/>
            </div>         
            <div className="w-full max-w-sm space-y-4 mt-12 ">
                <Button label="Login" onClick={()=> navigate("auth/login")}/>
                <Button label = "Sign up" onClick={()=> navigate("auth/register")}/>
            </div>
        </div>
    );
}
