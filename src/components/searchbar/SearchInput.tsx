import { SearchIcon } from "@/icons/SearchIcon";
interface SearchInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

export const SearchInput = ({placeholder, value, onChange}: SearchInputProps) => {
  return (
    <div
    data-slot="input-wrapper"
    className="relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm gap-3 border border-gray-300 hover:border-gray-400 focus-within:border-gray-500 h-10 rounded-full transition duration-150 px-4 cursor-text"
  >
    <div data-slot="inner-wrapper" 
    className="inline-flex w-full items-center h-full box-border">
      <SearchIcon/>
      <input
        data-slot="input"
        data-has-start-content="true"
        className="w-full font-normal bg-transparent outline-none placeholder-gray-500 focus:outline-none pl-1.5 text-sm"
        aria-label="Buscar"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
  )
}


