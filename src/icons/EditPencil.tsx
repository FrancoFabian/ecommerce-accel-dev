
export const EditPencil = ({className = ''}: {className?: string}) => {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          tabIndex={-1}
          className={`iconify iconify--solar ${className}`}
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          
        >
          <g fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" d="M4 22h16" />
            <path d="M13.888 3.663l.742-.742a3.146 3.146 0 114.449 4.45l-.742.74m-4.449-4.448s.093 1.576 1.483 2.966 2.966 1.483 2.966 1.483m-4.449-4.45L7.071 10.48c-.462.462-.693.692-.891.947a5.2 5.2 0 00-.599.969c-.139.291-.242.601-.449 1.22l-.875 2.626m14.08-8.13l-6.817 6.817c-.462.462-.692.692-.947.891q-.451.352-.969.599c-.291.139-.601.242-1.22.448l-2.626.876m0 0l-.641.213a.848.848 0 01-1.073-1.073l.213-.641m1.501 1.5l-1.5-1.5" />
          </g>
        </svg>
      )
    }
