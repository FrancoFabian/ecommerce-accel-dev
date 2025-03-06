import TwoFactorAuthInput from "@/components/Login/forms/TwoFactorAuthInput";

export default function NamePage() {
    return (
        <div className="flex h-[80vh] flex-col items-center justify-center py-2">
            <div className="h-[45vh] 
                flex  lg:w-[45vw] sm:w-[80vw] w-full lg:pt-0
                lg:shadow-xl lg:rounded-lg  bg-white sm:rounded-none sm:shadow-none overflow-hidden">
                <TwoFactorAuthInput />
            </div>


        </div>
    );
}