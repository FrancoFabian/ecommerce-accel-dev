interface VisaIconProps{
    className?: string;
    color?: string; // Ahora acepta cualquier cadena, ya sea una clase de Tailwind o un código hexadecimal
    isFilled?: boolean;
  }

export const VisaIcon = ({className = '', color = '#1434CB', isFilled = false}: VisaIconProps) => {
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
          d="M253.509 175.921L219.303 335.84h-41.374l34.209-159.919h41.371zm174.059 103.261l21.775-60.052 12.531 60.052h-34.306zm46.176 56.658H512l-33.422-159.919H443.29c-7.953 0-14.658 4.611-17.625 11.722L363.587 335.84h43.45l8.625-23.883h53.072l5.01 23.883zm-108.002-52.208c.179-42.206-58.345-44.544-57.953-63.402.126-5.73 5.593-11.833 17.542-13.394 5.924-.763 22.272-1.382 40.803 7.157l7.247-33.925c-9.952-3.601-22.761-7.068-38.698-7.068-40.9 0-69.671 21.725-69.901 52.859-.263 23.024 20.552 35.861 36.202 43.529 16.135 7.838 21.541 12.863 21.462 19.866-.111 10.729-12.866 15.48-24.742 15.66-20.812.324-32.876-5.625-42.49-10.107l-7.51 35.059c9.683 4.431 27.523 8.287 45.996 8.485 43.483 0 71.912-21.47 72.042-54.719zM194.391 175.921L127.357 335.84H83.63L50.64 208.213c-2-7.848-3.744-10.733-9.827-14.049-9.949-5.403-26.372-10.456-40.813-13.6l.978-4.643h70.398c8.967 0 17.034 5.967 19.088 16.297l17.427 92.547 43.036-108.844h43.464z"
          fill="#1434CB"
        />
      </svg>
    )
  }