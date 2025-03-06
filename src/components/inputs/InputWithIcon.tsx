'use client';
import React, { useState, ChangeEvent } from 'react';

interface InputWithIconProps {
    SvgIcon: React.FC<React.SVGProps<SVGSVGElement>>;
    placeholder: string;
    label: string;
    name: string;
    onChange: (name: string, value: string) => void; // Devuelve el nombre del input y su valor
  }
  
  export const InputWithIcon: React.FC<InputWithIconProps> = ({ SvgIcon, placeholder, label, name, onChange }) => {
    const [inputValue, setInputValue] = useState<string>('');
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      onChange(name, value); // Enviar el nombre y el valor al padre
    };
  

  return (
    <div
      data-slot="input-wrapper"
      className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 bg-default-100 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2"
      style={{ cursor: 'text' }}
    >
      <label
        data-slot="label"
        className="absolute z-10 pointer-events-none 
        origin-top-left rtl:origin-top-right 
        subpixel-antialiased 
        block text-foreground-500 cursor-text 
        will-change-auto !duration-200 !ease-out 
        motion-reduce:transition-none 
        transition-[transform,color,left,opacity]  
        translate-y-[-0.7rem]
        pe-2 max-w-full text-ellipsis overflow-hidden"
        htmlFor={name}
      >
        {label}
      </label>
      <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end pb-0.5">
        <SvgIcon aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" />
        <input
          data-slot="input"
          data-has-start-content="true"
          className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text text-small group-data-[has-value=true]:text-default-foreground"
          aria-label={label}
          placeholder={placeholder}
          id={name}
          name={name}
          value={inputValue}
          onChange={handleChange}
          type="text"
        />
      </div>
    </div>
  );
};

