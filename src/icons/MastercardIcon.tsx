
interface MastercardIconProps{
    className?: string;
    color?: string; // Ahora acepta cualquier cadena, ya sea una clase de Tailwind o un código hexadecimal
    isFilled?: boolean;
  }
export const MastercardIcon = ({className = '', color = '#FF5F00', isFilled = false}: MastercardIconProps) => {
    const isHexColor = color.startsWith('#');
    return (
      <svg 
      fill="none" 
      className={`w-6 h-6 pointer-events-none transition-colors ${className} ${
        !isFilled && color.startsWith('#') ? `text-${color}` : ''
      }`}
      height={30} 
      viewBox="0 0 512 512" 
      width={30} 
      style={isHexColor && isFilled ? { color } : undefined}
      >
        <path
          d="M325.228 131.82H186.781v248.792h138.447V131.82z"
          fill="#FF5F00"
        />
        <path
          d="M195.571 256.225a157.948 157.948 0 0160.432-124.396 158.224 158.224 0 10-80.893 281.717 158.22 158.22 0 0080.893-32.925 157.951 157.951 0 01-60.432-124.396z"
          fill="#EB001B"
        />
        <path
          d="M512 256.225a158.223 158.223 0 01-89.067 142.313 158.218 158.218 0 01-166.928-17.917 158.247 158.247 0 000-248.793A158.219 158.219 0 01512 256.225zM496.905 354.265v-5.094h2.054v-1.037h-5.23v1.037h2.054v5.094h1.122zm10.155 0v-6.141h-1.603l-1.844 4.224-1.845-4.224h-1.604v6.141h1.132v-4.633l1.73 3.994h1.173l1.73-4.004v4.643h1.131z"
          fill="#F79E1B"
        />
      </svg>
    )
  }