import { LeftArrowIcon } from "@/icons/LeftArrowIcon"
import { FormForgotpassword } from "./FormForgotpassword"
interface ForgotPasswordProps {
    setForgotForm: (newSatet: boolean) => void;
}


export const ForgotPassword = ({setForgotForm }: ForgotPasswordProps) => {

    return (

        <div className="w-full flex flex-col pt-20 rounded-lg 
        border text-card-foreground shadow-sm"
        >
            <div className="w-full flex flex-col p-6 space-y-1">
                <button className="w-[150px] flex bg-gray-200 justify-center items-center
                 text-primary rounded-md h-10 px-4 py-2 mt-4 mb-10"
                 onClick={() => { setForgotForm(false) }}
                 >
                    <LeftArrowIcon className="w-8 h-8 mr-2 text-gray-400" />
                    Regresar

                </button>
                <h3 className="tracking-tight text-2xl font-bold text-center">Restablecer contraseña</h3>
                <p className="text-sm text-gray-500 text-center">Ingresa tu correo electrónico para recibir instrucciones</p>
            </div>
            <FormForgotpassword />
        </div>
    )
}



