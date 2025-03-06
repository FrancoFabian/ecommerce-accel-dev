import { PropsAllIcons } from "@/types/iconsall"

export const Cableadoestructurado = ({className = '', color = 'currentColor"'}:PropsAllIcons) => {
    const isHexColor = color.startsWith('#');
    return (

      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={500}
        zoomAndPan="magnify"
        viewBox="0 0 375 374.999991"
        height={500}
        preserveAspectRatio="xMidYMid meet"
        className={`pointer-events-none transition-colors ${className}`}
        style={isHexColor ? { fill: color } : undefined}
      >
        <defs>
          <clipPath id="31c4715370">
            <path
              d="M 26.898438 66.644531 L 347.898438 66.644531 L 347.898438 308 L 26.898438 308 Z M 26.898438 66.644531 "
              clipRule="nonzero"
            />
          </clipPath>
        </defs>
        <g clipPath="url(#31c4715370)">
          <path
            fill="currentColor"
            d="M 44.632812 285.601562 L 330.160156 285.601562 C 331.667969 285.601562 332.902344 286.835938 332.902344 288.34375 L 332.902344 305.089844 C 332.902344 306.597656 331.667969 307.832031 330.160156 307.832031 L 44.632812 307.832031 C 43.125 307.832031 41.890625 306.597656 41.890625 305.089844 L 41.890625 288.34375 C 41.894531 286.835938 43.125 285.601562 44.632812 285.601562 Z M 204.757812 77.953125 L 204.757812 66.890625 L 192.878906 66.890625 L 192.878906 77.953125 L 181.914062 77.953125 L 181.914062 66.890625 L 170.035156 66.890625 L 170.035156 77.953125 L 164.214844 77.953125 L 164.214844 118.890625 C 168.382812 120.839844 173.003906 122.199219 177.800781 122.96875 L 177.800781 274.640625 L 196.992188 274.640625 L 196.992188 122.96875 C 201.789062 122.199219 206.410156 120.839844 210.578125 118.890625 L 210.578125 77.953125 Z M 187.398438 108.804688 C 183 108.804688 179.433594 105.238281 179.433594 100.839844 C 179.433594 96.445312 183 92.878906 187.398438 92.878906 C 191.792969 92.878906 195.359375 96.445312 195.359375 100.839844 C 195.359375 105.238281 191.792969 108.804688 187.398438 108.804688 Z M 347.902344 218.921875 L 344.824219 207.449219 L 334.140625 210.3125 L 331.300781 199.722656 L 341.988281 196.859375 L 338.914062 185.390625 L 328.226562 188.253906 L 326.722656 182.628906 L 287.167969 193.226562 C 286.296875 198.144531 286.234375 203.394531 286.886719 208.640625 L 276.039062 212.195312 C 263.519531 216.296875 255.269531 227.628906 255.269531 240.808594 L 255.269531 274.640625 L 274.457031 274.640625 L 274.457031 240.808594 C 274.457031 235.9375 277.324219 231.925781 281.960938 230.40625 L 292.222656 227.042969 C 294.125 231.054688 296.457031 234.773438 299.167969 238 L 338.71875 227.40625 L 337.214844 221.785156 Z M 312.667969 218.632812 C 308.421875 219.769531 304.054688 217.25 302.914062 213.003906 C 301.777344 208.753906 304.300781 204.390625 308.546875 203.25 C 312.792969 202.113281 317.160156 204.632812 318.300781 208.882812 C 319.4375 213.128906 316.917969 217.492188 312.667969 218.632812 Z M 137.488281 140.125 L 129.03125 137.351562 C 129.828125 131.753906 129.820312 126.125 128.890625 120.875 L 89.335938 110.28125 L 87.832031 115.902344 L 77.144531 113.039062 L 74.070312 124.511719 L 84.757812 127.375 L 81.917969 137.964844 L 71.234375 135.101562 L 68.160156 146.574219 L 78.84375 149.433594 L 77.339844 155.058594 L 116.890625 165.652344 C 119.386719 162.683594 121.558594 159.296875 123.371094 155.648438 L 131.566406 158.335938 C 136.207031 159.855469 139.070312 163.867188 139.070312 168.738281 L 139.070312 274.640625 L 158.257812 274.640625 L 158.257812 168.738281 C 158.257812 155.558594 150.007812 144.226562 137.488281 140.125 Z M 113.140625 140.652344 C 112.003906 144.898438 107.636719 147.421875 103.390625 146.28125 C 99.140625 145.144531 96.621094 140.777344 97.757812 136.53125 C 98.898438 132.285156 103.261719 129.765625 107.511719 130.902344 C 111.757812 132.039062 114.28125 136.40625 113.140625 140.652344 Z M 98.753906 212.195312 L 87.910156 208.640625 C 88.5625 203.394531 88.496094 198.144531 87.625 193.226562 L 48.074219 182.628906 L 46.566406 188.253906 L 35.878906 185.390625 L 32.804688 196.859375 L 43.492188 199.722656 L 40.65625 210.3125 L 29.96875 207.449219 L 26.894531 218.921875 L 37.582031 221.785156 L 36.074219 227.40625 L 75.625 238 C 78.339844 234.773438 80.671875 231.054688 82.570312 227.042969 L 92.832031 230.40625 C 97.472656 231.925781 100.335938 235.9375 100.335938 240.808594 L 100.335938 274.640625 L 119.527344 274.640625 L 119.527344 240.808594 C 119.527344 227.628906 111.273438 216.296875 98.753906 212.195312 Z M 71.878906 213.003906 C 70.742188 217.25 66.375 219.769531 62.125 218.632812 C 57.878906 217.492188 55.355469 213.128906 56.496094 208.882812 C 57.632812 204.632812 62 202.113281 66.246094 203.25 C 70.496094 204.390625 73.015625 208.753906 71.878906 213.003906 Z M 306.636719 146.570312 L 303.5625 135.101562 L 292.875 137.964844 L 290.039062 127.375 L 300.722656 124.511719 L 297.648438 113.039062 L 286.964844 115.902344 L 285.457031 110.28125 L 245.90625 120.875 C 244.976562 126.125 244.964844 131.753906 245.765625 137.351562 L 237.308594 140.125 C 224.789062 144.226562 216.535156 155.554688 216.535156 168.738281 L 216.535156 274.640625 L 235.722656 274.640625 L 235.722656 168.738281 C 235.722656 163.867188 238.589844 159.855469 243.230469 158.335938 L 251.421875 155.648438 C 253.234375 159.296875 255.410156 162.683594 257.90625 165.652344 L 297.457031 155.058594 L 295.949219 149.433594 Z M 271.40625 146.28125 C 267.15625 147.421875 262.789062 144.898438 261.652344 140.652344 C 260.511719 136.40625 263.035156 132.039062 267.28125 130.902344 C 271.53125 129.765625 275.898438 132.285156 277.035156 136.53125 C 278.171875 140.777344 275.652344 145.144531 271.40625 146.28125 Z M 271.40625 146.28125 "
            fillOpacity={1}
            fillRule="evenodd"
          />
        </g>
      </svg>
    )
  }