import { NotNotifications } from "@/icons/NotNotifications";

export const NoNotifications = () => {
    return (
      <div className="flex h-full pr-0 lg:pr-[45%] lg:w-[600px] w-[400px] md:w-[667px] md:pr-[40%] sm:w-[667px] sm:pr-[40%] overflow-hidden items-center justify-center">
        <div className="flex w-full flex-col justify-center items-center">
        <NotNotifications className="w-[40px] h-[40px] text-lg" color="#A1A1AA" isFilled={true} />
        <p className="text-sm text-gray-500">No hay notificaciones todavía.</p>
        </div>
        
      </div>
    );
  };