'use client';
import { TermsCheckbox } from "../check/TermsCheckbox"
import { useFormTransition } from "../../../lib/hooks/login/useFormTransition";
import { BtnSubmit } from "../submit/BtnSubmit"
import { SvgIconBtnGoogle } from "../submit/SvgIconBtnGoogle"
import { LeftArrowIcon } from "@/icons/LeftArrowIcon"
import { useState } from "react";
import { InputForPassword } from "../inputs/InputForPassword";
import { useRouter } from "next/navigation";

interface InputConfig {
    id: string;
    nameInput: string;
    type: string;
    placeholder: string;
    isPassword?: boolean;
}

interface SingUpProps {
    isLogin: boolean;
    setIsLogin: (newSatet: boolean) => void;
}
const inputs: InputConfig[] = [
    { id: "firstName", nameInput: "Nombre de usuario", type: "text", placeholder: "Nombre de usuario" },
    { id: "numberoremail", nameInput: "E-mail o celular", type: "email", placeholder: "ejmpl@gmail.com or 1234567890" },
    { id: "password", nameInput: "Contraseña", type: "password", placeholder: "Contraseña", isPassword: true },
    { id: "confirmPassword", nameInput: "Confirmar contraseña", type: "password", placeholder: "Confirmar contraseña", isPassword: true },
];

export const SingUp = ({ isLogin, setIsLogin }: SingUpProps) => {
    const singUpRef = useFormTransition<HTMLFormElement>(!isLogin, { fromDirection: "right" });
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const router = useRouter();
    const goToSignup = () => {
        // Cambia el estado para mostrar el formulario de registro
        setIsLogin(true);
        router.push('/login');
    };
    const handleInputChange = (name: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <form
            ref={singUpRef}
            className="flex w-full lg:w-[50%] lg:h-[100%] sm:w-full sm:h-screen h-auto
            overflow-y-auto pb-40 lg:pb-0 sm:pb-20 md:pb-20
        flex-col 
        gap-2 lg:gap-2 md:gap-4 sm:gap-4 2xl:gap-2 bg-white
          pt-2 px-5 lg:px-5 2xl:px-16 md:px-14 overflow-auto">
            <div className="w-full h-[50px] flex flex-col">
                <div className="w-full h-[50%] flex-col flex mt-3">
                    <div className="w-full h-[30%] flex justify-center text-slate-900 font-bold text-2xl"><h1>Crea una cuenta</h1></div>
                </div>

            </div>

            {inputs.map(({ id, nameInput, type, placeholder, isPassword }) => (
                <InputForPassword
                    key={id}
                    id={id}
                    nameInput={nameInput}
                    type={type}
                    placeholder={placeholder}
                    isPassword={isPassword}
                    value={formValues[nameInput] || ""}
                    onChange={(value) => handleInputChange(nameInput, value)}
                    compareToPassword={
                        nameInput === "Confirmar contraseña" ? formValues["Contraseña"] : undefined
                    }
                    enablePasswordStrength={nameInput === "Contraseña"} // Activar solo en el campo de contraseña
                />
            ))}
            <TermsCheckbox />
            <BtnSubmit
                name="Inscribirse"
                type="submit"
                onClicked={undefined}
                className="elative z-0 inline-flex items-center justify-center box-border appearance-none select-none 
               whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none 
               focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 
               px-4 min-w-20 h-10 text-sm gap-2 rounded-md transition-all transform bg-[#111827] text-white 
               hover:opacity-90 active:scale-95"/>
            <div className="flex items-center gap-4">
                <hr className="bg-gray-300 border-none w-full h-px flex-1" role="separator" />
                <p className="shrink-0 text-xs text-gray-500">O</p>
                <hr className="bg-gray-300 border-none w-full h-px flex-1" role="separator" />
            </div>
            <BtnSubmit
                name="Registrarse con cuenta de Google"
                type="submit"
                onClicked={undefined}
                className="elative z-0 inline-flex items-center justify-center box-border appearance-none select-none 
               whitespace-nowrap font-normal subpixel-antialiased overflow-hidden 
               tap-highlight-transparent outline-none focus-visible:z-10 focus-visible:outline-2
               px-4 min-w-20 h-10 py-6
               border-2 border-solid border-gray-300
               text-sm gap-2 rounded-md transition-all transform bg-white text-black
               hover:opacity-90 active:scale-95"
                icon={<SvgIconBtnGoogle
                    className="text-2xl" />} />

            <button
                className="flex w-[200px] justify-center lg:hidden sm:hidden text-md
                 bg-slate-200 text-primary py-2 rounded-lg mt-2 items-center"
                onClick={goToSignup}
            >
                <LeftArrowIcon className="w-8 h-8 mr-2 text-gray-400" />
                Iniciar sesión
            </button>
        </form>
    )
}
