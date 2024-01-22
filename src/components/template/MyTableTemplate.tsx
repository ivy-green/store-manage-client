'use client'

import {List, Modal} from "reactstrap";
import MyButton from "@/components/general/MyButton";
import {Plus} from "phosphor-react";
import {MyTable} from "@/components/general/table/MyTable";
import ConfirmDialog from "@/components/general/dialog/ConfirmDialog";
import React, {useEffect, useState} from "react";
import {string} from "prop-types";
import {Product, ProductModel} from "@/models/product/product";
import {ModelTemplate} from "@/components/template/modelTemplate";
import {tableSelector} from "@/selectors/consumerSelector";
import {useDispatch, useSelector} from "react-redux";
import toast from "react-hot-toast";
import tableSlice from "@/features/table/tableSlice";
import {ModelViewTemplate} from "@/components/template/modelViewTemplate";
import {ProductService} from "@/services/productService";
import {Input} from "@/components/general/Input";
import {ServiceTemplate} from "@/components/template/serviceTemplate";
import ImageUpload from "@/components/general/image/ImageUpload";
import {Field} from "@/components/template/field";
import CreateModal from "@/components/general/modal/CreateModal";

interface MyTablePageProps {
    isInsert?: boolean;
    // insertHandle: (data: ModelTemplate) => void;
    getList: () => void;
    headerTitle: string;
    service: ServiceTemplate;
    list: ModelTemplate[];
    model: ModelTemplate;
}

interface objectData {
    id: string;

    [key: string]: any;
}

export default function MyTableTemplate({
                                            isInsert = true,
                                            list,
                                            model,
                                            service,
                                            getList,
                                            headerTitle
                                        }: MyTablePageProps) {
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenModel, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [detailData, setDetailData] = useState<ModelTemplate>();
    const tableData = useSelector(tableSelector);
    const dispatch = useDispatch();

    const detailsHandle = (data: ModelTemplate, type: string) => {
        setIsCreate(false)
        setIsOpenModal(true)
        setDetailData(data)
    }

    const deleteHandle = async () => {
        let list = [...tableData.selectList];
        if (list.length === 0) {
            toast.error(`Choose ${model.getModelName()} to delete`);
            return;
        }

        setIsLoading(true);
        for (let i = 0; i < list.length; i++) {
            let res = await service.delete(list[i].code);
            if (!res) {
                toast.error("Something went wrong");
                return;
            }
        }
        toast.success("Deleted successfully");
        getList();
        setIsLoading(false)
    }

    const modalClose = () => {
        setIsOpenDelete(false);
    }
    const modalConfirm = async () => {
        console.log("confirm click")
        modalClose();
        await deleteHandle();
        dispatch(tableSlice.actions.handleSelected([]));
    }

    useEffect(() => {
        getList();
    }, [isLoading, isOpenModel])

    return <>
        <div className={" px-x-body py-y-body"}>
            <div className={"header flex gap-5 items-center"}>
                <div className={"text-title-lg"}>{headerTitle}</div>
                {isInsert && <div className={"h-[80%]"}>
                    <MyButton label={""}
                              width={"w-[70%]"}
                              borderRadius={"rounded-[100%]"}
                              surfix={<Plus size={20} color="#ffffff" weight="fill"/>}
                              onTap={() => {
                                  setDetailData(ModelTemplate.createEmpty);
                                  setIsCreate(true)
                                  setIsOpenModal(true)
                              }}/>
                </div>}
            </div>
            <div className={"body"}>
                {!isLoading && <MyTable list={list}
                                        deleteCallback={() => setIsOpenDelete(true)}
                                        callback={detailsHandle}/>}
            </div>

        </div>
        <CreateModal
            service={service}
            model={model}
            isOpenModel={isOpenModel}
            closeInsert={setIsOpenModal}
            data={detailData}
            isCreate={isCreate}
        />
        <ConfirmDialog isOpen={isOpenDelete}
                       onClose={modalClose}
                       onConfirm={modalConfirm}
                       isDelete={true}
                       content={`Do you want to delete ${tableData.selectList.length} data?`}
                       model={{}}/>
    </>
}