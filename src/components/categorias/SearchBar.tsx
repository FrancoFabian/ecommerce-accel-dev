

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }:SearchBarProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        placeholder="Buscar categorías y subcategorías"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
        onClick={() => onSearch('')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;