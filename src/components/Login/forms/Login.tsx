'use client';

import { useFormTransition } from "../../../hooks/login/useFormTransition";
import { InputNormal } from "../inputs/InputNormal"
import { BtnSubmit } from "../submit/BtnSubmit"
import { SvgIconBtnGoogle } from "../submit/SvgIconBtnGoogle"
import { ForgotPassword } from "../check/ForgotPassword"
import { LeftArrowIcon } from "@/icons/LeftArrowIcon"
import { useState } from "react";


interface LoginProps {
    isLogin: boolean;
    setIsLogin: (newSatet: boolean) => void;
    forgotForm: boolean;
    setForgotForm: (newSatet: boolean) => void;
}

export const Login = ({ isLogin, setIsLogin, forgotForm, setForgotForm }: LoginProps) => {
    const loginRef = useFormTransition<HTMLFormElement>(isLogin, { fromDirection: "left" });
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    const handleInputChange = (name: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        
    };

    return (
        <form
            ref={loginRef}
            className="flex w-full lg:w-[50%] lg:h-[100%] sm:w-full sm:h-screen h-[85vh]
        flex-col 
        gap-2 lg:gap-4 md:gap-4 sm:gap-4 2xl:gap-2 bg-white
         lg:px-5 2xl:px-16 md:px-14 pt-2 sm:pt-10 md:pt-10 lg:pt-10 2xl:p-10 pb-20 lg:pb-0 px-5 overflow-y-auto">
            <div className="w-full h-[50px] flex flex-col">

                <div className="w-full h-[50%] flex-col flex mt-3">
                    <div className="w-full h-[30%] flex justify-center text-slate-900 font-bold text-2xl"><h1>Inicie sesión</h1></div>
                </div>

            </div>
            {/* <div className="width-full py-2 h-fit 
            flex justify-center items-center bg-[#f81d1d8a]
            border border-solid border-[#f81d1d] rounded-md">
                <p className="lg:text-[0.8rem] 2xl:text-[1rem]">Nombre de usuario/contraseña incorrectos.</p>

            </div> */}
 
            <InputNormal
                nameInput="Nombre de usuario"
                type="text"
                placeholder="Nombre de usuario"
                isPassword={false}
                value={formValues["Nombre de usuario"] || ""}
                onChange={(value) => handleInputChange("Nombre de usuario", value)}
            />
            <InputNormal
                nameInput="Contraseña"
                type="password"
                placeholder="Contraseña"
                isPassword={true}
                value={formValues["Contraseña"] || ""}
                onChange={(value) => handleInputChange("Contraseña", value)}
            />
            <ForgotPassword forgotForm={forgotForm} setForgotForm={setForgotForm} />
            <BtnSubmit
                name="Acceso"
                type="submit"
                onClicked={undefined}
                className="elative z-0 inline-flex items-center justify-center box-border appearance-none select-none 
               whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none 
               focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 
               px-4 min-w-20 h-10 py-6 text-sm gap-2 rounded-md transition-all transform bg-[#111827] text-white 
               hover:opacity-90 active:scale-95"/>
            <div className="flex items-center gap-4">
                <hr className="bg-gray-300 border-none w-full h-px flex-1" role="separator" />
                <p className="shrink-0 text-xs text-gray-500">O</p>
                <hr className="bg-gray-300 border-none w-full h-px flex-1" role="separator" />
            </div>
            <BtnSubmit
                name="Iniciar con Google"
                type="submit"
                onClicked={undefined}
                className="elative z-0 inline-flex items-center justify-center box-border appearance-none select-none 
               whitespace-nowrap font-normal subpixel-antialiased overflow-hidden 
               tap-highlight-transparent outline-none focus-visible:z-10 focus-visible:outline-2
               px-4 min-w-20 h-10  py-6
               border-2 border-solid border-gray-300
               text-sm gap-2 rounded-md transition-all transform bg-white text-black
               hover:opacity-90 active:scale-95"
                icon={<SvgIconBtnGoogle
                    className="text-2xl" />} />

            <button
                className="flex w-[200px] justify-center lg:hidden sm:hidden text-md
                 bg-slate-200 text-primary py-2 rounded-lg mt-2 items-center"
                onClick={() => { setIsLogin(false) }}

            >

                Crear una cuenta
                <LeftArrowIcon className="w-8 h-8 mr-2 text-gray-400 rotate-180" />
            </button>


        </form>
    )
}

