'use client'

import React, {useEffect, useState} from "react";
import "./MyTable.css";
import {MyTableCell} from "./MyTableCell";
import {useDispatch, useSelector} from "react-redux";
import tableSlice from "@/features/table/tableSlice";
import {tableSelector} from "@/selectors/consumerSelector";
import MyButton from "@/components/general/MyButton";
import {Pencil} from "phosphor-react";
import {Field} from "@/components/template/field";
import {ModelTemplate} from "@/components/template/modelTemplate";
import {ModelViewTemplate} from "@/components/template/modelViewTemplate";

interface MyTableRowProps {
    data:
        ModelTemplate | string[];
    isHeader?: boolean;
    showCheckBox: boolean;
    callback?: (data: ModelTemplate, type: string) => void;
    hideDetails?: boolean;
    cellContentCenter?: boolean;
    ignoreID: boolean;
    filterValue?: string;
}

export const MyTableRow = ({
                               data,
                               isHeader = false,
                               showCheckBox = false,
                               callback = function (data, type) {
                               },
                               hideDetails = false,
                               cellContentCenter = false,
                               ignoreID = false,
                               filterValue
                           }: MyTableRowProps) => {
    const dispatch = useDispatch();
    const tableData = useSelector(tableSelector);
    const [tableList, setTableList] = useState(Array.isArray(data) ? data : data.getAllField());

    let className = isHeader
        ? `my_table_row table_header flex h-[auto]`
        : `my_table_row flex h-[auto]`;

    let checkBoxClassName = showCheckBox
        ? ``
        : `d-none`

    const handleActionButtons = async (data: ModelTemplate | string[], type: string) => {
        // dispatch(tableSlice.actions.detailButton(data));
        if (!Array.isArray(data)) {
            await callback(data, type);
        }
    };

    const handleSelect = async (e: boolean) => {
        if (!Array.isArray(data)) {
            let list = [...tableData.selectList];
            let ids = list.map((ele) => ele.id);
            if (e) list.push(data); //push model
            else {
                console.log(ids);
                let index = ids.indexOf(tableList[0].value); // index of code
                list.splice(index, 1);
            }
            console.log(list);
            dispatch(tableSlice.actions.handleSelected(list));
        }
    };

    return (
        <div className={className}>
            <div className={checkBoxClassName + " relative w-[40px] flex-none checkbox"}>
                <div className="checkbox-circle2 w-full h-full flex items-center border-b-[1px]">
                    <input
                        className={"mx-[auto]"}
                        type="checkbox"
                        id="checkbox-circle2"
                        name="check"
                        onChange={(e) => handleSelect(e.target.checked)}
                    />
                </div>
            </div>
            <div className={`flex-1 grid `} style={{
                gridTemplateColumns: (!hideDetails && isHeader) ?
                    `repeat(${(tableList).length - 1}, minmax(0, 1fr))` :
                    `repeat(${(tableList).length}, minmax(0, 1fr))`
                // `repeat(${Object.values(data).length - 2}, minmax(0, 1fr))` :
                // `repeat(${Object.values(data).length - 1}, minmax(0, 1fr))`
            }}>
                {/*{Object.values(data).map((e, index) => {*/}
                {tableList && tableList.map((e, index) => {
                    if ((((ignoreID && index !== 0) || !ignoreID)
                        && !(!hideDetails && isHeader && index == Object.values(data).length - 1))
                    ) {
                        if (index === 0)
                            return (
                                <MyTableCell
                                    key={index}
                                    data={e.value ? e.value : e}
                                    width={`-1`}
                                    center={cellContentCenter}
                                />
                            );
                        return (
                            <MyTableCell
                                key={index}
                                data={e.value ? e.value : e}
                                width={``}
                                center={cellContentCenter}
                            />
                        );
                    }

                })}
            </div>

            {!hideDetails && (
                !isHeader ? <MyTableCell
                    center={true}
                    width={`w-[90px]`}
                    data={
                        <div className={'px-[0.55em]'}>
                            <MyButton
                                label={""}
                                surfix={<Pencil size={12} color="#ffffff" weight="fill"/>}
                                borderRadius="rounded-[10px]"
                                onTap={() => handleActionButtons(data, "details")}
                            />
                        </div>
                    }
                /> : <MyTableCell
                    // data={Object.values(data)[Object.values(data).length - 1]}
                    data={"Actions"}
                    width={`w-[90px]`}
                    flexNone={true}
                    center={true}
                />
            )}
            {/*{actionsElement && <MyTableCell data={actionsElement} onClick={() => callback(data)}/>}*/}
        </div>
    );
};
