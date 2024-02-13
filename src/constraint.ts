export const BASE_URL = "http://localhost:8080/api/";
export const URL_LOGIN = "/login";

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}

export const sideSettingNav = [
    {
        group: "manage",
        child: [
            {
                id: "bill",
                path: "/manage/bill/create",
                name: "Bills",
            }
        ]
    },
    {
        group: "settings",
        child: [
            {
                id: "product",
                path: "/manage/product",
                name: "Product",
            },
            {
                id: "utility",
                path: "/manage/utility",
                name: "Utility",
            }
        ]
    },
]

export const productDemo = [
    {
        group: "coffee",
        child: [
            {
                name: "Black Coffee",
                price: 15000,
                quantity: 0,
                cost: 8000,
            },
            {
                name: "Brown Coffee",
                price: 18000,
                quantity: 0,
                cost: 9000,
            },
            {
                name: "White Coffee",
                price: 20000,
                quantity: 0,
                cost: 11000,
            },
            {
                name: "House Coffee",
                price: 25000,
                quantity: 0,
                cost: 12000,
            },
            {
                name: "Egg Coffee",
                price: 22000,
                quantity: 0,
                cost: 12000,
            },
        ]
    },
    {
        group: "juice",
        child: [
            {
                name: "Orange",
                price: 15000,
                quantity: 0,
                cost: 8000,
            },
            {
                name: "Carrot",
                price: 18000,
                quantity: 0,
                cost: 9000,
            },
            {
                name: "Apple",
                price: 20000,
                quantity: 0,
                cost: 11000,
            },
            {
                name: "Avocado",
                price: 25000,
                quantity: 0,
                cost: 12000,
            },
            {
                name: "Sugarcane",
                price: 25000,
                quantity: 0,
                cost: 12000,
            },
            {
                name: "Pineapple",
                price: 22000,
                quantity: 0,
                cost: 12000,
            },
        ]
    },
    {
        group: "food",
        child: [
            {
                name: "Sticky Cake",
                price: 15000,
                quantity: 0,
                cost: 8000,
            },
            {
                name: "Small Cake",
                price: 18000,
                quantity: 0,
                cost: 9000,
            },
        ]
    },
    {
        group: "food",
        child: [
            {
                name: "Sticky Cake",
                price: 15000,
                quantity: 0,
                cost: 8000,
            },
            {
                name: "Small Cake",
                price: 18000,
                quantity: 0,
                cost: 9000,
            },
        ]
    },
    {
        group: "food",
        child: [
            {
                name: "Sticky Cake",
                price: 15000,
                quantity: 0,
                cost: 8000,
            },
            {
                name: "Small Cake",
                price: 18000,
                quantity: 0,
                cost: 9000,
            },
        ]
    },
    {
        group: "food",
        child: [
            {
                name: "Sticky Cake",
                price: 15000,
                quantity: 0,
                cost: 8000,
            },
            {
                name: "Small Cake",
                price: 18000,
                quantity: 0,
                cost: 9000,
            },
        ]
    },
]
