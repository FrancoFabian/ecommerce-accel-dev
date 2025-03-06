'use client';
import { useState } from 'react';
import { EmailIcon } from "@/icons/EmaiIcon";
import { UserIcon } from "@/icons/UserIcon";
import { HiMiniXMark } from "react-icons/hi2";
import { InputWithIcon } from '../inputs/InputWithIcon';
import { InteractiveStarsQualification } from '../Qualifications/InteractiveStarsQualification';
import { WriteIcon } from '@/icons/WriteIcon';
import { TextArea } from '../textarea/TextArea';

interface ReviewModalProps {
    onClose: () => void;
}

export const ReviewModal = ({ onClose }: ReviewModalProps) => {

    const [formValues, setFormValues] = useState<Record<string, string>>({
        nombre: '',
        email: '',
        titlereview: '',
    });
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const handleRatingChange = (newRating: number) => {
        setSelectedRating(newRating);
    };
    const handleCommentChange = (newValue: string) => {
        setComment(newValue);
    };

    const handleInputChange = (name: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value, // Actualiza solo el input correspondiente
        }));
    };


    const handleSubmit = () => {
        console.log('Datos del formulario:', formValues);
        console.log('Rating seleccionado:', selectedRating);
    }
    return (
        <div className="flex w-screen bg-[#000000c5] h-[100dvh] fixed inset-0 z-50 overflow-x-auto justify-center items-end sm:items-center [--scale-enter:100%] [--scale-exit:100%] [--slide-enter:0px] [--slide-exit:80px] sm:[--scale-enter:100%] sm:[--scale-exit:103%] sm:[--slide-enter:0px] sm:[--slide-exit:0px]" style={{ opacity: 1, transform: 'translateY(var(--slide-enter)) scale(var(--scale-enter)) translateZ(0)' }}>
            <section role="dialog" className="flex flex-col relative z-50 w-full box-border bg-content1 outline-none mx-1 my-1 sm:mx-6 sm:my-16 max-w-md rounded-large shadow-small overflow-y-hidden">
                <div style={{ border: 0, clip: 'rect(0px, 0px, 0px, 0px)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', width: 1, whiteSpace: 'nowrap' }}>
                    <button aria-label="Dismiss" tabIndex={-1} style={{ width: 1, height: 1 }}></button>
                </div>
                <button role="button"
                 aria-label="Close" 
                 className="absolute appearance-none 
                 select-none top-1 right-1 rtl:left-1 
                 rtl:right-[unset] p-2 
                 text-foreground-500 rounded-full 
                 hover:bg-default-100 
                 active:bg-default-200 
                 tap-highlight-transparent outline-none"
                 onClick={onClose}
                 >
                    <HiMiniXMark className="w-4 h-4" />
                </button>
                <header className="flex py-4 px-6 flex-initial text-large font-semibold flex-col pt-8">
                    <h1 className="text-large font-semibold">Write a review</h1>
                    <p className="text-small font-normal text-default-400">Share your experience with this product</p>
                </header>
                <div className="flex flex-1 flex-col gap-3 px-6 py-2 pb-8">
                    <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        {/* Name input */}
                        <div className="group flex flex-col w-full" data-slot="base" data-filled="true" data-has-label="true">
                            <InputWithIcon SvgIcon={UserIcon} placeholder="Enter your name" label="Name" name="name" onChange={handleInputChange} />
                        </div>
                        {/* Email input */}
                        <div className="group flex flex-col w-full" data-slot="base" data-filled="true" data-has-label="true">
                            <InputWithIcon SvgIcon={EmailIcon} placeholder="Enter your email" label="Email" name="email" onChange={handleInputChange} />
                        </div>
                        <hr className="shrink-0 bg-divider border-none w-full h-divider" />
                        {/* Add any other input fields or actions here */}
                        <div className="flex gap-3 flex-col-reverse items-start">
                            {/* Add radio button or other components */}

                            <InteractiveStarsQualification initialRating={3} onChange={handleRatingChange} />
                            <span className='text-small'>Clasificacion</span>

                        </div>
                        <div className="group flex flex-col w-full" data-slot="base" data-filled="true" data-has-label="true">
                            <InputWithIcon SvgIcon={WriteIcon} placeholder="Titulo de tu resenia" label="Titulo" name="titlereview" onChange={handleInputChange} />
                        </div>
                        <TextArea
                            label="Comentario"
                            placeholder="Introduce tu comentario"
                            name="comentario"
                            value={comment}
                            onChange={handleCommentChange}
                            rows={6}
                        />
                        <button
                            className="relative inline-flex items-center justify-center box-border select-none whitespace-nowrap font-normal overflow-hidden outline-none focus:z-10 focus:outline-2 focus:outline-blue-500 focus:outline-offset-2 px-4 min-w-[5rem] h-10 text-sm gap-2 rounded-md transition-transform bg-blue-500 text-white hover:opacity-90 active:scale-95"
                            type="submit"
                        >
                            Enviar reseña
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}