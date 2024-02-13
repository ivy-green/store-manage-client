import {ModelTemplate} from "@/components/template/modelTemplate";
import {Field} from "@/components/template/field";

export interface Group {
    id: string;
    code: string;
    name: string;
    created: string;
}

export class GroupModel implements ModelTemplate {
    codeField: Field;
    nameField: Field;
    tableData: Field[];

    constructor(public id?: string,
                public code?: string,
                public name?: string,
                public created?: string,
    ) {
        this.id = id ?? "";
        this.code = code ?? "";
        this.name = name ?? "";
        this.created = created ?? "";

        this.codeField = new Field(
            "code",
            "Group Code",
            code,
            false
        );
        this.nameField = new Field(
            "name",
            "Name",
            name ?? " ",
        );

        this.tableData = [this.codeField, this.nameField];
    }

    delete(): boolean {
        return false;
    }

    getModelName(): string {
        return "Group";
    }

    insert(): boolean {
        return false;
    }

    update(): boolean {
        return false;
    }

    getAllField(): any[] {
        return [this.codeField, this.nameField];
    }

    getCreatedField(): any[] {
        return [this.nameField];
    }

}

// applyMixins(GroupModel, [ModelTemplate, GroupView]);

