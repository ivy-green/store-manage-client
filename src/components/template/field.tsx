import React, {ReactNode} from "react";
import {Input} from "@/components/general/Input";
import {MyInputDefaultField} from "@/components/general/FieldType";

export class Field {
    isEdit = true;
    isNumber = false;
    type: ReactNode = <MyInputDefaultField item={this}/>;

    // selector, number only, text only, calendar

    constructor(public field: string,
                public name: string,
                public value: any,
                isEdit: boolean = true,
                isNumber?: boolean,
                type?: ReactNode,
    ) {
        this.field = field;
        this.name = name ?? "";
        this.value = value ?? " ";
        this.isEdit = isEdit ?? true;
        this.isNumber = isNumber ?? false;
        this.type = type ?? <MyInputDefaultField item={this}/>;
    }

    initData: (data: any) => void = (data: any) => {
        this.value = data;
    }
}