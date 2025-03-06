'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"
import React, { JSX } from "react";
interface DashBoardProps {
    name:string;
    href:string;
    icon?:JSX.Element
  }
  
  
export const NavLinks = ({name,href,icon}:DashBoardProps) => {
    const pathName = usePathname()
  return (
    <React.Fragment>
     <Link href={href} className={`text-lg font-medium ${ pathName === href ? 'text-violet-700' : ''} transition-colors duration-200 hover:text-violet-700 flex items-center`}>
          {icon && <span className="mr-2">{icon}</span>}
          {name}
    </Link>
    </React.Fragment>
  )
}
