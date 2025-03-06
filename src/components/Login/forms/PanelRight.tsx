'use client';
import { Astronauta } from "../imageLogin/Astronauta"
import { BtnSubmit } from "../submit/BtnSubmit"
import { useFormTransition } from "@/hooks/login/useFormTransition";
interface PanelRightProps {
  isLogin: boolean;
  setIsLogin: (newSatet: boolean) => void;
}

export const PanelRight = ({ isLogin, setIsLogin }: PanelRightProps) => {
  const panelRightRef = useFormTransition<HTMLDivElement>(isLogin, {
    fromDirection: "right", // Panel aparece desde la derecha
    duration: 0.3, // Opcional: duración personalizada
  });

  
  return (
    <div 
    ref={panelRightRef}
    className="sm:flex flex-col w-1/2 hidden h-screen 
    overflow-hidden text-white font-bold">
      <div className="w-full h-[120px] flex flex-col mt-20">
        <div className="w-full h-[50%]">
          <h1 className="text-2xl text-pretty text-center">
            
            {isLogin?'¿Necesitas crear una cuenta?':'¿Ya tienes una cuenta?'}
            
            </h1>
        </div>
        <div className="w-full flex justify-center items-center">
        
          <BtnSubmit name={isLogin ? "Inscríbirse" : "Iniciar sesión"}
            type={undefined}
            onClicked={()=>{setIsLogin(!isLogin)}}
            className="border border-solid
         border-white w-[120px] py-4 lg:mt-0 sm:mt-10 rounded-lg"/> 



          
        </div>

      </div>
      <Astronauta className={`lg:w-[400px] lg:h-[400px] 2xl:w-[1200px]
    lg:translate-x-[2%] lg:translate-y-[2] 2xl:translate-x-[-20%] 2xl:translate-y-[20%]
    ${isLogin ? 'sm:translate-x-[-30%] sm:translate-y-[20%]' : 'sm:translate-x-[-30%] sm:translate-y-[20%]'}
    `} />
    </div>

  )
}

export default PanelRight