import { useState, ChangeEvent } from "react";

interface TextAreaProps {
  label: string; // Etiqueta del TextArea
  placeholder: string; // Placeholder del TextArea
  name: string; // Nombre para asociarlo a la etiqueta
  value?: string; // Valor inicial del TextArea
  onChange?: (value: string) => void; // Callback para notificar cambios al componente padre
  rows?: number; // Número inicial de filas
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  name,
  value = "",
  onChange,
  rows = 4,
}) => {
  const [textValue, setTextValue] = useState<string>(value);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTextValue(newValue);
    if (onChange) {
      onChange(newValue); // Notificar cambios al componente padre
    }
  };

  return (
    <div
      className="group flex flex-col w-full"
      data-slot="base"
      data-filled={!!textValue}
      data-filled-within={!!textValue}
      data-has-elements="true"
      data-has-label="true"
    >
      <div
        data-slot="input-wrapper"
        className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 bg-default-100 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 !h-auto transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background py-2"
        style={{ cursor: "text" }}
      >
        <label
          data-slot="label"
          className="z-10 pointer-events-none origin-top-left rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text relative will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small pb-0.5 pe-2 max-w-full text-ellipsis overflow-hidden"
          htmlFor={name}
        >
          {label}
        </label>
        <div
          data-slot="inner-wrapper"
          className="inline-flex w-full h-full box-border items-start group-data-[has-label=true]:items-start pb-0.5"
        >
          <textarea
            data-slot="input"
            className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none bg-clip-text text-small pt-0 transition-height !duration-100 motion-reduce:transition-none h-32 resize-y !transition-none"
            aria-label={label}
            placeholder={placeholder}
            id={name}
            name={name}
            rows={rows}
            value={textValue}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
