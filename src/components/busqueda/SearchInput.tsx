'use client';
import { Command } from 'cmdk';
import { SearchIcon } from '@/icons/SearchIcon';

interface SearchInputProps {
  value: string;
  setValue: (value: string) => void;
}

export const SearchInput = ({ value, setValue }: SearchInputProps) => {
    return (
      <div className="flex items-center border-b border-gray-300 dark:border-gray-700 px-4 py-2">
        <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <Command.Input
          value={value}
          onValueChange={setValue} // Cambiado a `onChange` para control total del input
          placeholder="Search component..."
          className="ml-2 w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
        <kbd className="space-x-0.5 rtl:space-x-reverse items-center font-sans text-center shadow-sm bg-gray-200 text-foreground-600 rounded-md ml-2 hidden border-none px-2 py-1 text-[0.6rem] font-medium md:block">
          <span>ESC</span>
        </kbd>
      </div>
    );
  };