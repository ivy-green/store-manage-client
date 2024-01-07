'use client'

import {List} from "reactstrap";
import MyButton from "@/components/general/MyButton";
import {Plus} from "phosphor-react";
import {MyTable} from "@/components/general/table/MyTable";
import ConfirmDialog from "@/components/general/dialog/ConfirmDialog";
import React, {useEffect, useState} from "react";
import {string} from "prop-types";
import {ProductModel} from "@/models/product/product";
import {ModelTemplate} from "@/components/template/modelTemplate";

interface MyTablePageProps {
    isInsert?: boolean;
    insertHandle: () => void;
    // deleteHandle: () => void;
    detailsHandle: (data: Object, type: string) => void;
    headerTitle: string;
    list: objectData[]
}

interface objectData {
    id: string;
    [key: string]: any;
}

export default function MyTableTemplate({
                                            isInsert = true,
                                            insertHandle = () => {
                                            },
                                            detailsHandle = (data: Object, type: string) => {
                                            },
                                            list,
                                            headerTitle
                                        }: MyTablePageProps) {
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const deleteHandle = () => {
        console.log("delete click")
        setIsOpenDelete(true);
    }
    const modalClose = () => {
        setIsOpenDelete(false);
    }
    const modalConfirm = () => {
        console.log("confirm click")
    }
    return <>
        <div className={" px-x-body py-y-body"}>
            <div className={"header flex gap-5 items-center"}>
                <div className={"text-title-lg"}>{headerTitle}</div>
                {isInsert && <div className={"h-[80%]"}>
                    <MyButton label={""}
                              width={"w-[70%]"}
                              borderRadius={"rounded-[100%]"}
                              surfix={<Plus size={20} color="#ffffff" weight="fill"/>}
                              onTap={insertHandle}/>
                </div>}
            </div>
            <div className={"body"}>
                <MyTable list={list}
                         deleteCallback={deleteHandle}
                         callback={detailsHandle}/>
            </div>

        </div>
        <ConfirmDialog isOpen={isOpenDelete}
                       onClose={modalClose}
                       onConfirm={modalConfirm}
                       isDelete={true}
                       model={{}}/>
    </>
}