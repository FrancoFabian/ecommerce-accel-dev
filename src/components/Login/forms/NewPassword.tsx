'use client';
import { InputNormal } from "../inputs/InputNormal"


export const NewPassword = () => {
    return (
        <div className="w-full flex flex-col"
        >
            <div className="w-full flex flex-col p-6 space-y-1">

                <h3 className="tracking-tight text-2xl font-bold text-center">Restablecer contraseña</h3>
                <p className="text-sm text-gray-500 text-center">Ingresa tu correo electrónico para recibir instrucciones</p>
            </div>
            <form className="w-full">
                <div className="p-6 pt-0 space-y-4">
                    <div className="space-y-2">
                      <InputNormal 
                      nameInput="Nueva contraseña"
                      name="newPassword"
                       type="password"
                       placeholder="Ingresa tu nueva contraseña"    
                       isPassword={true} value="" 
                       onChange={() => {}}
                       />  
                        <InputNormal 
                        nameInput="Confirmar contraseña"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirmar contraseña" 
                        isPassword={true} value="" 
                        onChange={() => {}}
                        />
                    </div>
                </div>
                <div className="flex items-center p-6 pt-0">
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                    text-sm font-medium transition-colors 
                    disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-white hover:bg-slate-800 h-10 px-4 py-2 w-full"
                        type="submit">
                        Cambiar contraseña
                    </button>
                </div>
            </form>
        </div>
    )
}
