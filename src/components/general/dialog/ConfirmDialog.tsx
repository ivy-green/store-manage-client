'use client'

import MyDialog from "@/components/general/dialog/MyDialog";
import React from "react";
import MyButton from "@/components/general/MyButton";

interface MyModalProps {
    isOpen: boolean;
    model: Object;
    content?: string;
    onClose: () => void;
    onConfirm: () => void;
    isDelete?: boolean;
}


export default function ConfirmDialog({
                                          isOpen = false,
                                          isDelete = false,
                                          model = {},
                                          content = "",
                                          onClose = () => {
                                          },
                                          onConfirm = () => {
                                          },
                                      }: MyModalProps) {
    const ConfirmActions = <div className={" my-3 flex justify-between gap-2"}>
        {isDelete ?
            <MyButton label={"Delete"} width={"w-[100%]"} bgColor={"bg-error"} onTap={onConfirm}/> :
            <MyButton label={"Confirm"}
                      width={"w-[100%]"}
                      bgColor={"bg-success"}
                      onTap={onConfirm}/>}
        <MyButton label={"Cancel"}
                  width={"w-[100%]"}
                  bgColor={"bg-grey-fade"}
                  fontColor={"text-default"}
                  onTap={onClose}/>
    </div>

    return <MyDialog isOpen={isOpen}
                     onClose={onClose}
                     content={content}
                     actions={ConfirmActions}
    />
}