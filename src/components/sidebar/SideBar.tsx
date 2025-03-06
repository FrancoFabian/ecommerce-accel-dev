

import {HiFolder  } from 'react-icons/hi';
import {  HiArrowLeftOnRectangle, HiChartBar, HiChartPie, HiClipboardDocumentList, HiClock, HiCog6Tooth, HiGift, HiHome, HiMagnifyingGlass, HiQuestionMarkCircle, HiReceiptPercent, HiUserGroup } from 'react-icons/hi2';

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
              {/* Sección Overview */}
              <li className="w-full mb-2 list-none">
                <span className="pl-1 text-xs text-gray-500">Overview</span>
                <ul className="pt-1 list-none">
                  <li>
                    <a
                      href="#"
                      className="flex group gap-2 items-center justify-between py-1.5 px-3 h-11 rounded-lg bg-gray-100"
                    >
                      <HiHome className="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                      <span className="flex-1 truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        Home
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex group gap-2 items-center justify-between py-1.5 px-3 h-11 rounded-lg hover:bg-gray-100"
                    >
                      <HiFolder className="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                      <span className="flex-1 truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        Projects
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex group gap-2 items-center justify-between py-1.5 px-3 h-11 rounded-lg hover:bg-gray-100"
                    >
                      <HiClipboardDocumentList className="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                      <span className="flex-1 truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        Tasks
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex group gap-2 items-center justify-between py-1.5 px-3 h-11 rounded-lg hover:bg-gray-100"
                    >
                      <HiUserGroup className="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                      <span className="flex-1 truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        Team
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex group gap-2 items-center justify-between py-1.5 px-3 h-11 rounded-lg hover:bg-gray-100"
                    >
                      <HiClock className="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                      <span className="flex-1 truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        Tracker
                      </span>
                      <div className="relative inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-xs">
                        <span>New</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>

              {/* Sección Organization */}
              <li className="w-full mb-2 list-none">
                <span className="pl-1 text-xs text-gray-500">Organization</span>
                <ul className="pt-1">
                  <li>
                    <a
                      href="#"
                      className="flex group gap-2 items-center justify-between py-1.5 px-3 h-11 rounded-lg hover:bg-gray-100"
                    >
                      <HiChartPie className="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                      <span className="flex-1 truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        Cap Table
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex group gap-2 items-center justify-between py-1.5 px-3 h-11 rounded-lg hover:bg-gray-100"
                    >
                      <HiChartBar className="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                      <span className="flex-1 truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        Analytics
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/perks"
                      className="flex group gap-2 items-center justify-between py-1.5 px-3 h-11 rounded-lg hover:bg-gray-100"
                    >
                      <HiGift className="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                      <span className="flex-1 truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        Perks
                      </span>
                      <div className="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-700 text-xs">
                        <span>3</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex group gap-2 items-center justify-between py-1.5 px-3 h-11 rounded-lg hover:bg-gray-100"
                    >
                      <HiReceiptPercent className="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                      <span className="flex-1 truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        Expenses
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/settings"
                      className="flex group gap-2 items-center justify-between py-1.5 px-3 h-11 rounded-lg hover:bg-gray-100"
                    >
                      <HiCog6Tooth className="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                      <span className="flex-1 truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        Settings
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
            </nav>
          </div>

          {/* Panel de Upgrade */}
          <div className="flex flex-col relative bg-gray-50 text-gray-900 shadow-sm rounded-lg mx-2 mt-6 overflow-visible">
            <div className="flex w-full p-3 flex-col items-center py-5 text-center">
              <h3 className="text-lg font-medium text-gray-700">
                Upgrade to Pro <span role="img" aria-label="rocket">🚀</span>
              </h3>
              <p className="p-4 text-sm text-gray-500">
                Get 1 month free and unlock all the features of the pro plan.
              </p>
            </div>
            <div className="flex w-full items-center justify-center p-3">
              <button
                type="button"
                className="inline-flex items-center justify-center min-w-[5rem] h-10 text-sm gap-2 rounded-full bg-blue-600 text-white shadow-md px-10 transition-colors"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="w-px h-px block"
          style={{ marginLeft: '0.25rem', marginTop: '2rem' }}
        ></span>

        {/* Botones del Footer */}
        <div className="mt-auto flex flex-col gap-2">
          <button
            type="button"
            className="inline-flex group items-center px-4 h-10 text-sm gap-2 rounded-md w-full bg-transparent hover:bg-gray-100 justify-start text-gray-500 hover:text-gray-900"
          >
            <HiQuestionMarkCircle className="h-6 w-6" />
            Help &amp; Information
          </button>
          <button
            type="button"
            className="inline-flex group items-center px-4 h-10 text-sm gap-2 rounded-md w-full bg-transparent hover:bg-gray-100 justify-start text-gray-500 hover:text-gray-900"
          >
            <HiArrowLeftOnRectangle className="h-6 w-6" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

