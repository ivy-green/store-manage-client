import React, {useEffect} from "react";
import "./MyTable.css";
import {MyTableCell} from "./MyTableCell";
import {useDispatch, useSelector} from "react-redux";
import tableSlice from "@/features/table/tableSlice";
import {tableSelector} from "@/selectors/consumerSelector";
import MyButton from "@/components/general/MyButton";
import {Pencil} from "phosphor-react";

interface MyTableRowProps {
    data:
        | {
        id: string; // Assuming the id can be either string or number
        [key: string]: any;
    }
        | string[];
    isHeader?: boolean;
    showCheckBox: boolean;
    callback?: (data: Object, type: string) => void;
    hideDetails?: boolean;
    cellContentCenter?: boolean;
    ignoreID: boolean;
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
                           }: MyTableRowProps) => {
    const dispatch = useDispatch();
    const tableData = useSelector(tableSelector);

    let className = isHeader
        ? `my_table_row table_header flex`
        : `my_table_row flex`;

    let checkBoxClassName = showCheckBox
        ? `my_table_cell flex-none checkbox`
        : `my_table_cell flex-none checkbox d-none`

    const findLengthElement = () => {
        let len = Object.values(data).length;
        if (ignoreID) len--;
        if (!hideDetails) len++;
        if (showCheckBox) len++;
        if (!isHeader) len++;
        return len;
    }

    let rowStyle = {
        // height: rowHeight,
        height: "auto",
    };


    const handleActionButtons = async (data: Object, type: string) => {
        dispatch(tableSlice.actions.detailButton(data));
        await callback(data, type);
    };

    //handle select each row
    const handleSelect = async (e: boolean) => {
        if (!Array.isArray(data)) {
            let list = [...tableData.selectList];
            let ids = list.map((ele) => ele.id);
            if (e) list.push(data);
            else {
                console.log(ids);
                let index = ids.indexOf(data.id);
                list.splice(index, 1);
            }
            console.log(list);
            dispatch(tableSlice.actions.handleSelected(list));
        }
    };

    return (
        <div style={rowStyle} className={className}>
            <div className={checkBoxClassName + " me-[10px]"}>
                <div className="checkbox-circle2">
                    <input
                        type="checkbox"
                        id="checkbox-circle2"
                        name="check"
                        onChange={(e) => handleSelect(e.target.checked)}
                    />
                </div>
            </div>
            <div className={`flex-1 grid `} style={{
                gridTemplateColumns: (!hideDetails && isHeader) ?
                    `repeat(${Object.values(data).length - 2}, minmax(0, 1fr))` :
                    `repeat(${Object.values(data).length - 1}, minmax(0, 1fr))`
            }}>
                {Object.values(data).map((e, index) => {
                    if ((((ignoreID && index !== 0) || !ignoreID)
                        && !(!hideDetails && isHeader && index == Object.values(data).length - 1))
                    ) {
                        if (index === 0)
                            return (
                                <MyTableCell
                                    key={index}
                                    data={e}
                                    width={`-1`}
                                    center={cellContentCenter}
                                />
                            );
                        return (
                            <MyTableCell
                                key={index}
                                data={e}
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
                    data={
                        <div>
                            <MyButton
                                label={""}
                                surfix={<Pencil size={14} color="#ffffff" weight="fill"/>}
                                borderRadius="rounded-[10px]"
                                onTap={() => handleActionButtons(data, "details")}
                            />
                        </div>
                    }
                    width={``}
                /> : <MyTableCell
                    data={Object.values(data)[Object.values(data).length - 1]}
                    width={``}
                    flexNone={true}
                    center={true}
                />
            )}
            {/*{actionsElement && <MyTableCell data={actionsElement} onClick={() => callback(data)}/>}*/}
        </div>
    );
};
