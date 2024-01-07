import {ModelViewTemplate} from "@/components/template/modelViewTemplate";

export abstract class ModelTemplate {
    constructor(public id: string) {
    }

    abstract insert(): boolean;

    abstract update(): boolean;

    abstract delete(): boolean;

    abstract getModelName(): string;
}