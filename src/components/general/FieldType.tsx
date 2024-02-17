import MyDropdown from "@/components/general/dropdown/MyDropdown";
import React from "react";
import {Input} from "@/components/general/Input";
import {Field} from "@/components/template/field";

export const MySelectorField = ({
    data = [{
        code: "",
        value: ""
    }]
                           }) => {
    return <div>
        <MyDropdown/>
    </div>
}
export const MyInputDefaultField = ({
    item = new Field("","","")
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