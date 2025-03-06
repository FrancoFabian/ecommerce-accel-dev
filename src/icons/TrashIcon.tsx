interface TrashIconProps {
    className?: string;
    color?: string; // Puede ser una clase de Tailwind o un código hexadecimal
    isFilled?: boolean;
  }
  
  export const TrashIcon = ({
    className = '',
    color = '#71717A',
    isFilled = false,
  }: TrashIconProps) => {
    const isHexColor = color.startsWith('#');
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        role="presentation"
        className={`w-4 h-4 cursor-pointer transition-colors ${className} ${
          !isHexColor && isFilled ? `text-${color}` : ''
        }`}
        width="18"
        height="18"
        viewBox="0 0 18 19"
        fill="none" // Asegura que el fondo y las partes internas sean transparentes
        style={isHexColor && isFilled ? { color } : undefined}
      >
        <path
          d="M15.75 4.98487C13.2525 4.73737 10.74 4.60986 8.235 4.60986C6.75 4.60986 5.265 4.68486 3.78 4.83486L2.25 4.98487"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.35"
          fill="none" // Transparente
        />
        <path
          d="M6.375 4.2275L6.54001 3.245C6.66 2.53249 6.75 2 8.0175 2H9.98246C11.25 2 11.3475 2.5625 11.46 3.25249L11.625 4.2275"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.35"
          fill="none" // Transparente
        />
        <path
          d="M14.1376 7.35498L13.6501 14.9075C13.5675 16.0849 13.5 17 11.4075 17H6.59255C4.50005 17 4.43255 16.0849 4.35004 14.9075L3.86255 7.35498"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.35"
          fill="none" // Transparente
        />
        <path
          d="M7.74756 12.875H10.245"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.35"
          fill="none" // Transparente
        />
        <path
          d="M7.125 9.875H10.875"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.35"
          fill="none" // Transparente
        />
      </svg>
    );
  };
  