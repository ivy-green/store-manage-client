import {ModelTemplate} from "@/components/template/modelTemplate";

export interface ServiceTemplate {
    getList: () => Promise<ModelTemplate[]>;
    // getByCode: (code: string) => Promise<ModelTemplate>;
    create: (data: Object) => Promise<boolean>;
    update: (data: ModelTemplate) => Promise<boolean>;
    delete: (code: string) => Promise<boolean>;
}