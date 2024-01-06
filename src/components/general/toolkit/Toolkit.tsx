"use client";

import React, {useEffect, useState} from "react";
import {X} from "phosphor-react";
import * as Icon from "phosphor-react";
import {useSelector} from "react-redux";
import searchSlice from "../../../features/search/searchSlice";
import {useDispatch} from "react-redux";
import {Input} from "@/components/general/Input";
import tableSlice from "@/features/table/tableSlice";
import MyButton from "@/components/general/MyButton";
import {tableSelector} from "@/selectors/consumerSelector";

interface toolkitArgs {
    borderRadius?: string;
    bgColor?: string;
    deleteCallback?: () => void;
    hideDelete?: boolean;
}

export const Toolkit = ({
                            borderRadius = "10px",
                            deleteCallback = () => {
                            },
                            hideDelete = false,
                        }: toolkitArgs) => {
    const style = {
        borderRadius: borderRadius,
    };

    const tableData = useSelector(tableSelector);
    const [selectCount, setSelectCount] = useState(tableData.selectList.length);
    const dispatch = useDispatch();

    useEffect(() => {
    }, [tableData.selectList]);

    return (
        <div
            className="tookit-wrapper py-6 px-4 my-3
            grid grid-cols-4 align-items-center bg-grey-fade"
            style={style}
        >
            <div className={"col-span-2 me-2"}>
                <Input
                    value={tableData.searchValue}
                    placeholder="Search by name, email or mobile number"
                    isBorder={true}
                    height="45px"
                    width="100%"
                    onChange={(v) => dispatch(tableSlice.actions.handleSearch(v.target))}
                    icon={<Icon.MagnifyingGlass size={16}/>}
                />
            </div>
            <Button
                label="Filter"
                surfix={<Icon.Faders size={16}/>}
                onClick={() => {
                }}
            />
            {!hideDelete && (
                <div className="w-100 flex items-center justify-around">
                    <div className="flex items-center">
                        <div>{selectCount.toString()} Item selected</div>
                        <Button label={""} prefix={<X size={18}/>} noBg={true}/>
                    </div>
                    <MyButton
                        label="Delete"
                        bgColor="bg-error"
                        onTap={deleteCallback}
                    />
                </div>
            )}
        </div>
    );
};

const Button = ({
                    label = "", onClick = () => {
    }, surfix = <></>, prefix = <></>,
                    noBg = false
                }) => {
    return <MyButton label={label} onTap={onClick}
                     fontColor={!noBg ? "text-white" : "text-default"}
                     height={!noBg ? "h-auto" : "h-fit"}
                     width={!noBg ? "w-[6rem]" : "w-fit"}
                     bgColor={noBg ? "transparent" : "bg-btn-default"}
                     surfix={surfix}
                     prefix={prefix}
    />
}
