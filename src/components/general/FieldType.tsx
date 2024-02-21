import MyDropdown from "@/components/general/dropdown/MyDropdown";
import React, {useEffect, useState} from "react";
import {Input} from "@/components/general/Input";
import {Field} from "@/components/template/field";
import {DataApi} from "@/models/dataApi";
import {Product, ProductModel} from "@/models/product/product";
import {ModelTemplate} from "@/components/template/modelTemplate";

interface MySelectorFieldProps {
    name: string;
    apiPath: string;
    field: Field;
}

export const MySelectorField = ({
                                    name = "", apiPath = "", field
                                }: MySelectorFieldProps) => {
    const apiClient = new DataApi(apiPath);
    const [list, setList] = useState([]);
    const [val, setVal] = useState("");

    const callAPI = async () => {
        apiClient.getList()
            .then((result) => {
                if (result.status === 200) {
                    setList([]);
                    const selectedList = result.data;
                    setList(selectedList);
                } else {
                    console.log(result.status)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    useEffect(() => {
        callAPI()
    }, []);


    return (
        <div>
            <div className={"capitalize"}>{name}</div>
            <MyDropdown getVal={(val) => {
                setVal(val)
                console.log("val: ", val)
                field.value = val
            }} list={list}/>
        </div>
    );
};
export const MyInputDefaultField = ({
                                        item = new Field({field: "", name: "", value: ""})
                                    }) => {
    return <Input
        label={item.name}
        value={item.value}
        setDisabled={!(item.isEdit)}
        onChange={(input) => {
            item.initData(input)
            console.log(item.value)
        }}/>
}