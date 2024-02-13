'use client'

import MyButton from "@/components/general/MyButton";
import {Plus} from "phosphor-react";
import {Group, GroupModel} from "@/models/group";
import React, {useState} from "react";
import MyDialog from "@/components/general/dialog/MyDialog";
import {Input} from "@/components/general/Input";
import {Field} from "@/components/template/field";
import {string} from "prop-types";
import toast from "react-hot-toast";
import {GroupService} from "@/services/groupService";

interface groupPageProps {
    list: Group[];
    setGroupChosen: (code: string) => void;
    groupChosen: string;
}

export default function GroupPage({
                                      list,
                                      setGroupChosen= () => {},
                                      groupChosen = ""
                                  }: groupPageProps) {
    const [openOptionModal, setOpenOptionModal] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const model = new GroupModel();
    const data = new GroupModel("test", "code test", "name test", "today");
    const service = new GroupService();

    // const [groupChosen, setGroupChosen] = useState("")

    const insertHandle = async () => {
        const data: { [key: string]: string } = model.getCreatedField().reduce((result, obj) => {
            result[obj.field] = obj.value;
            return result;
        }, {});

        let res = await service.create(data);
        if (res) {
            toast.success(`Create ${model.getModelName()} successfully`);
        } else {
            toast.error(`Create ${model.getModelName()} failed`);
        }
    }
    const updateHandle = async () => {
        const dataUpdate: { [key: string]: string } = data?.getAllField().reduce((result, obj) => {
            result[obj.field] = obj.value;
            return result;
        }, {});

        let res = await service.update(dataUpdate);
        if (res) {
            toast.success(`Update ${data?.getModelName()} successfully`);
        } else {
            toast.error(`Update ${data?.getModelName()} failed`);
        }
    }

    const form = <>
        {
            isCreate ? model.getCreatedField().map((item, index) =>
                <Input
                    key={index}
                    label={(item as Field).name}
                    value={(item as Field).value}
                    onChange={(input) => {
                        (item as Field).initData(input)
                        console.log((item as Field).value)
                    }}/>
            ) : data?.getAllField().map((item, index) =>
                <Input
                    key={index}
                    label={(item as Field).name}
                    value={(item as Field).value}
                    setDisabled={!((item as Field).isEdit)}
                    onChange={(input) => {
                        (item as Field).initData(input)
                        console.log((item as Field).value)
                    }}/>
            )
        }
    </>

    return <div className={"flex-1 px-x-body py-y-body"}>
        <div className={" flex gap-5 items-center mb-4"}>
            <div className={"text-title-lg"}>Group</div>
            <div className={"h-[80%]"}>
                <MyButton label={""}
                          width={"w-[70%]"}
                          borderRadius={"rounded-[100%]"}
                          surfix={<Plus size={20} color="#ffffff" weight="fill"/>}
                          onTap={() => {
                              setOpenOptionModal(true);
                          }}/>
            </div>
        </div>
        <div
            className={"cursor-pointer my-19 py-3 px-4 rounded-[5px] border-[0.5px] shadow-[0_5px_5px_0px_var(--clr-white)] " +
                `${groupChosen == "" ? "bg-amber-300 font-bold text-white" : ""}`}
            onClick={() => setGroupChosen("")}
        >
            All
        </div>
        {
            list && list.map((item: Group, index) =>
                <div key={index}
                     className={"cursor-pointer my-1 py-3 px-4 rounded-[5px] border-[0.5px] shadow-[0_5px_5px_0px_var(--clr-white)] " +
                         `${groupChosen == item.code ? "bg-amber-300 font-bold text-white" : ""}`}
                     onClick={() => setGroupChosen(item.code)}>
                    {item.name}
                </div>)
        }
        <OptionModal
            isOpen={openOptionModal}
            isCreate={isCreate}
            onClose={() => setOpenOptionModal(false)}
            form={form}
            action={
                <MyButton label={"Submit"} onTap={isCreate ? insertHandle : updateHandle}/>
            }
        />
    </div>
}

const OptionModal = ({
                         isOpen = false,
                         onClose = () => {
                         },
                         isCreate = false,
                         form = <></>,
                         action = <></>
                     }) => {

    return <MyDialog isOpen={isOpen}
                     onClose={onClose}
                     child={form}
                     content={isCreate ? "Create Group" : "Edit Group"}
                     actions={action}
        // actions={ConfirmActions}
    />
}
