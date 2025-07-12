import { useCallback, useState } from "react";
import { ContactRequest, ContactData, ApiResponse } from '../types/auth.types';
import { api } from "@/utils/api";
import { API_ENDPOINTS } from "@/config";
import { showSuccess, showError, handleApiError } from "@/utils/notifications";
import { FormikProps } from "formik"
import { FormValues } from "@/types/form.types";

export const useRegistrationHandlers = (formik: FormikProps<FormValues>, contactMethod: "email"|"phone") => {
  const [isVerified, setIsVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const goNext = useCallback(() => setCurrentStep((s) => s + 1), []);
  const handleContactSuccess = async () => {
    try {
      const body: ContactRequest = {
        provider:   "credentials",
        method:     contactMethod,
        identifier: formik.values.identifier,
      };
  
      //          Body ---------,  Respuesta útil -----
      const result: ApiResponse<ContactData> =
        await api.post<ContactRequest, ContactData>(
          API_ENDPOINTS.auth.contact,
          body
        );
  
      if (!result.success || !result.data) {
        showError(result.error || "Error en el contacto");
        return;
      }
  
      showSuccess(result.data.message);
  
      if (result.data.skip) {
        setIsVerified(true);
        setCurrentStep(6);
      } else {
        setCurrentStep(2);
      }
    } catch (err) {
      handleApiError(err, "No se pudo conectar con el servidor");
    }
  };
  
    const handleVerificationSuccess = async (code: string) => {
      try {
        const result = await api.post(API_ENDPOINTS.auth.verify, {
          verificationCode: code,
          identifier: formik.values.identifier,
          method: contactMethod,
        });
  
        if (result.success) {
          showSuccess("Código verificado correctamente");
          setIsVerified(true);
          goNext();
        } else {
          showError(result.error || "Error en la verificación");
        }
      } catch (error) {
        handleApiError(error, "No se pudo verificar el código");
      }
    };
  
    const handlePasswordSubmit = async () => {
      try {
        const result = await api.post(API_ENDPOINTS.auth.password, {
          password: formik.values.password,
          confirmPassword: formik.values.confirmPassword,
          username:   formik.values.username,
        });
  
        if (result.success) {
          showSuccess("Contraseña establecida correctamente");
          goNext();
        } else {
          showError(result.error || "Error al establecer la contraseña");
        }
      } catch (error) {
        handleApiError(error, "No se pudo establecer la contraseña");
      }
    };
  
    const handleProfileSubmit = async () => {
      try {
        const result = await api.post(API_ENDPOINTS.auth.profile, {
          firstName: formik.values.firstName,
          middleName: formik.values.middleName,
          lastName: formik.values.lastName,
          secondLastName: formik.values.secondLastName,
          alternativeContact: formik.values.alternativeContact,
          birthDate: formik.values.birthDate?.toISOString().split("T")[0] || "",
           alternativeContactEmail: contactMethod === "phone",
        });
  
        if (result.success) {
          showSuccess("Perfil actualizado correctamente");
          goNext();
        } else {
          showError(result.error || "Error al actualizar el perfil");
        }
      } catch (error) {
        handleApiError(error, "No se pudo actualizar el perfil");
      }
    };
  
    const handleAddressSubmit = async () => {
      try {
        const result = await api.post(API_ENDPOINTS.auth.address, {
          street: formik.values.street,
          colony: formik.values.colony,
          municipality: formik.values.municipality,
          state: formik.values.state,
          zipCode: formik.values.zipCode,
          country: formik.values.country,
        });
  
        if (result.success) {
          showSuccess("Dirección guardada correctamente");
          goNext();
        } else {
          showError(result.error || "Error al guardar la dirección");
        }
      } catch (error) {
        handleApiError(error, "No se pudo guardar la dirección");
      }
    };
  
    const handleCompleteRegistration = async () => {
      try {
        const result = await api.post(API_ENDPOINTS.auth.completeRegistration, {
          newsletter: formik.values.newsletter,
          termsAccepted: formik.values.termsAccepted,
        });
  
        if (result.success) {
          showSuccess("¡Registro completado exitosamente!");
        } else {
          showError(result.error || "Error al completar el registro");
        }
      } catch (error) {
        handleApiError(error, "No se pudo completar el registro");
      }
    };
  

  /* …otros handlers (verify, password, etc.) … */

  return {
    currentStep,
    setCurrentStep,
    isVerified,
    handleContactSuccess,
    handleVerificationSuccess,
    handlePasswordSubmit,
    handleProfileSubmit,
    handleAddressSubmit,
    handleCompleteRegistration,

    /* resto de handlers */
  };
};
