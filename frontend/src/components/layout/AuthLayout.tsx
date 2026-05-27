import {Heart} from "lucide-react"


interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
          <div className="flex flex-col md:flex-row md:gap-8 bg-linear-to-br  rounded-2xl p-6 from-pink-50 to-rose-50">
            <div className="hidden md:flex md:flex-col md:flex-1 md:min-h-screen md:items-center md:justify-center md:bg-[#EBB3B8]/40 md:p-16 md:space-y-16 rounded-2xl">
                {/* Titre Roocol */}
                <div className="text-center">
                    <h1 className="text-5xl font-bodoni font-bold text-black mb-8"> Roocool </h1>
                    <h2 className="text-2xl font-bodoni text-mist-700">Inscris toi et ...  <br/>
                        Viens roocooler à deux! </h2>
                </div>
                {/*  Ceur sautant */}
                <div className="mb-8 animate-bounce" >
                    <Heart className="w-48 h-48 text-accent/50  fill-current"/>      
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-1 md:min-h-screen min-h-screen items-center justify-center md:p-16 p-2 bg-[#EBB3B8]/40 rounded-2xl">
                {children}
            </div>
          </div>
  );
}