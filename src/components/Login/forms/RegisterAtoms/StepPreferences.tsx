import { Check } from "../../check/Check";
import { PreferencesStepProps } from "@/types/form.types";

export const StepPreferences = ({ formik }: PreferencesStepProps) => {
  return (
    <div className="h-95 space-y-4">
      <header className="pb-13 col-span-2">
        <h2 className="mb-3 text-3xl font-bold text-center">
          Por favor, seleccione sus preferencias
        </h2>
        <h4 className="text-center text-slate-400">
          Para personalizar su experiencia en el sistema
        </h4>
      </header>

      <div className="flex items-center space-x-2 pl-8">
        <Check
          id="newsletter"
          checked={formik.values.newsletter}
          onCheckedChange={(checked) =>
            formik.setFieldValue("newsletter", checked)
          }
        />
        <label htmlFor="newsletter">Subcribirme a la newsletter</label>
      </div>

      <div className="flex items-center space-x-2 pl-8">
        <Check
          id="termsAccepted"
          checked={formik.values.termsAccepted}
          onCheckedChange={(checked) =>
            formik.setFieldValue("termsAccepted", checked)
          }
        />
        <label htmlFor="termsAccepted">Acepto los términos y condiciones</label>
      </div>
      {formik.errors.termsAccepted && (
        <p className="text-red-500 text-sm">{formik.errors.termsAccepted}</p>
      )}
    </div>
  );
};
