import type { Config } from "tailwindcss";


export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:"#006FEE",
        warning:"#eda319",
        success:"#17C964",
        danger:{
          
          DEFAULT:"#F54180",
          600:"#D6366E",
          700:"#B62D5D",
          800:"#96234B",
          900:"#741A3A",
       
        }
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, rgba(17, 90, 236, 1) 0%, rgba(13, 135, 217, 1) 100%)',
        'custom-gradient-2': 'linear-gradient(85deg, rgba(17, 90, 236, 1) 0%, rgba(13,135,217,1) 100%)',
        'custom-gradient-3': 'radial-gradient(circle, rgba(14,14,19,1) 0%, rgba(27,46,125,1) 100%)',
        'backGradient': 'linear-gradient(90deg, rgba(17,24,39,1) 0%, rgba(17,34,70,1) 50%, rgba(26,36,108,1) 100%)'
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
