import ImageUpload from "@/components/general/image/ImageUpload";
import {Input} from "@/components/general/Input";
import {Field} from "@/components/template/field";
import MyButton from "@/components/general/MyButton";
import {Modal} from "reactstrap";
import React from "react";
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
            result[obj.field] = obj.value;
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

    return <Modal
        isOpen={isOpenModel}
    >
        <div
            className={"backdrop-brightness-50 w-[100vw] h-[100vh] fixed top-0 flex items-center"}>
            <div className={"bg-white w-[70vw] h-[100%] ms-[auto] rounded-s-[5px] px-6 py-5"}>
                <button onClick={() => closeInsert(false)}>
                    close
                </button>
                <div className={"font-medium text-2xl"}>
                    {isCreate ? 'Create new one' : 'Information'}
                </div>
                <div className={"overflow-scroll h-[92%] px-3 py-1"}>
                    <div className={""}>
                        <ImageUpload/>
                        {
                            isCreate ? model.getCreatedField().map((item, index) =>
                                <Input
                                    key={index}
                                    label={(item as Field).name}
                                    value={(item as Field).value}
                                    onChange={(input) => (item as Field).initData(input)}/>
                            ) : data?.getAllField().map((item, index) =>
                                <Input
                                    key={index}
                                    label={(item as Field).name}
                                    value={(item as Field).value}
                                    setDisabled={!((item as Field).isEdit)}
                                    onChange={(input) => (item as Field).initData(input)}/>
                            )
                        }
                    </div>
                    <MyButton label={"Submit"} onTap={insertHandle}/>
                </div>
            </div>
        </div>
    </Modal>
}