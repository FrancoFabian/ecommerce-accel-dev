import { EditPencil } from "@/icons/EditPencil";

interface EmailInfoProps {
  setEmail: (email: boolean) => void
}

export const EmailInfo = ({ setEmail }: EmailInfoProps) => {
  return (
    <div className="flex items-center justify-between
    transition-all duration-700 ease-in-out
     gap-2 rounded-lg bg-gray-100 p-4 w-full h-[150px] lg:h-[120px] sm:h-[100px]">
      <div>
        <p className="text-gray-600 font-semibold">Email</p>
        <p className="text-sm text-gray-500">
          La dirección de correo electrónico asociada a su cuenta.
        </p>
      </div>
      <div className="flex w-full flex-wrap justify-end 
        gap-6 sm:w-auto sm:flex-nowrap">
        <div className="flex flex-col items-end">
          <p>francofabianm2@gmail.com</p>
          <p className="text-small text-success">Verificado</p>
        </div>
        <button
          className="relative inline-flex items-center justify-center box-border appearance-none 
  select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden 
  outline-none border px-4 min-w-[80px] h-10 text-sm gap-2 rounded-full 
  transition-all bg-transparent border-gray-300 text-gray-800 
  hover:opacity-80 active:scale-95 focus:outline focus:outline-2 focus:outline-blue-500"
          onClick={() => setEmail(true)}
        >
          Editar
          <EditPencil />
        </button>


      </div>
    </div>
  );
};
