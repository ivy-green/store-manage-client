'use client'
import React, {ReactNode} from 'react';

interface buttonArgs {
    onTap: () => void;
    label: string;
    isBold?: boolean;
    prefix?: ReactNode;
    surfix?: ReactNode;
    bgColor?: string;
    fontColor?: string;
    borderRadius?: string;
    pdX?: string;
    pdY?: string;
    height?: string;
    width?: string;
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
                                     borderRadius = "rounded-[10px]",
                                     pdX = "px-4",
                                     pdY = "py-2",
                                     height = "h-auto",
                                     width = "w-auto"
                                 }:
                                     buttonArgs
) {
    return (
        <button
            className={`flex justify-around items-center 
            ${isBold ? "font-bold" : ""} 
            ${bgColor} ${fontColor} ${borderRadius} ${height} ${width} ${pdX} ${pdY}`}
            onClick={onTap}>
            <p>{prefix}</p> {label} <p>{surfix}</p>
        </button>
    );
}

