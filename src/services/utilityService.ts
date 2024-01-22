import {DataApi} from "@/models/dataApi";
import {ServiceTemplate} from "@/components/template/serviceTemplate";
import {ModelTemplate} from "@/components/template/modelTemplate";

export class UtilityService implements ServiceTemplate {
    apiClient = new DataApi('utility');

    create: (data: Object) => Promise<boolean> = (data) => this.apiClient.create(data)
        .then((result) => {
            if (result.status === 200) {
                return true;
            } else {
                console.log(result.status)
                return false;
            }
        })
        .catch((error) => {
            console.error('Utility Service - Error:', error);
            return false;
        })
    delete: (code: string) => Promise<boolean> = (code) => this.apiClient.delete(code)
        .then((result) => {
            if (result.status === 200) {
                return true;
            } else {
                console.log(result.status)
                return false;
            }
        })
        .catch((error) => {
            console.error('Utility Service - Error:', error);
            return false;
        })

    // getByCode(code: string): Promise<ModelTemplate> {
    //     return Promise.resolve(new ModelTemplate());
    // }

    getList(): Promise<ModelTemplate[]> {
        return Promise.resolve([]);
    }

    update(data: ModelTemplate): Promise<boolean> {
        return Promise.resolve(false);
    }

}