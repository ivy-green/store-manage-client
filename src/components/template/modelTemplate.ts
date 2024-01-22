import {ModelViewTemplate} from "@/components/template/modelViewTemplate";

export abstract class ModelTemplate {
    abstract insert(): boolean;

    abstract update(): boolean;

    abstract delete(): boolean;

    abstract getModelName(): string;
    abstract getAllField(): any[];
    abstract getCreatedField(): any[];

    static createEmpty() : ModelTemplate {
        return new class extends ModelTemplate {
            delete(): boolean {
                return false;
            }

            getAllField(): any[] {
                return [];
            }

            getCreatedField(): any[] {
                return [];
            }

            getModelName(): string {
                return "";
            }

            insert(): boolean {
                return false;
            }

            update(): boolean {
                return false;
            }
        }
    }
}