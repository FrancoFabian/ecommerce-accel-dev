'use client';

import { useState } from 'react';

interface Tab {
  key: string; // Identificador único para la pestaña
  label: string; // Etiqueta de la pestaña
  count?: number; // Número opcional para mostrar (e.g., notificaciones no leídas)
}

interface TabListProps {
  tabs: Tab[]; // Lista de pestañas
  onTabChange?: (key: string) => void; // Callback para manejar el cambio de pestaña
}



export const TabList = ({ tabs, onTabChange }: TabListProps) => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]?.key || '');

    const handleTabClick = (key: string) => {
      setSelectedTab(key);
      if (onTabChange) onTabChange(key);
    };
  
    return (
      <div
        className="flex p-1 h-fit items-center flex-nowrap scrollbar-hide
         bg-transparent gap-6 px-6 py-0 w-full relative rounded-none border-b border-gray-200"
        role="tablist"
        aria-label="Notifications"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            data-key={tab.key}
            role="tab"
            aria-selected={selectedTab === tab.key}
            className={`z-0 w-full py-1 flex group relative justify-center items-center cursor-pointer transition-opacity ${
              selectedTab === tab.key
                ? 'text-primary font-semibold'
                : 'text-default-500'
            }`}
            onClick={() => handleTabClick(tab.key)}
          >
            {selectedTab === tab.key && (
              <span className="absolute z-0 h-[2px] bottom-0 bg-primary w-full"></span>
            )}
            <div className="relative z-10 whitespace-nowrap transition-colors">
              <div className="flex items-center space-x-2">
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <div className="relative max-w-fit inline-flex items-center box-border whitespace-nowrap text-tiny 
                  rounded-full bg-gray-100 text-gray-600 w-5 h-5 min-w-5 min-h-5 px-0 justify-center">
                    <span className="text-inherit font-normal px-0">{tab.count}</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    );
}
