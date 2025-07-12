'use client';
import { InputForPassword } from '@/components/Login/inputs/InputForPassword';
import { InputNormal } from '@/components/Login/inputs/InputNormal';
import { useState} from 'react'

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PasswordModal({ isOpen, onClose }: PasswordModalProps) {
    const [formValues, setFormValues] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    
      const [passwordsMatch, setPasswordsMatch] = useState(true);
    
      const handleInputChange = (name: string, value: string) => {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    
        if (name === 'confirmPassword' || name === 'newPassword') {
          const newPassword = name === 'newPassword' ? value : formValues.newPassword;
          const confirmPassword = name === 'confirmPassword' ? value : formValues.confirmPassword;
          setPasswordsMatch(newPassword === confirmPassword);
        }
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!passwordsMatch || formValues.newPassword.length < 8) {
          alert('Verifica que las contraseñas sean válidas.');
          return;
        }
        // Realizar lógica para cambiar la contraseña
        console.log('Contraseña cambiada:', formValues);
        onClose();
      };
    
      if (!isOpen) return null;
  

  return (
    <div className="fixed z-30 inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Cambiar contraseña</h2>
        <form onSubmit={handleSubmit}>
          {/* Contraseña actual */}
          <InputNormal
            nameInput="currentPassword"
            name="currentPassword"
            type="password"
            placeholder="Contraseña actual"
            isPassword={true}
            value={formValues.currentPassword}
            onChange={(value) => handleInputChange('currentPassword', value)}
            label={true}
          />

          {/* Nueva contraseña */}
          <InputForPassword
            nameInput="newPassword"
            type="password"
            placeholder="Nueva contraseña"
            isPassword={true}
            value={formValues.newPassword}
            onChange={(value) => handleInputChange('newPassword', value)}
            enablePasswordStrength={true} // Activar fortaleza
          />

          {/* Confirmar contraseña */}
          <InputForPassword
            nameInput="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            isPassword={true}
            value={formValues.confirmPassword}
            onChange={(value) => handleInputChange('confirmPassword', value)}
            compareToPassword={formValues.newPassword}
          />

          {/* Botones */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 
              rounded-lg cursor-pointer
              transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90
              cursor-pointer rounded-lg
              transition duration-300"
              disabled={!passwordsMatch || formValues.newPassword.length < 8}
            >
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
