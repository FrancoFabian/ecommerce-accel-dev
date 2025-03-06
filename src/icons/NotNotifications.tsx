interface LightIconProps {
    className?: string;
    color?: string; // Ahora acepta cualquier cadena, ya sea una clase de Tailwind o un código hexadecimal
    isFilled?: boolean;
  }

export const NotNotifications = ({className = '', color = '#F5A524', isFilled = false}: LightIconProps) => {
    const isHexColor = color.startsWith('#');
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`w-4 h-4 pointer-events-none transition-colors ${className} ${
            !isHexColor && isFilled ? `text-${color}` : ''
          }`}
        width={40}
        height={40}
        viewBox="0 0 24 24"
        style={isHexColor && isFilled ? { color } : undefined}
        
      >
        <g fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M18.75 9.71v-.705C18.75 5.136 15.726 2 12 2S5.25 5.136 5.25 9.005v.705a4.4 4.4 0 01-.692 2.375L3.45 13.81c-1.011 1.575-.239 3.716 1.52 4.214a25.8 25.8 0 0014.06 0c1.759-.498 2.531-2.639 1.52-4.213l-1.108-1.725a4.4 4.4 0 01-.693-2.375z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 9h4l-4 4h4" />
          <path
            strokeLinecap="round"
            d="M7.5 19c.655 1.748 2.422 3 4.5 3s3.845-1.252 4.5-3"
          />
        </g>
      </svg>
    )
  }