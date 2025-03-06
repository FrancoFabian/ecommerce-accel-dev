'use client'
import { useState } from "react";
import { AuthenticationSwitches } from "./AuthenticationSwitches";
import { EditContentButton } from "./EditionContentButton";
import { EmailInfo } from "./EmailInfo"
import EmailModal from "./modal/EmailModal";
import DeleteAccountModal from "./modal/delete-account";
import PasswordModal from "./modal/password-modal";


interface FactorTypes{
  name: string;
  description: string;
}
const factors: FactorTypes[] = [
  {
    name: "Autenticación de dos factores",
    description: "Añadir una capa adicional de seguridad a su cuenta.",
  },
  {
    name: "Protección de restauración de contraseña",
    description: "Requerir información adicional para restablecer su contraseña.",
  },
  {
    name: "Requerir PIN",
    description: "Requerir un PIN para acceder a su cuenta.",
  },
];

export const SecurityConfig = () => {
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  return (
    <div
      className="flex flex-col relative text-foreground bg-white
       rounded-lg w-full h-full lg:justify-center lg:items-center
       overflow-y-auto px-4 sm:px-0 pb-20 sm:pb-0"
    >
      <div className="p-4 w-full flex flex-col items-start
      transition-all duration-700 ease-in-out
      lg:items-center lg:justify-center">
        <p className="text-slate-900 text-2xl font-semibold">Configuraciones de seguridad</p>
        <p className="text-md text-gray-500">Administra tus preferencias de seguridad</p>
      </div>
      <div className="flex lg:w-[80%] 
      sm:w-full w-full  lg:flex-wrap flex-wrap sm:flex-wrap sm:gap-1
      justify-center items-center py-0 lg:py-4 
      sm:justify-between sm:items-start sm:py-4 sm:px-3
      space-y-4">
        <EmailInfo setEmail={setEmailModalOpen} />
        <EditContentButton
          name="Contraseña"
          description="Establezca una contraseña única para proteger su cuenta."
          buttonType="edit"
          btnName="Cambiar"
          setModalOpen={setPasswordModalOpen}
        />

        {
          factors.map((factor) => (
            <AuthenticationSwitches
              key={factor.description}
              name={factor.name}
              description={factor.description}
            />
          ))
        }
        <EditContentButton
          name="Desactivar cuenta"
          description="Desactivar tu cuenta y borra todos tus datos."
          buttonType="edit"
          btnName="Desactivar"
          setModalOpen={setDeleteModalOpen}
        />
        <EditContentButton
          name="Eliminar cuenta"
          description="Elimina tu cuenta y todos tus datos."
          buttonType="delete"
          btnName="Eliminar"
          setModalOpen={setDeleteModalOpen}
        />
      </div>
      <EmailModal isOpen={emailModalOpen} onClose={() => setEmailModalOpen(false)} />
        <DeleteAccountModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} />
          <PasswordModal isOpen={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} />
    </div>
  );
};