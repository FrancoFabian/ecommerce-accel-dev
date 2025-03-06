'use client';
import { Command } from "cmdk";

interface SuggestionsListProps {
    value: string
    suggestions: string[]
}

export const SuggestionsList = ({ value, suggestions }:SuggestionsListProps) => {
    return (
      <Command.List className=" max-h-60 overflow-y-auto">
        {value ? (
          suggestions.length > 0 ? (
            suggestions.map((item: string) => (
              <Command.Item
                key={item}
                value={item}
                onSelect={() => console.log(`Selected: ${item}`)}
                className="cursor-pointer select-none px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item}
              </Command.Item>
            ))
          ) : (
            <Command.Empty className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results for &quot;{value}&quot;
            </Command.Empty>
          )
        ) : null}
      </Command.List>
    );
  };
  