interface SearchIconProps {
  className?: string;
  color?: string; // Ahora acepta cualquier cadena, ya sea una clase de Tailwind o un código hexadecimal
  isFilled?: boolean;
}
export const SearchIcon = ({className = '', color = '#F5A524', isFilled = false}: SearchIconProps) => {
    const isHexColor = color.startsWith('#');
    return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className={`w-4 h-4 pointer-events-none transition-colors ${className} ${
        !isHexColor && isFilled ? `text-${color}` : ''
      }`}
      viewBox="0 0 24 24"
      style={isHexColor && isFilled ? { color } : undefined}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11.5" cy="11.5" r="9.5"></circle>
        <path strokeLinecap="round" d="M18.5 18.5L22 22"></path>
      </g>
    </svg>
  );
}
