import {ModelTemplate} from "@/components/template/modelTemplate";
import {Field} from "@/components/template/field";

export interface Utility {
    id: string;
    code: string;
    name: string;
    cost: number;
    unit: string;
    oldNum: number;
    newNum: number;
    created: string;
}

export class UtilityModel implements ModelTemplate {
    codeField: Field;
    nameField: Field;
    costField: Field;
    unitField: Field;
    oldNumField: Field;
    newNumField: Field;
    tableData: Field[];

    // constructor();
    // constructor(id: string,
    //             code: string,
    //             name: string,
    //             cost: number,
    //             unit: String,
    //             oldNum: number,
    //             newNum: number,
    //             created: string,
    // );
    constructor(public id?: string,
                public code?: string,
                public name?: string,
                public cost?: number,
                public unit?: String,
                public oldNum?: number,
                public newNum?: number,
                public created?: string,
    ) {
        this.id = id ?? "";
        this.code = code ?? "";
        this.name = name ?? "";
        this.cost = cost ?? 0;
        this.unit = unit ?? "";
        this.oldNum = oldNum ?? 0;
        this.newNum = newNum ?? 0;
        this.created = created ?? "";

        this.codeField = new Field(
            "code",
            "Utility Code",
            code ?? "",
            false
        );
        this.nameField = new Field(
            "name",
            "Name",
            name ?? "",
        );
        this.costField = new Field(
            "cost",
            "Cost",
            cost ?? ""
        );
        this.unitField = new Field(
            "unit",
            "Unit",
            unit ?? ""
        );
        this.oldNumField = new Field(
            "oldNum",
            "Old number",
            oldNum ?? ""
        );
        this.newNumField = new Field(
            "newNum",
            "New number",
            newNum ?? ""
        );

        this.tableData = [this.codeField, this.nameField, this.costField, this.newNumField];
    }

    delete(): boolean {
        return false;
    }

    getModelName(): string {
        return "Utility";
    }

    insert(): boolean {
        return false;
    }

    update(): boolean {
        return false;
    }

    getAllField(): any[] {
        return [this.codeField, this.nameField, this.costField, this.oldNumField, this.newNumField];
    }

    getCreatedField(): any[] {
        return [this.nameField, this.costField, this.unitField, this.oldNumField, this.newNumField];
    }

}

