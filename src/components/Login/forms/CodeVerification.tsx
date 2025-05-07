"use client";

import React, {
  useState,
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  useEffect,
} from 'react';

/**
 * Two‑factor authentication (2FA) input that can be reused across your app.
 *
 * ### Quick usage
 * ```tsx
 * <TwoFactorAuthInput
 *   destination="juan.perez@gmail.com"
 *   onSubmit={(code) => api.verify(code)}
 * />
 * ```
 */
export interface CodeVerificationProps {
  /**
   * Amount of digits in the verification code (defaults to 6).
   */
  length?: number;
  /**
   * Heading displayed above the inputs. Accepts plain text or JSX.
   */
  title?: React.ReactNode;
  /**
   * Text shown right under the heading **before** the masked destination.
   * Example: «Ingresa el código que te enviamos» → «Ingresa el código que te enviamos a j***@g***.com».
   */
  message?: string;
  /**
   * Email address or phone number where the code was sent. It is automatically masked.
   */
  destination?: string;
  /**
   * Extra classes for the outermost container.
   */
  containerClassName?: string;
  /**
   * Extra classes for each digit input.
   */
  inputClassName?: string;
  /**
   * Extra classes for the submit button.
   */
  buttonClassName?: string;
  /**
   * Callback executed when the user submits a complete code.
   */
  onSubmit?: (code: string) => void | Promise<void>;
  /**
   * Whether to focus the first input when the component mounts (defaults to true).
   */
  autoFocus?: boolean;
}

/**
 * Produces a privacy‑friendly representation of an email or phone number.
 *
 * | Input                      | Output        |
 * | -------------------------- | ------------- |
 * | `juan.perez@gmail.com`     | j***@g***.com |
 * | `+34 612 34 56 78`         | ***5678       |
 */
const maskDestination = (raw?: string): string | undefined => {
  if (!raw) return undefined;
  const value = raw.trim();

  // Email → keep first letter of local part + first letter of domain.
  if (value.includes('@')) {
    const [local, domain] = value.split('@');
    const maskedLocal = local.slice(0, 1) + '***';
    const [domainName, ...rest] = domain.split('.');
    const maskedDomain = domainName.slice(0, 1) + '***';
    return `${maskedLocal}@${maskedDomain}.${rest.join('.')}`;
  }

  // Phone → keep last 4 digits, mask the rest.
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 4) return `***${digits}`;
  return `***${digits.slice(-4)}`;
};

export const CodeVerification = ({
  length = 6,
  title = 'Verificación de dos factores',
  message = 'Ingresa el código que te enviamos',
  destination,
  containerClassName = 'w-full max-w-md mx-auto bg-white overflow-hidden',
  inputClassName = 'w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none',
  buttonClassName = 'w-full py-2 px-4 bg-slate-900 text-white font-semibold rounded-lg shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-75 transition-colors',
  onSubmit,
  autoFocus = true,
}: CodeVerificationProps) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first input on mount if requested.
  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // only digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto‑move to the next field.
    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    const newCode = [...code];
    pastedData.split('').forEach((char, idx) => {
      if (idx < length && !isNaN(Number(char))) {
        newCode[idx] = char;
      }
    });
    setCode(newCode);
    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();
  };

  const handleSubmit = () => {
    const fullCode = code.join('');
    if (fullCode.length !== length) return;
    onSubmit?.(fullCode);
  };

  const isDisabled = code.some((digit) => digit === '');

  return (
    <div className={containerClassName}>
      <div className="p-6 space-y-6">
        {title && <h2 className="text-2xl font-bold text-center text-gray-800">{title}</h2>}
        <p className="text-center text-gray-600">
          {message}
          {destination && <span className="font-semibold"> {maskDestination(destination)}</span>}
        </p>

        <div className="flex justify-between">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className={inputClassName}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className={`${buttonClassName} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isDisabled}
        >
          Verificar
        </button>
      </div>
    </div>
  );
};
