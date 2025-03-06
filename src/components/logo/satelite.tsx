function SvgSatelite({ className = "", primaryColor = "text-blue-600", secondaryColor = "text-gray-800", ...props }: { className?: string; primaryColor?: string; secondaryColor?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 99.3 70.64"
            className={`${className}`}
           // style={{ width: "100%", height: "auto" }}  // Esto asegura que se ajuste proporcionalmente
            {...props}
        >
            <path
                className={primaryColor}
                d="M23.64 33.58L30.87 23.63 15.89 24.14 3.55 39.12 23.64 33.58z"
                fill="currentColor"
            />
            <path
                className={primaryColor}
                d="M29.93 39.12L41.85 38.26 30.87 60.9 4.91 61.67 29.93 39.12z"
                fill="currentColor"
            />
            <path
                className={primaryColor}
                d="M59.38 27.29L66.36 19.29 98.02 12.05 86.79 29.84 59.38 27.29z"
                fill="currentColor"
            />
            <path
                className={primaryColor}
                d="M52.4 11.03L61.85 0.48 72.74 0.48 63.47 11.03 52.4 11.03z"
                fill="currentColor"
            />
            <path
                className={secondaryColor}
                d="M71.55 46.86L57 56.14s-2.3 1.36-2.72 4.17-2.38 13.11 6.98 9.62 17.19-8.94 19.66-11.83 3.74-8.26-.94-10.04-6.3-2.55-8.43-1.19zM56.39 40.23l-.19-2.01c-.04-.4.16-.79.52-.99l9.25-5.29s2.3-1.21 4.34 1.79 3.51 4.98 3.51 4.98 1.98 2.62-.57 4.47-20.36 13.4-20.36 13.4-6.51 2.68-9.26-2.17c-2.34-4.13-9.67-15.66-11.8-19a.62.62 0 01.49-.96c3.24-.16 6.5 1.34 16.8-3.42 1.53-.81 9.96-6.38 11.32-9.49s2.47-.94 1.7.47-2.43 4.04-6.98 7.49l8.77.55-6.85 4.55s-1.74 2.13-3.02.34-1.83-2.68-2.68-2.09-2.55.81-1.66 2.89 4.81 9.74 4.81 9.74 1.02 2.55 4.85.17 8.26-5.28 8.26-5.28 1.67-1.45.83-2.6S67 35.73 67 35.73s-.6-1.02-2.34.13-6.09 3.79-6.09 3.79l-1.45.92c-.3.19-.7 0-.73-.36z"
                fill="currentColor"
            />
            <ellipse
                className={secondaryColor}
                cx={44.63}
                cy={24.23}
                rx={15.58}
                ry={5.46}
                transform="rotate(-24.21 44.623 24.226)"
                fill="currentColor"
            />
            <ellipse className={primaryColor} cx={33.85} cy={5.41} rx={4.58} ry={4.42} fill="currentColor" />
            <path
                className={primaryColor}
                d="M37.85 4.17h3.54v19.22c0 .98-.79 1.77-1.77 1.77s-1.77-.79-1.77-1.77V4.17z"
                transform="rotate(-31.07 39.615 14.674)"
                fill="currentColor"
            />
            <path
                className={secondaryColor}
                d="M31.74 49.05h-6.29L9.05 63.99s16.53.13 16.6 0 6.1-14.94 6.1-14.94zM11.66 26.39l-8.17 8.62s13.85-2.74 13.91-2.94 3.32-5.68 3.32-5.68h-9.06zM58.76 5.07c0-.32 5.43-5.23 5.43-5.23h5.74l-6.26 5.57-4.91-.34zM75.3 26.2c.26-.51 3.38-4.91 3.7-5.11s20.3-6.64 20.3-6.45-7.79 12.26-7.79 12.26l-16.21-.7z"
                fill="currentColor"
           />
        </svg>
    );
}

export default SvgSatelite;