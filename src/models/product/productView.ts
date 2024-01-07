import {ModelViewTemplate} from "@/components/template/modelViewTemplate";
import {Field} from "@/components/template/field";

export abstract class ProductView extends ModelViewTemplate {
    abstract codeField: Field;
    abstract nameField: Field;
    abstract costField: Field;
    abstract priceField: Field;
    abstract tableData: Field[];
}