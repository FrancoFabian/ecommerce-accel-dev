import { BtnClients } from './BtnClients';
import {HiFolder  } from 'react-icons/hi';
import {  HiArrowLeftOnRectangle, HiChartBar, HiChartPie, HiClipboardDocumentList, HiClock, HiCog6Tooth, HiGift, HiHome, HiMagnifyingGlass, HiQuestionMarkCircle, HiReceiptPercent, HiUserGroup } from 'react-icons/hi2';
import { ElementType, ComponentProps } from 'react';

type Icon = ElementType<ComponentProps<"svg">>;

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: Icon;
  badge?: string | number;
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}


const NAV_SECTIONS: NavSection[] = [
  {
    id: "overview_id",
    title: "Overview",
    items: [
      { id: "home_id", label: "Home", href: "/", icon: HiHome },
      { id: "projects_id", label: "Projects", href: "#", icon: HiFolder },
      { id: "tasks_id", label: "Tasks", href: "#", icon: HiClipboardDocumentList },
      { id: "team_id", label: "Team", href: "#", icon: HiUserGroup },
      { id: "tracker_id", label: "Tracker", href: "#", icon: HiClock, badge: "New" },
    ],
  },
  {
    id: "organization_id",
    title: "Organization",
    items: [
      { id: "cap_table_id", label: "Cap Table", href: "#", icon: HiChartPie },
      { id: "analytics_id", label: "Analytics", href: "#", icon: HiChartBar },
      { id: "perks_id", label: "Perks", href: "/perks", icon: HiGift, badge: 3 },
      { id: "expenses_id", label: "Expenses", href: "#", icon: HiReceiptPercent },
      { id: "settings_id", label: "Settings", href: "/settings", icon: HiCog6Tooth },
    ],
  },
];

const FOOTER_BUTTONS: { id: string; label: string; icon: Icon; onClick?: () => void }[] = [
  { id: "help_id", label: "Help & Information", icon: HiQuestionMarkCircle },
  { id: "log_out_id", label: "Log Out", icon: HiArrowLeftOnRectangle }, // onClick se asigna en el componente
];



export const Sidebar: React.FC = () => {
  return (
    <div className="h-full min-h-[48rem]">
      <div className="md:hidden  sm:hidden lg:flex lg:relative hidden h-full w-72 flex-1 flex-col border-r border-gray-300 p-6">
        <div className="flex flex-col gap-4">
          {/* Búsqueda */}
          <div className="group flex flex-col w-full relative justify-end px-1">
            <div className="flex flex-col h-full">
              <div
                className="relative w-full inline-flex items-center shadow-sm px-3 gap-3 bg-gray-100 hover:bg-gray-200 h-10 rounded-md transition-colors duration-150 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
                style={{ cursor: 'text' }}
              >
                <div className="inline-flex w-full items-center h-full">
                  <HiMagnifyingGlass className="h-5 w-5 text-gray-500" />
                  <input
                    className="w-full font-normal bg-transparent outline-none placeholder:text-gray-500 text-sm pl-1.5 pr-1.5"
                    aria-label="search"
                    placeholder="Search..."
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <div className="overflow-y-auto -mr-6 h-full py-6 pr-6">
          <div className="w-full flex flex-col gap-1 p-1 overflow-hidden">
            <nav className="w-full flex flex-col gap-0.5 items-center" role="listbox" tabIndex={0}>
            {NAV_SECTIONS.map(({ id, title, items }) => (
                <li key={id} className="w-full mb-2 list-none">
                  <span className="pl-1 text-xs text-gray-500">{title}</span>
                  <ul className="pt-1 list-none">
                    {items.map(({ id, label, href, icon: IconEl, badge }) => (
                      <li key={id}>
                      <a
                        href={href}
                        className="flex group gap-2 items-center justify-between py-1.5 px-3 h-11 rounded-lg hover:bg-gray-100"
                      >
                        <IconEl className="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                        <span className="flex-1 truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                          {label}
                        </span>
                          {badge && (
                          <div className="relative inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-xs">
                            <span>{badge}</span>
                          </div>
                          )}
                      </a>
                    </li>
                    ))}
                  </ul> 
                </li>
              
            ))}
            </nav>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="w-px h-px block"
          style={{ marginLeft: '0.25rem', marginTop: '2rem' }}
        ></span>

        {/* Botones del Footer */}
        <div className="mt-auto flex flex-col gap-2">
          <BtnClients />
        </div>
      </div>
    </div>
  );
};
