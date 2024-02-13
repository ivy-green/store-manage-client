'use client'

import MyButton from "@/components/general/MyButton";
import {X, XCircle} from "phosphor-react";
import {Modal} from "reactstrap";
import React, {ReactNode} from "react";

interface MyModalProps {
    isOpen: boolean;
    content?: string;
    title?: string;
    onClose?: () => void;
    actions?: ReactNode;
    child?: ReactNode;
}

export default function MyDialog({
                                     isOpen = false,
                                     content = "",
                                     title = "",
                                     onClose,
                                     actions = <></>,
                                     child = <></>
                                 }: MyModalProps) {
    return <Modal
        isOpen={isOpen}
    >
        <div
            className={"backdrop-brightness-50 w-[100vw] h-[100vh] fixed top-0 flex items-center"}>
            <div className={"bg-white relative w-[40vw] mx-[auto] rounded-[10px] px-6 py-5"}>
                {onClose && <div className={"absolute right-4 top-4 cursor-pointer " +
                    "hover:rotate-90 transition delay-100"} onClick={onClose}>
                    <X size={20} weight={"bold"}/>
                </div>}
                <div className={"flex justify-between"}>
                    <div className={"font-medium text-2xl"}>
                        {title}
                    </div>
                </div>
                <div className={"text-center"}>{content}</div>
                {child}
                {actions}
            </div>
        </div>
    </Modal>
}