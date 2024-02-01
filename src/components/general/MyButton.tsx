'use client'
import React, {ReactNode, useState} from 'react';

interface buttonArgs {
    onTap: () => void;
    label: string;
    isBold?: boolean;
    prefix?: ReactNode;
    surfix?: ReactNode;
    bgColor?: string;
    fontColor?: string;
    fontColorHover?: string;
    borderRadius?: string;
    pdX?: string;
    pdY?: string;
    height?: string;
    width?: string;
    extendProps?: {};
}

export default function MyButton({
                                     onTap = () => {
                                     },
                                     prefix,
                                     surfix,
                                     isBold = true,
                                     label = "",
                                     bgColor = "bg-btn-default",
                                     fontColor = "text-white",
                                     fontColorHover = "text-default",
                                     borderRadius = "rounded-[10px]",
                                     pdX = "px-4",
                                     pdY = "py-2",
                                     height = "h-auto",
                                     width = "w-auto",
                                     extendProps = ""
                                 }:
                                     buttonArgs
) {
    const [isHover, setIsHover] = useState(false);

    return (
        <button
            {...extendProps}
            className={`flex justify-around items-center transition-all duration-100 
            ${isBold ? "font-bold" : ""} 
            ${bgColor} ${isHover ? fontColorHover : fontColor} ${borderRadius} ${height} ${width} ${pdX} ${pdY}`}
            onClick={onTap}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <p>{prefix}</p> {label} <p>{surfix}</p>
        </button>
    );
}

