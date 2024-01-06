'use client'

import MyDialog from "@/components/general/dialog/MyDialog";
import React from "react";
import MyButton from "@/components/general/MyButton";

interface MyModalProps {
    isOpen: boolean;
    model: Object;
    onClose: () => void;
    isDelete?: boolean;
}

const DeleteActions = <div className={" my-3 flex justify-between gap-2"}>
    <MyButton label={"Delete"} width={"w-[100%]"} bgColor={"bg-error"} onTap={() => {
    }}/>
    <MyButton label={"Cancel"}
              width={"w-[100%]"}
              bgColor={"bg-grey-fade"}
              fontColor={"text-default"}
              onTap={() => {
              }}/>
</div>

const ConfirmActions = <div className={" my-3 flex justify-between gap-2"}>
    <MyButton label={"Confirm"}
              width={"w-[100%]"}
              bgColor={"bg-success"}
              onTap={() => {
              }}/>
    <MyButton label={"Cancel"}
              width={"w-[100%]"}
              bgColor={"bg-grey-fade"}
              fontColor={"text-default"}
              onTap={() => {
              }}/>
</div>

export default function ConfirmDialog({
                                          isOpen = false,
                                          isDelete = false,
                                          model = {},
                                          onClose = () => {
                                          },
                                      }: MyModalProps) {
    return <MyDialog isOpen={isOpen}
                     onClose={onClose}
                     content={"Do you want to delete?"}
                     actions={isDelete ? DeleteActions : ConfirmActions}
    />
}