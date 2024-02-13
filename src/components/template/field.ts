export class Field {
    isEdit = true;
    isNumber = false;

    constructor(public field: string,
                public name: string,
                public value: any,
                isEdit: boolean = true,
                isNumber?: boolean,
    ) {
        this.field = field;
        this.name = name ?? "";
        this.value = value ?? " ";
        this.isEdit = isEdit ?? true;
        this.isNumber = isNumber ?? false;
    }

    initData: (data: any) => void = (data: any) => {
        this.value = data;
    }
}