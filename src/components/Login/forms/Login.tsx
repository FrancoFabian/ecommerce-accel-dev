"use client";
import { InputNormal } from "../inputs/InputNormal";
import { BtnSubmit } from "../submit/BtnSubmit";
import { SvgIconBtnGoogle } from "../submit/SvgIconBtnGoogle";
import { ForgotPassword } from "../check/ForgotPassword";
import { LeftArrowIcon } from "@/icons/LeftArrowIcon";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

interface FormState {
  success: boolean | null;
  message: string;
}

export const Login = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [isForgotForm, setIsForgotForm] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const loginAction = async (
    state: FormState,
    formData: FormData
  ): Promise<FormState> => {
    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      
      // Debug: verificar qué valores se están enviando
      console.log("Debug - Email:", email);
      console.log("Debug - Password:", password);
      console.log("Debug - FormValues:", formValues);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Credenciales incorrectas");
      }

      const data = await response.json();

      if (data.success) {
        router.push("/micuenta");
        router.refresh(); // Refresh the page to update server components
        return { success: true, message: "Inicio de sesión exitoso" };
      }

      throw new Error("Error en la autenticación");
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Error en la autenticación",
      };
    }
  };

  const [state, formAction] = useActionState(loginAction, {
    success: null,
    message: "",
  });
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="form-login">
      <div className="w-full h-[50px] flex flex-col">
        <div className="w-full h-[50%] flex-col flex mt-3">
          <div className="w-full h-[30%] flex justify-center text-slate-900 font-bold text-2xl">
            <h1>Inicie sesión</h1>
          </div>
        </div>
      </div>

      {state.message && (
        <div
          className={`width-full py-2 h-fit flex justify-center items-center 
                    ${
                      state.success
                        ? "bg-green-100 border-green-500"
                        : "bg-red-100 border-red-500"
                    }
                    border border-solid rounded-md`}
        >
          <p className="lg:text-[0.8rem] 2xl:text-[1rem]">{state.message}</p>
        </div>
      )}

      <InputNormal
        nameInput="Nombre de usuario"
        name="email"
        type="text"
        placeholder="Nombre de usuario"
        isPassword={false}
        value={formValues.email}
        onChange={(value) => handleInputChange("email", value)}
      />
      <InputNormal
        nameInput="Contraseña"
        name="password"
        type="password"
        placeholder="Contraseña"
        isPassword={true}
        value={formValues.password}
        onChange={(value) => handleInputChange("password", value)}
      />
      <ForgotPassword
        forgotForm={isForgotForm}
        setForgotForm={setIsForgotForm}
      />
      <BtnSubmit
        name={pending ? "Iniciando sesión..." : "Acceso"}
        type="submit"
        onClicked={undefined}
        className="relative z-0 inline-flex items-center justify-center box-border appearance-none select-none 
                whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none 
                focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 
                px-4 min-w-20 h-10 py-6 text-sm gap-2 rounded-md transition-all transform bg-[#111827] text-white 
                hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={pending}
      />
      <div className="flex items-center gap-4">
        <hr
          className="bg-gray-300 border-none w-full h-px flex-1"
          role="separator"
        />
        <p className="shrink-0 text-xs text-gray-500">O</p>
        <hr
          className="bg-gray-300 border-none w-full h-px flex-1"
          role="separator"
        />
      </div>

      <BtnSubmit
        name={pending ? "Iniciando sesión..." : "Iniciar con Google"}
        type="submit"
        onClicked={undefined}
        className="relative z-0 inline-flex items-center justify-center box-border appearance-none select-none 
                whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none 
                focus-visible:z-10 focus-visible:outline-2 px-4 min-w-20 h-10 py-6 border-2 border-solid border-gray-300
                text-sm gap-2 rounded-md transition-all transform bg-white text-black hover:opacity-90 active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed"
        icon={<SvgIconBtnGoogle className="text-2xl" />}
        disabled={pending}
      />

      <button
        type="button"
        className="flex w-[200px] justify-center text-md
                bg-slate-200 text-primary py-2 rounded-lg mt-2 items-center"
        onClick={() => {
             router.push('/signup');
        }}
      >
        Crear una cuenta
        <LeftArrowIcon className="w-8 h-8 mr-2 text-gray-400 rotate-180" />
      </button>
    </form>
  );
};
