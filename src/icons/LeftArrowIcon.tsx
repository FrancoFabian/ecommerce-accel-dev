interface LeftArrowIconProps {
    className?: string;
    color?: string; // Ahora acepta cualquier cadena, ya sea una clase de Tailwind o un código hexadecimal
    isFilled?: boolean;
  }

export const LeftArrowIcon = ({className = '', color = '#F5A524', isFilled = false}: LeftArrowIconProps) => {
    const isHexColor = color.startsWith('#');
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`w-4 h-4 pointer-events-none transition-colors ${className} ${
            !isHexColor && isFilled ? `text-${color}` : ''
          }`}
        width={20}
        height={20}
        viewBox="0 0 24 24"
        style={isHexColor && isFilled ? { color } : undefined}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M10.53 5.47a.75.75 0 010 1.06l-4.72 4.72H20a.75.75 0 010 1.5H5.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0"
          clipRule="evenodd"
        />
      </svg>
    )
  }