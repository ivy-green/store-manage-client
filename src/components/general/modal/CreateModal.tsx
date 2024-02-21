import ImageUpload from "@/components/general/image/ImageUpload";
import {Input} from "@/components/general/Input";
import {Field} from "@/components/template/field";
import MyButton from "@/components/general/MyButton";
import {Modal} from "reactstrap";
import React, {useState} from "react";
import {ModelTemplate} from "@/components/template/modelTemplate";
import {string} from "prop-types";
import toast from "react-hot-toast";
import {ServiceTemplate} from "@/components/template/serviceTemplate";

interface createModelProps {
    isOpenModel: boolean;
    closeInsert: (val: boolean) => void;
    model: ModelTemplate;
    service: ServiceTemplate;
    data?: ModelTemplate;
    isCreate: boolean;
}

export default function CreateModal({
                                        isOpenModel = false,
                                        closeInsert,
                                        model,
                                        service,
                                        data,
                                        isCreate = false
                                    }: createModelProps) {

    const insertHandle = async () => {
        const data: { [key: string]: string } = model.getCreatedField().reduce((result, obj) => {
            console.log(obj.value)
            result[obj.field] = obj.value.trim();
            return result;
        }, {});

        let res = await service.create(data);
        if (res) {
            toast.success(`Create ${model.getModelName()} successfully`);
            closeInsert(false);
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
            closeInsert(false);
        } else {
            toast.error(`Update ${data?.getModelName()} failed`);
        }
    }

    return <Modal
        isOpen={isOpenModel}
    >
        <div
            className={"backdrop-brightness-50 w-[100vw] h-[100vh] fixed top-0 flex items-center"}>
            <div className={"bg-white w-[70vw] h-[100%] ms-[auto] rounded-s-[5px] px-6 py-5"}>
                <button className={"mb-3"} onClick={() => closeInsert(false)}>
                    close
                </button>
                <div className={"font-medium text-2xl"}>
                    {isCreate ? 'Create new one' : 'Information'}
                </div>
                <div className={"overflow-scroll h-[92%] py-5 px-3 py-1"}>
                    <div className={" my-5"}>
                        <ImageUpload/>
                        {
                            isCreate ? model.getCreatedField().map((item, index) =>
                                (item as Field).type
                            ) : data?.getAllField().map((item, index) =>
                                (item as Field).type
                            )
                        }
                    </div>
                    <MyButton borderRadius={"rounded-[5px]"} label={"Submit"}
                              onTap={isCreate ? insertHandle : updateHandle}/>
                </div>
            </div>
        </div>
    </Modal>
}
