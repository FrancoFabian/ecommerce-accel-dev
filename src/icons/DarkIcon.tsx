interface DarkIconProps {
  className?: string;
  color?: string; // Ahora acepta cualquier cadena, ya sea una clase de Tailwind o un código hexadecimal
  isFilled?: boolean;
}

export const DarkIcon = ({className = '', color = '#F5A524', isFilled = false}: DarkIconProps) => {
    const isHexColor = color.startsWith('#');
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none transition-colors ${className} ${
        !isHexColor && isFilled ? `text-${color}` : ''
      }`}
      aria-hidden="true"
      viewBox="0 0 24 24"
      style={isHexColor && isFilled ? { color } : undefined}
      
    >
      <path
        fill="currentColor"
        d="M21.067 11.857l-.642-.388.642.388zm-8.924-8.924l-.388-.642.388.642zM21.25 12A9.25 9.25 0 0112 21.25v1.5c5.937 0 10.75-4.813 10.75-10.75h-1.5zM12 21.25A9.25 9.25 0 012.75 12h-1.5c0 5.937 4.813 10.75 10.75 10.75v-1.5zM2.75 12A9.25 9.25 0 0112 2.75v-1.5C6.063 1.25 1.25 6.063 1.25 12h1.5zm12.75 2.25A5.75 5.75 0 019.75 8.5h-1.5a7.25 7.25 0 007.25 7.25v-1.5zm4.925-2.781A5.746 5.746 0 0115.5 14.25v1.5a7.247 7.247 0 006.21-3.505l-1.285-.776zM9.75 8.5a5.747 5.747 0 012.781-4.925l-.776-1.284A7.246 7.246 0 008.25 8.5h1.5zM12 2.75a.384.384 0 01-.268-.118.285.285 0 01-.082-.155c-.004-.031-.002-.121.105-.186l.776 1.284c.503-.304.665-.861.606-1.299-.062-.455-.42-1.026-1.137-1.026v1.5zm9.71 9.495c-.066.107-.156.109-.187.105a.285.285 0 01-.155-.082.384.384 0 01-.118-.268h1.5c0-.717-.571-1.075-1.026-1.137-.438-.059-.995.103-1.299.606l1.284.776z"
      />
    </svg>
  )
}
