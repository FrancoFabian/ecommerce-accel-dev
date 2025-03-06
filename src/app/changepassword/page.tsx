import { NewPassword } from "@/components/Login/forms/NewPassword";

export default function ChangePasswordPage() {
    return (
        <div className="flex h-[80vh] flex-col items-center justify-center py-2">
            <div className="lg:h-[80vh] h-screen pt-10
            flex bg-white lg:w-[45vw] sm:w-[80vw] w-full lg:pt-0
            lg:shadow-xl lg:rounded-lg sm:rounded-none sm:shadow-none overflow-hidden">
                <NewPassword />
            </div>


        </div>
    );
}