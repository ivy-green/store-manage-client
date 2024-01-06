import React, {useEffect, useState, useRef} from "react";
import "./MyTable.css";
import {MyTableRow} from "./MyTableRow";
import {Toolkit} from "@/components/general/toolkit/Toolkit";
import {string} from "prop-types";


interface objectData {
    id: string; // Assuming the id can be either string or number
    [key: string]: any;
}

interface MyTableProps {
    list: objectData[];
    headerAction?: React.ReactNode | string;
    showCheckBox?: boolean;
    select?: [];
    callback?: (data: {}, type: string) => void;
    deleteCallback?: () => void;
    title?: string;
    hideDetails?: boolean;
    hideDelete?: boolean;
    hideToolkit?: boolean;
    isDeleteRow?: boolean;
    searchCallback?: () => {};
}

export const MyTable = ({
                            list = [],
                            headerAction,
                            showCheckBox = false,
                            select = [],
                            callback,
                            deleteCallback,
                            title,
                            hideDetails = false,
                            hideDelete = false,
                            hideToolkit = false,
                            isDeleteRow = false,
                            searchCallback,
                        }: MyTableProps) => {
    const headers = list.length > 0 ? Object.keys(list[0]) : [];
    !hideDetails && headers.push("Thao tác");

    const handleActionButtons = (data: Object, type: string) => {
        console.log(data);
        if (callback) {
            callback(data, type);
        }
    };

    const checkboxRef = useRef(true);

    useEffect(() => {
    }, [select]);

    return (
        <>
            <div className="myTable">
                <div className="grid grid-cols-2 mx-2">
                    <div className="">
                        <h3>{title}</h3>
                    </div>
                    <div className="text-end">{headerAction}</div>
                </div>
                {!hideToolkit && (
                    <Toolkit
                        hideDelete={hideDelete}
                        deleteCallback={deleteCallback}
                    />
                )}
                {list.length > 0 ? (
                    <div className="border-2 rounded-[10px]">
                        <MyTableRow
                            showCheckBox={showCheckBox}
                            data={headers}
                            ignoreID={headers[0].toLowerCase() === "id"}
                            isHeader={true}
                            cellContentCenter={false}
                        />

                        {list.length > 0 &&
                            list.map((e, index) => {
                                return (
                                    <MyTableRow
                                        callback={handleActionButtons}
                                        showCheckBox={showCheckBox}
                                        key={index}
                                        data={e}
                                        ignoreID={headers[0].toLowerCase() === "id"}
                                        hideDetails={hideDetails}
                                    />
                                );
                            })}
                    </div>
                ) : (
                    <div className="center h-75">
                        <p>No data to display.</p>
                    </div>
                )}
            </div>
        </>
    );
};
