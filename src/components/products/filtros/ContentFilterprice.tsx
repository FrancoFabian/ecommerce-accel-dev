
'use client'
import React from 'react';
import { Varela_Round } from 'next/font/google';
import { PriceRange } from './PriceRange';
const MemorizedPriceRange = React.memo(PriceRange);

const barHeights = [44, 44, 90, 35, 81, 30, 30, 35, 73, 68, 65, 63, 30, 68, 95, 30, 30, 76, 46, 38, 56, 98, 30, 90, 30, 53, 45, 65, 89, 74, 93, 50];
const varelaRound = Varela_Round({ weight: "400", subsets: ["latin"] });
export const ContentFilterprice = () => {

    return (

        <div className={`w-[300px] h-[245px] ml-10 bg-white shadow-md border border-default-200 rounded-[14px] p-5 ${varelaRound.className}`}>
           <h1 className='text-sm text-default-600 mb-2 font-bold'>Filtrar por precio</h1>
            <MemorizedPriceRange min={0} max={8000}
                defaultValue={[0, 2000]}
                onChange={undefined}
                barHeights={barHeights}

            />
            <hr className="my-4 border-gray-100 dark:border-gray-700" />
            <div className="w-full flex justify-end gap-2">
                <button
                    className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent  outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 px-3 min-w-16 h-8 text-tiny gap-2 rounded-lg [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-gray-300/40 text-default-foreground hover:bg-gray-300/60"
                    type="button"
                >
                    <span className="font-medium">Cancelar</span>
                </button>
                <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none px-3 min-w-16 h-8 text-tiny gap-2 rounded-lg [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary/20 text-primary hover:bg-primary/30" type="button">
                    <span className="font-medium">Aplicar</span>
                </button>
            </div>
        </div>



    )
}