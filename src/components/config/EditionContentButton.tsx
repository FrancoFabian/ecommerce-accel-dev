interface EditButtonProps {
    name: string;
    description: string;
    buttonType: "edit" | "delete"; // Define el tipo de botón
    btnName?: string; // Opcional: nombre del botón
    setModalOpen: (open: boolean) => void
  }
  
  export const EditContentButton = ({
    name,
    description,
    buttonType,
    btnName,
    setModalOpen
  }: EditButtonProps) => {
    return (
      <div className="flex items-center justify-between gap-2 
      transition-all duration-700 ease-in-out
      w-full lg:w-[48%] sm:w-[48%]
      sm:h-[150px] lg:h-[120px]
      rounded-lg bg-gray-100 p-4">
        <div>
          <p className="text-gray-600 font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className={`z-0 group relative inline-flex items-center justify-center box-border
             appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased 
             overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none 
             hover:opacity-80 active:scale-95 focus:outline focus:outline-2 
              px-6 min-w-20 h-10 text-sm gap-2 rounded-full transition-transform-colors-opacity motion-reduce:transition-none ${
            buttonType === "edit"
              ? "bg-transparent border-2 border-default focus:outline-blue-500 text-foreground data-[hover=true]:opacity-hover hover:bg-default-200"
              : "bg-danger/20 text-danger focus:outline-red-500 dark:text-danger-500 data-[hover=true]:opacity-hover"
          }`}
          type="button"
        >
         {btnName}
          {/* Aquí va el SVG opcional */}
        </button>
      </div>
    );
  };
  