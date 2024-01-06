class ProductModel extends ModelTemplate {
    constructor(public id: string,
                public name: string,
                public price: number,
                public created: string) {
        super(id)
        this.name = name;
        this.price = price;
        this.created = created;
    }

    delete(): boolean {
        return false;
    }

    getModelName(): string {
        return this.name;
    }

    insert(): boolean {
        return false;
    }

    update(): boolean {
        return false;
    }

}