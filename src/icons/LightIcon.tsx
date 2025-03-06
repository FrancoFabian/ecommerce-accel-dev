
interface LightIconProps {
  className?: string;
  color?: string; // Ahora acepta cualquier cadena, ya sea una clase de Tailwind o un código hexadecimal
  isFilled?: boolean;
}
export const LightIcon = ({className = '', color = '#F5A524', isFilled = false}: LightIconProps) => {
    const isHexColor = color.startsWith('#');
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none transition-colors ${className} ${
        !isHexColor && isFilled ? `text-${color}` : ''
      }`}
      viewBox="0 0 24 24"
      style={isHexColor && isFilled ? { color } : undefined}
      
    >
      <g fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx={12} cy={12} r={6} />
        <path
          strokeLinecap="round"
          d="M12 2v1m0 18v1m10-10h-1M3 12H2m17.07-7.07l-.392.393M5.322 18.678l-.393.393m14.141-.001l-.392-.393M5.322 5.322l-.393-.393"
        />
      </g>
    </svg>
  )
}
