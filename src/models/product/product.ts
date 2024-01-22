import {ModelTemplate} from "@/components/template/modelTemplate";
import {Field} from "@/components/template/field";

export interface Product {
    id: string;
    code: string;
    name: string;
    cost: number;
    price: number;
    created: string;
}

export class ProductModel implements ModelTemplate {
    codeField: Field;
    nameField: Field;
    costField: Field;
    priceField: Field;
    tableData: Field[];

    constructor();
    constructor(id: string,
                code: string,
                name: string,
                cost: number,
                price: number,
                created: string,
    );
    constructor(public id?: string,
                public code?: string,
                public name?: string,
                public cost?: number,
                public price?: number,
                public created?: string,
    ) {
        this.id = id ?? "";
        this.code = code ?? "";
        this.name = name ?? "";
        this.cost = cost ?? 0;
        this.price = price ?? 0;
        this.created = created ?? "";

        this.codeField = new Field(
            "code",
            "Product Code",
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
        this.priceField = new Field(
            "price",
            "Price",
            price ?? ""
        );

        this.tableData = [this.codeField, this.nameField, this.costField, this.priceField];
    }

    delete(): boolean {
        return false;
    }

    getModelName(): string {
        return "Product";
    }

    insert(): boolean {
        return false;
    }

    update(): boolean {
        return false;
    }

    getAllField(): any[] {
        return [this.codeField, this.nameField, this.costField, this.priceField];
    }

    getCreatedField(): any[] {
        return [this.nameField, this.costField, this.priceField];
    }

}

// applyMixins(ProductModel, [ModelTemplate, ProductView]);

