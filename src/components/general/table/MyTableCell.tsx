import React, {ReactNode, useEffect} from "react";
import "./MyTable.css";
import {useDispatch} from "react-redux";

interface cellArgs {
    data: String | ReactNode;
    subData?: String;
    width?: String;
    center?: boolean;
    flexNone?: boolean;
}

export const MyTableCell = ({
                                data = "",
                                subData = "",
                                width = "",
                                center = false,
                                flexNone = false,
                            }: cellArgs) => {
    return (
        <div
            className={`py-3 px-4 border-s-[1px] border-b-[1px] ${width} bg-[transparent]`
                + (center ? " text-center " : "")
                + (flexNone ? " flex-none " : "")}
        >
            <div className={`d-flex flex-column col`}>
                <div className="main_content">
                    {data}
                </div>
                <div className="sub_content">{subData}</div>
            </div>
        </div>
    );
};
