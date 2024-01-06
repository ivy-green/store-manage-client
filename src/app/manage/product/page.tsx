'use client'
import React, {useState} from 'react';
import MyButton from "@/components/general/MyButton";
import {MyTable} from "@/components/general/table/MyTable";
import {Plus, XCircle} from "phosphor-react";
import {Modal} from "reactstrap";
import MyModal from "@/components/general/dialog/MyDialog";
import MyDialog from "@/components/general/dialog/MyDialog";
import ConfirmDialog from "@/components/general/dialog/ConfirmDialog";

const ProductPage: React.FC = () => {

    const [isOpenDetails, setIsOpenDetails] = useState(false);

    const insertHandle = () => {
        console.log("insert click")
    }
    const deleteHandle = () => {
        console.log("delete click")
    }
    const detailsHandle = (data: Object, type: string) => {
        console.log("details click")
        setIsOpenDetails(true);
    }
    const modalClose = () => {
        setIsOpenDetails(false);
    }

    const temp = [
        {
            id: "1",
            name: "name 1",
            age: 23,
            address: "23 Modress Feet Ward"
        },
        {
            id: "2",
            name: "name 2",
            age: 23,
            address: "23 Modress Feet Ward"
        },
        {
            id: "3",
            name: "name 3",
            age: 44124,
            address: "2532 Modress Feet Ward"
        }
    ]

    return (
        <>
            <div className={" px-x-body py-y-body"}>
                <div className={"header flex gap-5 items-center"}>
                    <div className={"text-title-lg"}>Product page</div>
                    <div className={"h-[80%]"}>
                        <MyButton label={""}
                                  width={"w-[70%]"}
                                  borderRadius={"rounded-[100%]"}
                                  surfix={<Plus size={20} color="#ffffff" weight="fill"/>}
                                  onTap={insertHandle}/>
                    </div>
                </div>
                <div className={"body"}>
                    <MyTable list={temp}
                             deleteCallback={deleteHandle}
                             callback={detailsHandle}/>
                </div>

            </div>
            <ConfirmDialog isOpen={isOpenDetails}
                           onClose={modalClose}
                           model={{}}/>
        </>
    );
}

export default ProductPage;
