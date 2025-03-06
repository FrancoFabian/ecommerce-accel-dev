'use client';
import { useState } from "react";

interface NewsletterSubscriptionProps {
  onSubscribe: (email: string) => void; // Callback to handle email submission
}

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  onSubscribe,
}) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (error) setError(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }
    onSubscribe(email);
    setEmail("");
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="my-10 rounded-medium bg-default-200/20 p-4 sm:my-14 sm:p-8 lg:my-16 lg:flex lg:items-center lg:justify-between lg:gap-2">
      <div>
        <h3 className="text-small font-semibold text-default-600">
          Suscríbete a nuestra newsletter
        </h3>
        <p className="mt-2 text-small text-default-400">
          Recibe actualizaciones semanales con los últimos conocimientos,
          tendencias y herramientas, directamente en tu correo electrónico.
        </p>
      </div>
      <form
        className="mt-6 sm:flex sm:max-w-md lg:mt-0"
        onSubmit={handleSubmit}
      >
        <div
          className={`flex flex-col w-full relative justify-end `}
        >
          <div className="h-full flex flex-col">
            <div
              className={`relative w-full inline-flex tap-highlight-transparent 
                flex-row items-center shadow-sm px-3 gap-3 bg-default-200 
                hover:bg-gray-300 focus-within:bg-gray-200 h-10 min-h-10 rounded-md transition-background !duration-150`}
              style={{ cursor: "text" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="text-default-500"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12Z"></path>
                  <path
                    strokeLinecap="round"
                    d="m6 8l2.159 1.8c1.837 1.53 2.755 2.295 3.841 2.295s2.005-.765 3.841-2.296L18 8"
                  ></path>
                </g>
              </svg>
              <input
                className="w-full font-normal 
                bg-transparent placeholder:text-foreground-500 
                focus:outline-none !outline-none text-small"
                aria-label="Correo electrónico"
                placeholder="johndoe@correo.com"
                type="email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
          <button
            className="z-0 group relative inline-flex items-center justify-center 
            box-border appearance-none select-none whitespace-nowrap font-normal 
            overflow-hidden px-4 min-w-20 h-10 text-small gap-2 rounded-lg 
            bg-primary text-white transition-transform 
            motion-reduce:transition-none"
            type="submit"
          >
            Suscribir
          </button>
        </div>
      </form>
    </div>
  );
};
