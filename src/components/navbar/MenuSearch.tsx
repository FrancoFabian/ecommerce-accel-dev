'use client';
import {forwardRef, memo} from 'react';
import { SearchMenu } from '../busqueda/SearchMenu';


type MenuSearchProps = {
    isVisible: boolean;
  };

export const MenuSearch = memo(forwardRef<HTMLDivElement,MenuSearchProps>(({ isVisible },ref) => {
  return (
    <div
    ref={ref}
    className={`absolute transition-transform duration-200 ${
        isVisible
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
    }`}
    style={{ zIndex: 39 }}
>
    <div
        className="relative
       shadow-2xl 
        rounded-xl 
        lg:w-[700px]
        sm:w-[600px]
        w-[98%]
        left-1/2 transform 
        -translate-x-1/2 
        translate-y-[48%] 
        lg:translate-y-[48%] 
        lg:left-[15%]
        sm:left-[2%] 
        md:-translate-x-0 
        sm:-translate-x-0 
        sm:translate-y-[48%]
        top-[36px]"
        
    >
        <SearchMenu/>
      
    </div>
</div>
  )
}))
