
interface FacebookIconProps {
    className?: string;
    color?: string; // Ahora acepta cualquier cadena, ya sea una clase de Tailwind o un código hexadecimal
    isFilled?: boolean;
}

export const FacebookIcon = ({className = '', color = '#3b5998', isFilled = false}: FacebookIconProps) => {
    const isHexColor = color.startsWith('#');
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={`w-4 h-4 pointer-events-none transition-colors ${className} ${
                !isHexColor && isFilled ? `text-${color}` : ''
              }`}
            width="0.5em"
            height="1em"
            viewBox="0 0 12 24"
            style={isHexColor && isFilled ? { color } : undefined}

        >
            <path
                fill="currentColor"
                d="M12.462.173v3.808h-2.265a2.11 2.11 0 00-1.675.521l.002-.002a2.37 2.37 0 00-.432 1.566v-.008 2.726h4.229l-.56 4.27H8.098V24H3.681V13.053H.001V8.784h3.68V5.639a5.56 5.56 0 011.502-4.162l-.003.003A5.42 5.42 0 019.185.002h-.013a24 24 0 013.406.185l-.117-.012z"
            />
        </svg>
    )
}

