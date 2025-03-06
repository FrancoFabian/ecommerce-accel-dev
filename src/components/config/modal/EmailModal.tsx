'use client';
import { InputNormal } from '@/components/Login/inputs/InputNormal';
import { EmailIcon } from '@/icons/EmaiIcon';
import { useState } from 'react'

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EmailModal({ isOpen, onClose }: EmailModalProps) {
  const [newEmail, setNewEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar el email
    console.log('Nuevo email:', newEmail)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed z-30 inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Cambiar correo electrónico</h2>
        <p className="text-gray-600 mb-4">Ingresa tu nuevo correo electrónico. Necesitarás verificarlo después.</p>
        <form onSubmit={handleSubmit}>
          <InputNormal nameInput="Correo electronico" 
          type="email" placeholder="Correo electronico"
           isPassword={false} 
           value={newEmail} onChange={(value) =>  setNewEmail(value)} 
           label={false}
           Icon={EmailIcon}
           
           />
          <div className="flex justify-end mt-10 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-primary rounded-lg bg-primary/10 
               hover:bg-primary/20 transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition duration-300"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

