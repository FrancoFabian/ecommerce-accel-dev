'use client';
import { useState} from "react";
import './styles.css';
import { Login } from "./Login";
import PanelRight from "./PanelRight";
import { SingUp } from "./SingUp";
import { ForgotPassword } from "./ForgotPassword";



export const FormLoSi = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotForm, setIsForgotForm] = useState(false);
   

   
    return (
        <div className="w-full relative h-[90.6vh] flex justify-center 
        items-center overflow-hidden">
           
            <div className={` lg:h-[80vh] h-screen pt-10
            flex ${!isForgotForm?"lg:w-[60vw]  w-full lg:bg-backGradient sm:bg-backGradient": "lg:bg-white lg:w-[30vw] w-full"} lg:pt-0
            lg:shadow-xl lg:rounded-lg sm:rounded-none sm:shadow-none overflow-hidden`}>
                
                {isLogin && !isForgotForm ? <Login setIsLogin={setIsLogin} isLogin={isLogin} forgotForm={isForgotForm} setForgotForm={setIsForgotForm} /> : null}
              
                {!isForgotForm ? <PanelRight isLogin={isLogin} setIsLogin={setIsLogin} /> : <ForgotPassword setForgotForm={setIsForgotForm} />}
              
                {!isLogin && !isForgotForm ? <SingUp setIsLogin={setIsLogin} isLogin={isLogin} /> : null}

            </div>


        </div>
    )
}


