import React, {useEffect, useState, useRef} from "react";
import "./MyTable.css";
import {MyTableRow} from "./MyTableRow";
import {Toolkit} from "@/components/general/toolkit/Toolkit";
import {ModelViewTemplate} from "@/components/template/modelViewTemplate";
import {ModelTemplate} from "@/components/template/modelTemplate";
import {useSelector} from "react-redux";
import {tableSelector} from "@/selectors/consumerSelector";
import {Field} from "@/components/template/field";


interface objectData {
    id: string; // Assuming the id can be either string or number
    [key: string]: any;
}

interface MyTableProps {
    list: ModelTemplate[];
    headerAction?: React.ReactNode | string;
    showCheckBox?: boolean;
    select?: [];
    callback?: (data: ModelTemplate, type: string) => void;
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
    const headers = list.length > 0 ? list[0].getAllField().map((e: any) => e.name) : [];
    !hideDetails && headers.push("Actions");
    const tableData = useSelector(tableSelector);

    const handleActionButtons = (data: ModelTemplate, type: string) => {
        if (callback) {
            callback(data, type);
        }
    };

    const searchHandle = () => {
        setTimeout(() => {
            console.log("search: " + tableData.searchValue)
            console.log(list)
            let temp = list.filter((item) => item.getAllField()
                .map((item) => (item as Field).name == "name" &&
                    (item as Field).value == "eleven")
            )
            const filteredList = list.filter(item => item.getAllField()
                .map(item => (item as Field).name == "Name" && (item as Field).value.includes("eleven")));

            console.log(filteredList)
        }, 1500);
    }

    useEffect(() => {
        const delay = 1500;

        // Clear the timeout if the search value changes before the timeout completes
        const timeoutId = setTimeout(() => {
            searchHandle()
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [tableData.searchValue, list]);


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
