'use client';
import { InputNormal } from '@/components/Login/inputs/InputNormal';
import { TrashIcon } from '@/icons/TrashIcon';
import { useState } from 'react'

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (confirmText === 'ELIMINAR') {
      // Aquí iría la lógica para eliminar la cuenta
      console.log('Cuenta eliminada')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed z-30 inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Eliminar cuenta</h2>
        <p className="text-gray-600 mb-4">
          Esta acción es irreversible. Por favor, confirma que deseas eliminar tu cuenta.
        </p>
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-gray-500 mb-2">
            Escribe &quot;ELIMINAR&quot; para confirmar que deseas eliminar tu cuenta permanentemente:
          </p>
          {/* <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="ELIMINAR"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          /> */}
          <InputNormal 
          nameInput="ELIMINAR"
          name="deleteConfirm"
           type="text" 
           placeholder="ELIMINAR" 
           isPassword={false} 
           value={confirmText} onChange={(value) => setConfirmText(value)} label={false} 
           Icon={TrashIcon}
           />  
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-primary bg-primary/10 hover:bg-primary/20  
              rounded-lg transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                confirmText === 'ELIMINAR' ? 'bg-danger-600 text-white hover:bg-danger-600/90' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              disabled={confirmText !== 'ELIMINAR'}
            >
              Eliminar cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
