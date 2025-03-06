
import { Remember } from "./Remember"

interface ForgotPasswordProps {
    forgotForm: boolean;
    setForgotForm: (newSatet: boolean) => void;
}
export const ForgotPassword = ({ forgotForm, setForgotForm }: ForgotPasswordProps) => {
    const handleIsFormForgotPassword = () => {
        setForgotForm(!forgotForm);
    }

    return (
        <div className="flex items-center justify-between px-1 py-2">
            <Remember />
            <button
                className="relative inline-flex items-center tap-highlight-transparent outline-none 
            text-sm lg:text-xs 2xl:text-sm  no-underline hover:opacity-80 
             active:opacity-disabled transition-opacity text-primary"
             onClick={handleIsFormForgotPassword}
            >
                ¿Has olvidado tu contraseña?
            </button>
        </div>
    )
}

