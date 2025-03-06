import { NotificationIcon } from "@/icons/NotificationIcon";
import { SearchIcon } from "@/icons/SearchIcon";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi2";

type UserMenuProps = {
    toggleNotifications: () => void;
    toggleMenuUser: () => void;
    toggleCartMenu: () => void;
    toggleSearchMenu: () => void;
    notificationsButtonRef: React.RefObject<HTMLButtonElement | null>;
    userMenuButtonRef: React.RefObject<HTMLButtonElement | null>;
    cartMenuButtonRef: React.RefObject<HTMLButtonElement | null>;
    searchMenuButtonRef: React.RefObject<HTMLButtonElement | null>;
  };
  

export const UserMenu = ({
    toggleNotifications,
    toggleMenuUser,
    toggleCartMenu,
    toggleSearchMenu,
    notificationsButtonRef,
    userMenuButtonRef,
    cartMenuButtonRef,
    searchMenuButtonRef,
  }: UserMenuProps) => (
  <ul className="hidden lg:flex sm:flex items-center gap-2 ml-auto">
      {/* Search Icon */}
      <li>
          <button 
          ref={searchMenuButtonRef}
          onClick={toggleSearchMenu}
          className="p-2 rounded-full hover:bg-gray-100 transition">
              <SearchIcon className="w-4 h-4" color="gray" />
          </button>
      </li>

      <li>
      <button
              ref={cartMenuButtonRef}
              onClick={toggleCartMenu}
              className="p-2 rounded-full hover:bg-gray-100 transition relative"
          >
              <HiShoppingCart className="w-6 h-6" color="black" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  5
              </span>
          </button>
      </li>
      <li>
          <button
              ref={notificationsButtonRef}
              onClick={toggleNotifications}
              className="p-2 rounded-full hover:bg-gray-100 transition relative"
          >
              <NotificationIcon className="w-6 h-6" color="gray" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  5
              </span>
          </button>
      </li>

      {/* User Avatar */}
      <li>
          <button 
          ref={userMenuButtonRef}
          onClick={toggleMenuUser}
          className="p-2 w-[50px] h-[50px] rounded-full hover:bg-gray-100 transition">
              <Image
                  src="https://i.pravatar.cc/150?u=a04258114e29526708c"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
              />
          </button>
      </li>
  </ul>
);
  

  