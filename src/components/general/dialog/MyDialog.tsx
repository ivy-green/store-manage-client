'use client'

import MyButton from "@/components/general/MyButton";
import {XCircle} from "phosphor-react";
import {Modal} from "reactstrap";
import React, {ReactNode} from "react";

interface MyModalProps {
    isOpen: boolean;
    content?: string;
    title?: string;
    onClose: () => void
    actions?: ReactNode;
}

export default function MyDialog({
                                     isOpen = false,
                                     content = "",
                                     title = "",
                                     onClose = () => {
                                     },
                                     actions = <></>
                                 }: MyModalProps) {
    return <Modal
        isOpen={isOpen}
    >
        <div
            className={"backdrop-brightness-50 w-[100vw] h-[100vh] fixed top-0 flex items-center"}>
            <div className={"bg-white w-[40vw] mx-[auto] rounded-[10px] px-6 py-5"}>
                <div className={"flex justify-between"}>
                    <div className={"font-medium text-2xl"}>
                        {title}
                    </div>
                    {/*<MyButton*/}
                    {/*    onTap={onClose}*/}
                    {/*    bgColor={"bg-[transparent]"}*/}
                    {/*    pdX={"px-0"}*/}
                    {/*    pdY={"py-0"}*/}
                    {/*    surfix={<XCircle size={32} color="#3d3d3d" weight="fill"/>} label={""}/>*/}
                </div>
                <div className={"text-center"}>{content}</div>
                {actions}
            </div>
        </div>
    </Modal>
}