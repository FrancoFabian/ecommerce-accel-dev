interface UserIconProps {
    className?: string;
    color?: string; // Ahora acepta cualquier cadena, ya sea una clase de Tailwind o un código hexadecimal
    isFilled?: boolean;
  }

export const UserIcon = ({className = '', color = '#F5A524', isFilled = false}: UserIconProps) => {
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
        <circle cx={12} cy={6} r={4} fill="currentColor" />
        <path
          fill="currentColor"
          d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
        />
      </svg>
    )
  }