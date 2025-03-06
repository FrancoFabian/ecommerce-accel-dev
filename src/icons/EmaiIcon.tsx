
interface EmailIconProps {
    className?: string;
    color?: string; // Ahora acepta cualquier cadena, ya sea una clase de Tailwind o un código hexadecimal
    isFilled?: boolean;
  }
export const EmailIcon = ({className = '', color = '#F5A524', isFilled = false}: EmailIconProps) => {
    const isHexColor = color.startsWith('#');
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`w-4 h-4 pointer-events-none transition-colors ${className} ${
            !isHexColor && isFilled ? `text-${color}` : ''
          }`}
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        style={isHexColor && isFilled ? { color } : undefined}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M3.172 5.172C2 6.343 2 8.229 2 12s0 5.657 1.172 6.828S6.229 20 10 20h4c3.771 0 5.657 0 6.828-1.172S22 15.771 22 12s0-5.657-1.172-6.828S17.771 4 14 4h-4C6.229 4 4.343 4 3.172 5.172M18.576 7.52a.75.75 0 01-.096 1.056l-2.196 1.83c-.887.74-1.605 1.338-2.24 1.746-.66.425-1.303.693-2.044.693s-1.384-.269-2.045-.693c-.634-.408-1.352-1.007-2.239-1.745L5.52 8.577a.75.75 0 01.96-1.153l2.16 1.799c.933.777 1.58 1.315 2.128 1.667.529.34.888.455 1.233.455s.704-.114 1.233-.455c.547-.352 1.195-.89 2.128-1.667l2.159-1.8a.75.75 0 011.056.097"
          clipRule="evenodd"
        />
      </svg>
    )
  }