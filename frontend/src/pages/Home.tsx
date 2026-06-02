import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import love from "../assets/love.jpg"

// import LogoRoocool from "../assets/LogoRoocool.svg"

export function Home()
{
    const navigate = useNavigate();
    return(
        // <div className="flex flex-col md:flex-row md:gap-8 bg-linear-to-br  rounded-2xl p-6 from-pink-50 to-rose-50 " style={{ backgroundImage: `url(${love})` }}>
        <div className="flex flex-col md:flex-row md:gap-8 min-h-screen bg-cover bg-center bg-no-repeat rounded-2xl p-6 from-pink-50 to-rose-50 " style={{ backgroundImage: `url(${love})` }}>

            {/* Element de gauche */}
            <div className="min-h-screen flex flex-col flex-1 items-center justify-center bg-[#EBB3B8]/40 space-y-8 p-6 rounded-2xl">
                <div className="text-center space-y-2 mt-16">
                    <h1 className="text-5xl font-bodoni font-bold text-black mb-8"> Bienvenue sur Roocool </h1>
                    {/* <h1 className="text-5xl font-bodoni font-bold text-black mb-8"> Roocool </h1> */}
                </div>
                <div className="mb-8 animate-bounce" >
                    <Heart className="w-48 h-48 text-accent/50  fill-current"/>
                   {/* <img src={LogoRoocool} alt="Mon logo" /> */}
                </div>         
            </div>
            {/* Element de droite */}
            <div className="flex flex-col flex-1 w-full min-h-screen items-center justify-center  bg-[#EBB3B8]/40 p-6">
                <div className="space-y-8">
                    <Button label="Login" onClick={()=> navigate("auth/login")}/>
                    <Button label = "Sign up" onClick={()=> navigate("auth/register")}/>
                </div>
            </div>
        </div>
    );
}
