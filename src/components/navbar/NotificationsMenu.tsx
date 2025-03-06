'use client';
import { forwardRef, memo} from "react";
import { Notifications } from "../notifications/Notifications";
type NotificationsMenuProps = {
    isVisible: boolean;
};

export const NotificationsMenu = memo(forwardRef<HTMLDivElement,NotificationsMenuProps>(({ isVisible },ref) => {
  


    return (
        <div
            ref={ref}
            className={`hidden sm:flex absolute transition-transform duration-200 ${
                isVisible
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
            }`}
            style={{ zIndex: 39,maxHeight: '90vh'}}
        >
            <div
                className="relative
                bg-white shadow-2xl 
                rounded-xl 
                lg:w-[400px]
                sm:w-[70%]
                w-[94%]
                left-1/2 transform 
                -translate-x-1/2 
                translate-y-[48%] 
                lg:translate-y-[48%] 
                lg:left-[85%]
                sm:left-[25%] 
                md:-translate-x-0 
                sm:-translate-x-0 
                sm:translate-y-[48%]
                top-14"
                
            >
                <Notifications />
            </div>
        </div>
    );
}));
