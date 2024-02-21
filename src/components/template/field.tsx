import React, {ReactNode} from "react";
import {MyInputDefaultField} from "@/components/general/FieldType";

interface FieldProps {
    field: string;
    name: string;
    value: any;
    isEdit?: boolean;
    isNumber?: boolean;
    type?: ReactNode;
}

export class Field {
    field: string;
    name: string;
    value: any;
    isEdit: boolean;
    isNumber: boolean;
    type: ReactNode;

    constructor({field, name, value, isEdit = true, isNumber = false, type}: FieldProps) {
        this.isEdit = isEdit;
        this.isNumber = isNumber;
        this.type = type || <MyInputDefaultField item={this}/>;
        this.field = field;
        this.name = name;
        this.value = value ?? " ";
        // You can also check if 'type' is undefined and provide a default value
        // if (!type) {
        //     this.type = <MyInputDefaultField item={this} />;
        // } else {
        //     this.type = type;
        // }

        // Initialize other properties
    }

    // Method to set default type after construction
    public setType(e: ReactNode) {
        this.type = e;
    }

    initData: (data: any) => void = (data: any) => {
        this.value = data;
    }
}
