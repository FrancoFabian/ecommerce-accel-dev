interface CardIconProps {
  className?: string;
  color?: string; // Ahora acepta cualquier cadena, ya sea una clase de Tailwind o un código hexadecimal
  isFilled?: boolean;
}

export const   CardIcon = ({className = '', color = '#F5A524', isFilled = false}: CardIconProps) => {
   const isHexColor = color.startsWith('#');
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
       className={`w-4 h-4 pointer-events-none transition-colors ${className} ${
        !isHexColor && isFilled ? `text-${color}` : ''
      }`}
        width={20}
        height={20}
        viewBox="0 0 24 24"
        style={isHexColor && isFilled ? { color } : undefined}
      >
        <defs>
          <mask id="iconifyReact0">
            <g fill="none">
              <path
                fill="#fff"
                d="M14 4h-4C6.229 4 4.343 4 3.172 5.172c-.844.843-1.08 2.057-1.146 4.078h19.948c-.066-2.021-.302-3.235-1.146-4.078C19.657 4 17.771 4 14 4m-4 16h4c3.771 0 5.657 0 6.828-1.172S22 15.771 22 12q0-.662-.002-1.25H2.002Q1.999 11.338 2 12c0 3.771 0 5.657 1.172 6.828S6.229 20 10 20"
              ></path>
              <path
                fill="#000"
                fillRule="evenodd"
                d="M5.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75m6.5 0a.75.75 0 0 1 .75-.75H14a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75"
                clipRule="evenodd"
              ></path>
            </g>
          </mask>
        </defs>
        <path fill="currentColor" d="M0 0h24v24H0z" mask="url(#iconifyReact0)"></path>
      </svg>
    );
  };
  