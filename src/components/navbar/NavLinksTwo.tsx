'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { JSX } from "react";

interface NavProps {
    name: string;
    href: string;
    icon?: JSX.Element
}

export const NavLinksTwo = ({ name, href }: NavProps) => {
    const pathName = usePathname();

    return (
        <React.Fragment>

            <li className={`font-medium hover:font-semibold ${pathName === href ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}`}>
                <Link href={href} className="transition">
                    {name}
                </Link>
            </li>


        </React.Fragment>
    );
};